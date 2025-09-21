import { NextFunction, Request, Response } from 'express';
import { Transaction } from './transaction.model';
import { transactionCreateValidation, transactionUpdateValidation } from './transaction.validation';
import { appError } from '../../errors/appError';

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, selectedPackage, payment, paymentMode, status } = req.body as any;

    const payload = {
      fullName,
      selectedPackage,
      payment: typeof payment === 'string' ? parseFloat(payment) : payment,
      paymentMode,
      status,
    };

    const validated = transactionCreateValidation.parse(payload);
    const doc = new Transaction(validated);
    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Transaction created successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Transaction.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Transactions retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Transaction.findOne({ _id: req.params.id, isDeleted: false });
    if (!doc) return next(new appError('Transaction not found', 404));

    res.json({ success: true, statusCode: 200, message: 'Transaction retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateTransactionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await Transaction.findOne({ _id: id, isDeleted: false });
    if (!existing) return next(new appError('Transaction not found', 404));

    const { fullName, selectedPackage, payment, paymentMode, status } = req.body as any;

    const updateData: any = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (selectedPackage !== undefined) updateData.selectedPackage = selectedPackage;
    if (payment !== undefined) updateData.payment = typeof payment === 'string' ? parseFloat(payment) : payment;
    if (paymentMode !== undefined) updateData.paymentMode = paymentMode;
    if (status !== undefined) updateData.status = status;

    const validated = transactionUpdateValidation.parse(updateData);
    const updated = await Transaction.findByIdAndUpdate(id, validated, { new: true });

    res.json({ success: true, statusCode: 200, message: 'Transaction updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteTransactionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Transaction.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!updated) return next(new appError('Transaction not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Transaction deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
