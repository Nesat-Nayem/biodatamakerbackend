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
exports.deleteStepsById = exports.updateStepsById = exports.getStepsById = exports.getAllSteps = exports.createSteps = void 0;
const steps_model_1 = require("./steps.model");
const steps_validation_1 = require("./steps.validation");
const appError_1 = require("../../errors/appError");
const parseCards = (input) => {
    if (input === undefined)
        return undefined;
    let parsed;
    if (typeof input === 'string') {
        try {
            parsed = JSON.parse(input);
        }
        catch (e) {
            throw new appError_1.appError('Invalid JSON for cards', 400);
        }
    }
    else {
        parsed = input;
    }
    return parsed;
};
const createSteps = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, subtitle, cards } = req.body;
        const payload = {
            title,
            subtitle,
            cards: parseCards(cards),
        };
        const validated = steps_validation_1.stepsCreateValidation.parse(payload);
        const doc = new steps_model_1.Steps(validated);
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Steps created successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.createSteps = createSteps;
const getAllSteps = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield steps_model_1.Steps.find({ isDeleted: false }).sort({ createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Steps retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllSteps = getAllSteps;
const getStepsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield steps_model_1.Steps.findOne({ _id: req.params.id, isDeleted: false });
        if (!doc)
            return next(new appError_1.appError('Steps not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Steps retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getStepsById = getStepsById;
const updateStepsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existing = yield steps_model_1.Steps.findOne({ _id: id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Steps not found', 404));
        const { title, subtitle, cards } = req.body;
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (subtitle !== undefined)
            updateData.subtitle = subtitle;
        const parsedCards = parseCards(cards);
        if (parsedCards !== undefined)
            updateData.cards = parsedCards;
        const validated = steps_validation_1.stepsUpdateValidation.parse(updateData);
        const updated = yield steps_model_1.Steps.findByIdAndUpdate(id, validated, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Steps updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updateStepsById = updateStepsById;
const deleteStepsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield steps_model_1.Steps.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Steps not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Steps deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteStepsById = deleteStepsById;
