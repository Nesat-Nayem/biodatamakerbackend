import { NextFunction, Request, Response } from 'express';
import { Counter } from './counter.model';
import { counterCreateValidation, counterUpdateValidation } from './counter.validation';
import { appError } from '../../errors/appError';

export const createCounter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { totalBiodataCreated, happyClients, dailyVisits, activeUsers } = req.body as any;

    const payload = {
      totalBiodataCreated: typeof totalBiodataCreated === 'string' ? parseInt(totalBiodataCreated) : totalBiodataCreated,
      happyClients: typeof happyClients === 'string' ? parseInt(happyClients) : happyClients,
      dailyVisits: typeof dailyVisits === 'string' ? parseInt(dailyVisits) : dailyVisits,
      activeUsers: typeof activeUsers === 'string' ? parseInt(activeUsers) : activeUsers,
    } as any;

    const validated = counterCreateValidation.parse(payload);

    const doc = new Counter(validated);
    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Counter created successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const getAllCounters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Counter.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Counters retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getCounterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Counter.findOne({ _id: req.params.id, isDeleted: false });
    if (!doc) return next(new appError('Counter not found', 404));

    res.json({ success: true, statusCode: 200, message: 'Counter retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateCounterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await Counter.findOne({ _id: id, isDeleted: false });
    if (!existing) return next(new appError('Counter not found', 404));

    const { totalBiodataCreated, happyClients, dailyVisits, activeUsers } = req.body as any;

    const updateData: any = {};
    if (totalBiodataCreated !== undefined) updateData.totalBiodataCreated = typeof totalBiodataCreated === 'string' ? parseInt(totalBiodataCreated) : totalBiodataCreated;
    if (happyClients !== undefined) updateData.happyClients = typeof happyClients === 'string' ? parseInt(happyClients) : happyClients;
    if (dailyVisits !== undefined) updateData.dailyVisits = typeof dailyVisits === 'string' ? parseInt(dailyVisits) : dailyVisits;
    if (activeUsers !== undefined) updateData.activeUsers = typeof activeUsers === 'string' ? parseInt(activeUsers) : activeUsers;

    const validated = counterUpdateValidation.parse(updateData);
    const updated = await Counter.findByIdAndUpdate(id, validated, { new: true });

    res.json({ success: true, statusCode: 200, message: 'Counter updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteCounterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Counter.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!updated) return next(new appError('Counter not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Counter deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
