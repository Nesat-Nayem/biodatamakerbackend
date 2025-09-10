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
exports.deletePlanById = exports.updatePlanById = exports.getPlanById = exports.getAllPlans = exports.createPlan = void 0;
const plan_model_1 = require("./plan.model");
const plan_validation_1 = require("./plan.validation");
const appError_1 = require("../../errors/appError");
const createPlan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, value, price, description, label, badgeColor, isBest, isActive, order } = req.body;
        const validated = plan_validation_1.planCreateValidation.parse({
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
        const existing = yield plan_model_1.Plan.findOne({ value: validated.value, isDeleted: false });
        if (existing)
            return next(new appError_1.appError('Plan with this value already exists', 400));
        const doc = new plan_model_1.Plan(validated);
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Plan created successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.createPlan = createPlan;
const getAllPlans = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { active } = req.query;
        const filter = { isDeleted: false };
        if (active === 'true')
            filter.isActive = true;
        const docs = yield plan_model_1.Plan.find(filter).sort({ order: 1, createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Plans retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPlans = getAllPlans;
const getPlanById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield plan_model_1.Plan.findOne({ _id: req.params.id, isDeleted: false });
        if (!doc)
            return next(new appError_1.appError('Plan not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Plan retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getPlanById = getPlanById;
const updatePlanById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existing = yield plan_model_1.Plan.findOne({ _id: id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Plan not found', 404));
        const { name, value, price, description, label, badgeColor, isBest, isActive, order } = req.body;
        const updateData = plan_validation_1.planUpdateValidation.parse({
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
        const updated = yield plan_model_1.Plan.findByIdAndUpdate(id, updateData, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Plan updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePlanById = updatePlanById;
const deletePlanById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield plan_model_1.Plan.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Plan not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Plan deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePlanById = deletePlanById;
