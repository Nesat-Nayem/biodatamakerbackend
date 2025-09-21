import { NextFunction, Request, Response } from 'express';
import { Steps } from './steps.model';
import { stepsCreateValidation, stepsUpdateValidation } from './steps.validation';
import { appError } from '../../errors/appError';

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

export const createSteps = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, subtitle, cards } = req.body as any;

    const payload = {
      title,
      subtitle,
      cards: parseCards(cards),
    } as any;

    const validated = stepsCreateValidation.parse(payload);
    const doc = new Steps(validated);
    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Steps created successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const getAllSteps = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Steps.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Steps retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getStepsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Steps.findOne({ _id: req.params.id, isDeleted: false });
    if (!doc) return next(new appError('Steps not found', 404));

    res.json({ success: true, statusCode: 200, message: 'Steps retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateStepsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await Steps.findOne({ _id: id, isDeleted: false });
    if (!existing) return next(new appError('Steps not found', 404));

    const { title, subtitle, cards } = req.body as any;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;

    const parsedCards = parseCards(cards);
    if (parsedCards !== undefined) updateData.cards = parsedCards;

    const validated = stepsUpdateValidation.parse(updateData);
    const updated = await Steps.findByIdAndUpdate(id, validated, { new: true });

    res.json({ success: true, statusCode: 200, message: 'Steps updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteStepsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Steps.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!updated) return next(new appError('Steps not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Steps deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
