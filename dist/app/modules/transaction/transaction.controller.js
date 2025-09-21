"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionById = exports.updateTransactionById = exports.getTransactionById = exports.getAllTransactions = exports.createTransaction = void 0;
const transaction_model_1 = require("./transaction.model");
const transaction_validation_1 = require("./transaction.validation");
const appError_1 = require("../../errors/appError");
const createTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, selectedPackage, payment, paymentMode, status } = req.body;
        const payload = {
            fullName,
            selectedPackage,
            payment: typeof payment === 'string' ? parseFloat(payment) : payment,
            paymentMode,
            status,
        };
        const validated = transaction_validation_1.transactionCreateValidation.parse(payload);
        const doc = new transaction_model_1.Transaction(validated);
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Transaction created successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.createTransaction = createTransaction;
const getAllTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield transaction_model_1.Transaction.find({ isDeleted: false }).sort({ createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Transactions retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTransactions = getAllTransactions;
const getTransactionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield transaction_model_1.Transaction.findOne({ _id: req.params.id, isDeleted: false });
        if (!doc)
            return next(new appError_1.appError('Transaction not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Transaction retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getTransactionById = getTransactionById;
const updateTransactionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existing = yield transaction_model_1.Transaction.findOne({ _id: id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Transaction not found', 404));
        const { fullName, selectedPackage, payment, paymentMode, status } = req.body;
        const updateData = {};
        if (fullName !== undefined)
            updateData.fullName = fullName;
        if (selectedPackage !== undefined)
            updateData.selectedPackage = selectedPackage;
        if (payment !== undefined)
            updateData.payment = typeof payment === 'string' ? parseFloat(payment) : payment;
        if (paymentMode !== undefined)
            updateData.paymentMode = paymentMode;
        if (status !== undefined)
            updateData.status = status;
        const validated = transaction_validation_1.transactionUpdateValidation.parse(updateData);
        const updated = yield transaction_model_1.Transaction.findByIdAndUpdate(id, validated, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Transaction updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTransactionById = updateTransactionById;
const deleteTransactionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield transaction_model_1.Transaction.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Transaction not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Transaction deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTransactionById = deleteTransactionById;
