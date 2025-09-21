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
exports.deleteCounterById = exports.updateCounterById = exports.getCounterById = exports.getAllCounters = exports.createCounter = void 0;
const counter_model_1 = require("./counter.model");
const counter_validation_1 = require("./counter.validation");
const appError_1 = require("../../errors/appError");
const createCounter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { totalBiodataCreated, happyClients, dailyVisits, activeUsers } = req.body;
        const payload = {
            totalBiodataCreated: typeof totalBiodataCreated === 'string' ? parseInt(totalBiodataCreated) : totalBiodataCreated,
            happyClients: typeof happyClients === 'string' ? parseInt(happyClients) : happyClients,
            dailyVisits: typeof dailyVisits === 'string' ? parseInt(dailyVisits) : dailyVisits,
            activeUsers: typeof activeUsers === 'string' ? parseInt(activeUsers) : activeUsers,
        };
        const validated = counter_validation_1.counterCreateValidation.parse(payload);
        const doc = new counter_model_1.Counter(validated);
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Counter created successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.createCounter = createCounter;
const getAllCounters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield counter_model_1.Counter.find({ isDeleted: false }).sort({ createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Counters retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCounters = getAllCounters;
const getCounterById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield counter_model_1.Counter.findOne({ _id: req.params.id, isDeleted: false });
        if (!doc)
            return next(new appError_1.appError('Counter not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Counter retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getCounterById = getCounterById;
const updateCounterById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existing = yield counter_model_1.Counter.findOne({ _id: id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Counter not found', 404));
        const { totalBiodataCreated, happyClients, dailyVisits, activeUsers } = req.body;
        const updateData = {};
        if (totalBiodataCreated !== undefined)
            updateData.totalBiodataCreated = typeof totalBiodataCreated === 'string' ? parseInt(totalBiodataCreated) : totalBiodataCreated;
        if (happyClients !== undefined)
            updateData.happyClients = typeof happyClients === 'string' ? parseInt(happyClients) : happyClients;
        if (dailyVisits !== undefined)
            updateData.dailyVisits = typeof dailyVisits === 'string' ? parseInt(dailyVisits) : dailyVisits;
        if (activeUsers !== undefined)
            updateData.activeUsers = typeof activeUsers === 'string' ? parseInt(activeUsers) : activeUsers;
        const validated = counter_validation_1.counterUpdateValidation.parse(updateData);
        const updated = yield counter_model_1.Counter.findByIdAndUpdate(id, validated, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Counter updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCounterById = updateCounterById;
const deleteCounterById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield counter_model_1.Counter.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Counter not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Counter deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCounterById = deleteCounterById;
