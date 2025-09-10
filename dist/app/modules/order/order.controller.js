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
exports.cancelOrder = exports.adminListOrders = exports.getOrderById = exports.getMyOrders = exports.createOrder = void 0;
const order_model_1 = require("./order.model");
const plan_model_1 = require("../plan/plan.model");
const template_model_1 = require("../template/template.model");
const biodata_model_1 = require("../biodata/biodata.model");
const appError_1 = require("../../errors/appError");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId)
            return next(new appError_1.appError('User not authenticated', 401));
        const { planId, planValue, templateId, biodataId, currency = 'INR' } = req.body;
        let planDoc = null;
        if (planId) {
            planDoc = yield plan_model_1.Plan.findOne({ _id: planId, isDeleted: false, isActive: true });
        }
        else if (planValue) {
            planDoc = yield plan_model_1.Plan.findOne({ value: planValue, isDeleted: false, isActive: true });
        }
        if (!planDoc)
            return next(new appError_1.appError('Plan not found or inactive', 404));
        // Optional associations
        if (templateId) {
            const t = yield template_model_1.Template.findOne({ _id: templateId, isDeleted: false, isActive: true });
            if (!t)
                return next(new appError_1.appError('Template not found or inactive', 404));
        }
        if (biodataId) {
            const b = yield biodata_model_1.Biodata.findOne({ _id: biodataId, isDeleted: false });
            if (!b)
                return next(new appError_1.appError('Biodata not found', 404));
        }
        const totalAmount = Number(planDoc.price);
        const order = new order_model_1.Order({
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
        yield order.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Order created successfully', data: order });
    }
    catch (error) {
        next(error);
    }
});
exports.createOrder = createOrder;
const getMyOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const docs = yield order_model_1.Order.find({ user: userId, isDeleted: false }).sort('-createdAt');
        res.json({ success: true, statusCode: 200, message: 'Orders retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getMyOrders = getMyOrders;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const filter = { _id: req.params.id, isDeleted: false };
        if ((user === null || user === void 0 ? void 0 : user.role) !== 'admin')
            filter.user = user === null || user === void 0 ? void 0 : user._id;
        const doc = yield order_model_1.Order.findOne(filter);
        if (!doc)
            return next(new appError_1.appError('Order not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Order retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderById = getOrderById;
const adminListOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield order_model_1.Order.find({ isDeleted: false }).sort('-createdAt');
        res.json({ success: true, statusCode: 200, message: 'Orders retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.adminListOrders = adminListOrders;
const cancelOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const filter = { _id: req.params.id, isDeleted: false };
        if ((user === null || user === void 0 ? void 0 : user.role) !== 'admin')
            filter.user = user === null || user === void 0 ? void 0 : user._id;
        const doc = yield order_model_1.Order.findOne(filter);
        if (!doc)
            return next(new appError_1.appError('Order not found', 404));
        doc.status = 'cancelled';
        yield doc.save();
        res.json({ success: true, statusCode: 200, message: 'Order cancelled successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.cancelOrder = cancelOrder;
