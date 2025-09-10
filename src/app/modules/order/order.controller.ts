import { NextFunction, Request, Response } from 'express';
import { Order } from './order.model';
import { Plan } from '../plan/plan.model';
import { Template } from '../template/template.model';
import { Biodata } from '../biodata/biodata.model';
import { appError } from '../../errors/appError';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?._id;
    if (!userId) return next(new appError('User not authenticated', 401));

    const { planId, planValue, templateId, biodataId, currency = 'INR' } = req.body as any;

    let planDoc = null;
    if (planId) {
      planDoc = await Plan.findOne({ _id: planId, isDeleted: false, isActive: true });
    } else if (planValue) {
      planDoc = await Plan.findOne({ value: planValue, isDeleted: false, isActive: true });
    }
    if (!planDoc) return next(new appError('Plan not found or inactive', 404));

    // Optional associations
    if (templateId) {
      const t = await Template.findOne({ _id: templateId, isDeleted: false, isActive: true });
      if (!t) return next(new appError('Template not found or inactive', 404));
    }
    if (biodataId) {
      const b = await Biodata.findOne({ _id: biodataId, isDeleted: false });
      if (!b) return next(new appError('Biodata not found', 404));
    }

    const totalAmount = Number(planDoc.price);

    const order = new Order({
      user: userId,
      plan: planDoc._id,
      planValue: planDoc.value,
      template: templateId,
      biodata: biodataId,
      totalAmount,
      currency: currency.toUpperCase(),
      paymentStatus: 'unpaid',
      status: 'created',
    });

    await order.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Order created successfully', data: order });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?._id;
    const docs = await Order.find({ user: userId, isDeleted: false }).sort('-createdAt');
    res.json({ success: true, statusCode: 200, message: 'Orders retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const filter: any = { _id: req.params.id, isDeleted: false };
    if (user?.role !== 'admin') filter.user = user?._id;

    const doc = await Order.findOne(filter);
    if (!doc) return next(new appError('Order not found', 404));

    res.json({ success: true, statusCode: 200, message: 'Order retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const adminListOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Order.find({ isDeleted: false }).sort('-createdAt');
    res.json({ success: true, statusCode: 200, message: 'Orders retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const filter: any = { _id: req.params.id, isDeleted: false };
    if (user?.role !== 'admin') filter.user = user?._id;

    const doc = await Order.findOne(filter);
    if (!doc) return next(new appError('Order not found', 404));

    doc.status = 'cancelled';
    await doc.save();
    res.json({ success: true, statusCode: 200, message: 'Order cancelled successfully', data: doc });
  } catch (error) {
    next(error);
  }
};
