import { NextFunction, Request, Response } from 'express';
import { Package } from './package.model';
import { packageCreateValidation, packageUpdateValidation } from './package.validation';
import { appError } from '../../errors/appError';

export const createPackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      subtitle,
      aiDescription,
      proTip,
      packageName,
      packageSubtitle,
      badgeTitle,
      packagePrice,
      packageDescription,
    } = req.body as any;

    const payload = {
      title,
      subtitle,
      aiDescription,
      proTip,
      packageName,
      packageSubtitle,
      badgeTitle,
      packagePrice: typeof packagePrice === 'string' ? parseFloat(packagePrice) : packagePrice,
      packageDescription,
    };

    const validated = packageCreateValidation.parse(payload);

    const doc = new Package(validated);
    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Package created successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const getAllPackages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Package.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Packages retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getPackageById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Package.findOne({ _id: req.params.id, isDeleted: false });
    if (!doc) return next(new appError('Package not found', 404));

    res.json({ success: true, statusCode: 200, message: 'Package retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updatePackageById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await Package.findOne({ _id: id, isDeleted: false });
    if (!existing) return next(new appError('Package not found', 404));

    const {
      title,
      subtitle,
      aiDescription,
      proTip,
      packageName,
      packageSubtitle,
      badgeTitle,
      packagePrice,
      packageDescription,
    } = req.body as any;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (aiDescription !== undefined) updateData.aiDescription = aiDescription;
    if (proTip !== undefined) updateData.proTip = proTip;
    if (packageName !== undefined) updateData.packageName = packageName;
    if (packageSubtitle !== undefined) updateData.packageSubtitle = packageSubtitle;
    if (badgeTitle !== undefined) updateData.badgeTitle = badgeTitle;
    if (packagePrice !== undefined) updateData.packagePrice = typeof packagePrice === 'string' ? parseFloat(packagePrice) : packagePrice;
    if (packageDescription !== undefined) updateData.packageDescription = packageDescription;

    const validated = packageUpdateValidation.parse(updateData);
    const updated = await Package.findByIdAndUpdate(id, validated, { new: true });

    res.json({ success: true, statusCode: 200, message: 'Package updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deletePackageById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Package.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!updated) return next(new appError('Package not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Package deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
