import { NextFunction, Request, Response } from 'express';
import { Advertise } from './advertise.model';
import { advertiseCreateValidation, advertiseUpdateValidation } from './advertise.validation';
import { appError } from '../../errors/appError';
import { cloudinary } from '../../config/cloudinary';

export const createAdvertise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url, status } = req.body as any;

    if (!req.file) {
      return next(new appError('Advertise banner is required', 400));
    }

    const payload = {
      banner: req.file.path,
      url,
      status,
    };

    const validated = advertiseCreateValidation.parse(payload);

    const doc = new Advertise(validated);
    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Advertise created successfully', data: doc });
  } catch (error) {
    // no cleanup as cloudinary storage auto handles temp files
    next(error);
  }
};

export const getAllAdvertises = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Advertise.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Advertises retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getAdvertiseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Advertise.findOne({ _id: req.params.id, isDeleted: false });
    if (!doc) return next(new appError('Advertise not found', 404));

    res.json({ success: true, statusCode: 200, message: 'Advertise retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateAdvertiseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await Advertise.findOne({ _id: id, isDeleted: false });
    if (!existing) return next(new appError('Advertise not found', 404));

    const { url, status } = req.body as any;

    const updateData: any = {};
    if (url !== undefined) updateData.url = url;
    if (status !== undefined) updateData.status = status;

    if (req.file) {
      updateData.banner = req.file.path;
      // attempt to delete old banner
      const oldUrl = (existing as any).banner;
      if (oldUrl) {
        const publicId = oldUrl.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`restaurant-uploads/${publicId}`).catch(() => void 0);
        }
      }
    }

    const validated = advertiseUpdateValidation.parse(updateData);
    const updated = await Advertise.findByIdAndUpdate(id, validated, { new: true });

    res.json({ success: true, statusCode: 200, message: 'Advertise updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteAdvertiseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Advertise.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!updated) return next(new appError('Advertise not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Advertise deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
