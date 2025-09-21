import { NextFunction, Request, Response } from 'express';
import { CoreFunctions } from './core-functions.model';
import { coreFunctionsCreateValidation, coreFunctionsUpdateValidation } from './core-functions.validation';
import { appError } from '../../errors/appError';
import { cloudinary } from '../../config/cloudinary';

const parseCards = (input: any) => {
  if (input === undefined) return undefined;
  let parsed: any;
  if (typeof input === 'string') {
    try {
      parsed = JSON.parse(input);
    } catch (e) {
      throw new appError('Invalid JSON for cards', 400);
    }
  } else {
    parsed = input;
  }
  return parsed;
};

export const createCoreFunctions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, subtitle, cards } = req.body as any;

    if (!req.file) return next(new appError('Banner image is required', 400));

    const payload = {
      title,
      subtitle,
      banner: req.file.path,
      cards: parseCards(cards),
    } as any;

    const validated = coreFunctionsCreateValidation.parse(payload);
    const doc = new CoreFunctions(validated);
    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Core Functions created successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const getAllCoreFunctions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await CoreFunctions.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Core Functions retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getCoreFunctionsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await CoreFunctions.findOne({ _id: req.params.id, isDeleted: false });
    if (!doc) return next(new appError('Core Functions not found', 404));

    res.json({ success: true, statusCode: 200, message: 'Core Functions retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateCoreFunctionsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await CoreFunctions.findOne({ _id: id, isDeleted: false });
    if (!existing) return next(new appError('Core Functions not found', 404));

    const { title, subtitle, cards } = req.body as any;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;

    const parsedCards = parseCards(cards);
    if (parsedCards !== undefined) updateData.cards = parsedCards;

    if (req.file) {
      updateData.banner = req.file.path;
      const oldUrl = (existing as any).banner;
      if (oldUrl) {
        const publicId = oldUrl.split('/').pop()?.split('.')[0];
        if (publicId) await cloudinary.uploader.destroy(`restaurant-uploads/${publicId}`).catch(() => void 0);
      }
    }

    const validated = coreFunctionsUpdateValidation.parse(updateData);
    const updated = await CoreFunctions.findByIdAndUpdate(id, validated, { new: true });

    res.json({ success: true, statusCode: 200, message: 'Core Functions updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteCoreFunctionsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await CoreFunctions.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!updated) return next(new appError('Core Functions not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Core Functions deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
