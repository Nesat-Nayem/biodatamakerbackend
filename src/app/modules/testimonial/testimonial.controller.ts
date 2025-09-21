import { NextFunction, Request, Response } from 'express';
import { Testimonial } from './testimonial.model';
import { testimonialCreateValidation, testimonialUpdateValidation } from './testimonial.validation';
import { appError } from '../../errors/appError';

export const createTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, designation, description, status } = req.body as any;

    const validated = testimonialCreateValidation.parse({ name, designation, description, status });

    const doc = new Testimonial(validated);
    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Testimonial created successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const getAllTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Testimonial.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Testimonials retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getTestimonialById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Testimonial.findOne({ _id: req.params.id, isDeleted: false });
    if (!doc) return next(new appError('Testimonial not found', 404));

    res.json({ success: true, statusCode: 200, message: 'Testimonial retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonialById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await Testimonial.findOne({ _id: id, isDeleted: false });
    if (!existing) return next(new appError('Testimonial not found', 404));

    const { name, designation, description, status } = req.body as any;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (designation !== undefined) updateData.designation = designation;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    const validated = testimonialUpdateValidation.parse(updateData);
    const updated = await Testimonial.findByIdAndUpdate(id, validated, { new: true });

    res.json({ success: true, statusCode: 200, message: 'Testimonial updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonialById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Testimonial.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!updated) return next(new appError('Testimonial not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Testimonial deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
