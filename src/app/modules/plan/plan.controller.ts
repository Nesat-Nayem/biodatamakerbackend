import { NextFunction, Request, Response } from 'express';
import { Plan } from './plan.model';
import { planCreateValidation, planUpdateValidation } from './plan.validation';
import { appError } from '../../errors/appError';

export const createPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, value, price, description, label, badgeColor, isBest, isActive, order } = req.body as any;

    const validated = planCreateValidation.parse({
      name,
      value,
      price: typeof price === 'string' ? parseFloat(price) : price,
      description,
      label,
      badgeColor,
      isBest: isBest === 'true' || isBest === true || undefined,
      isActive: isActive === 'true' || isActive === true || undefined,
      order: order ? parseInt(order) : undefined,
    });

    // Ensure unique value
    const existing = await Plan.findOne({ value: validated.value, isDeleted: false });
    if (existing) return next(new appError('Plan with this value already exists', 400));

    const doc = new Plan(validated);
    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Plan created successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const getAllPlans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { active } = req.query as any;
    const filter: any = { isDeleted: false };
    if (active === 'true') filter.isActive = true;

    const docs = await Plan.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Plans retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getPlanById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Plan.findOne({ _id: req.params.id, isDeleted: false });
    if (!doc) return next(new appError('Plan not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Plan retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updatePlanById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await Plan.findOne({ _id: id, isDeleted: false });
    if (!existing) return next(new appError('Plan not found', 404));

    const { name, value, price, description, label, badgeColor, isBest, isActive, order } = req.body as any;
    const updateData = planUpdateValidation.parse({
      name,
      value,
      price: typeof price === 'string' ? parseFloat(price) : price,
      description,
      label,
      badgeColor,
      isBest: isBest === 'true' || isBest === true || undefined,
      isActive: isActive === 'true' || isActive === true || undefined,
      order: order ? parseInt(order) : undefined,
    });

    const updated = await Plan.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ success: true, statusCode: 200, message: 'Plan updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deletePlanById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Plan.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!updated) return next(new appError('Plan not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Plan deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
