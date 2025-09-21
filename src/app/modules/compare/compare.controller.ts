import { NextFunction, Request, Response } from 'express';
import { Compare } from './compare.model';
import { compareCreateValidation, compareUpdateValidation } from './compare.validation';
import { appError } from '../../errors/appError';
import { cloudinary } from '../../config/cloudinary';

const parseCompare = (input: any): { title: string; value: boolean }[] | undefined => {
  if (input === undefined) return undefined;
  let parsed: any;
  if (typeof input === 'string') {
    try {
      parsed = JSON.parse(input);
    } catch (e) {
      throw new appError('Invalid JSON for compare', 400);
    }
  } else {
    parsed = input;
  }
  if (!Array.isArray(parsed)) return undefined;
  return parsed.map((item) => {
    const title = item.title;
    let value = item.value;
    if (typeof value === 'string') {
      const v = value.toLowerCase();
      value = v === 'yes' || v === 'true';
    }
    return { title, value: !!value };
  });
};

export const createCompare = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, compare } = req.body as any;

    const banner1File = (req.files as any)?.banner1?.[0];
    const banner2File = (req.files as any)?.banner2?.[0];
    if (!banner1File || !banner2File) {
      return next(new appError('Both banner1 and banner2 images are required', 400));
    }

    const payload = {
      title,
      banner1: banner1File.path,
      banner2: banner2File.path,
      compare: parseCompare(compare),
    } as any;

    const validated = compareCreateValidation.parse(payload);
    const doc = new Compare(validated);
    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Compare created successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const getAllCompares = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Compare.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Compares retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getCompareById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Compare.findOne({ _id: req.params.id, isDeleted: false });
    if (!doc) return next(new appError('Compare not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Compare retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateCompareById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await Compare.findOne({ _id: id, isDeleted: false });
    if (!existing) return next(new appError('Compare not found', 404));

    const { title, compare } = req.body as any;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;

    const compareParsed = parseCompare(compare);
    if (compareParsed !== undefined) updateData.compare = compareParsed;

    const banner1File = (req.files as any)?.banner1?.[0];
    const banner2File = (req.files as any)?.banner2?.[0];

    if (banner1File) {
      updateData.banner1 = banner1File.path;
      const oldUrl = (existing as any).banner1;
      if (oldUrl) {
        const publicId = oldUrl.split('/').pop()?.split('.')[0];
        if (publicId) await cloudinary.uploader.destroy(`restaurant-uploads/${publicId}`).catch(() => void 0);
      }
    }

    if (banner2File) {
      updateData.banner2 = banner2File.path;
      const oldUrl = (existing as any).banner2;
      if (oldUrl) {
        const publicId = oldUrl.split('/').pop()?.split('.')[0];
        if (publicId) await cloudinary.uploader.destroy(`restaurant-uploads/${publicId}`).catch(() => void 0);
      }
    }

    const validated = compareUpdateValidation.parse(updateData);
    const updated = await Compare.findByIdAndUpdate(id, validated, { new: true });

    res.json({ success: true, statusCode: 200, message: 'Compare updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteCompareById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Compare.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!updated) return next(new appError('Compare not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Compare deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
