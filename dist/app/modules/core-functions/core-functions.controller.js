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
exports.deleteCoreFunctionsById = exports.updateCoreFunctionsById = exports.getCoreFunctionsById = exports.getAllCoreFunctions = exports.createCoreFunctions = void 0;
const core_functions_model_1 = require("./core-functions.model");
const core_functions_validation_1 = require("./core-functions.validation");
const appError_1 = require("../../errors/appError");
const cloudinary_1 = require("../../config/cloudinary");
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
const createCoreFunctions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, subtitle, cards } = req.body;
        if (!req.file)
            return next(new appError_1.appError('Banner image is required', 400));
        const payload = {
            title,
            subtitle,
            banner: req.file.path,
            cards: parseCards(cards),
        };
        const validated = core_functions_validation_1.coreFunctionsCreateValidation.parse(payload);
        const doc = new core_functions_model_1.CoreFunctions(validated);
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Core Functions created successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.createCoreFunctions = createCoreFunctions;
const getAllCoreFunctions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield core_functions_model_1.CoreFunctions.find({ isDeleted: false }).sort({ createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Core Functions retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCoreFunctions = getAllCoreFunctions;
const getCoreFunctionsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield core_functions_model_1.CoreFunctions.findOne({ _id: req.params.id, isDeleted: false });
        if (!doc)
            return next(new appError_1.appError('Core Functions not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Core Functions retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getCoreFunctionsById = getCoreFunctionsById;
const updateCoreFunctionsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const existing = yield core_functions_model_1.CoreFunctions.findOne({ _id: id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Core Functions not found', 404));
        const { title, subtitle, cards } = req.body;
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (subtitle !== undefined)
            updateData.subtitle = subtitle;
        const parsedCards = parseCards(cards);
        if (parsedCards !== undefined)
            updateData.cards = parsedCards;
        if (req.file) {
            updateData.banner = req.file.path;
            const oldUrl = existing.banner;
            if (oldUrl) {
                const publicId = (_a = oldUrl.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
                if (publicId)
                    yield cloudinary_1.cloudinary.uploader.destroy(`restaurant-uploads/${publicId}`).catch(() => void 0);
            }
        }
        const validated = core_functions_validation_1.coreFunctionsUpdateValidation.parse(updateData);
        const updated = yield core_functions_model_1.CoreFunctions.findByIdAndUpdate(id, validated, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Core Functions updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCoreFunctionsById = updateCoreFunctionsById;
const deleteCoreFunctionsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield core_functions_model_1.CoreFunctions.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Core Functions not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Core Functions deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCoreFunctionsById = deleteCoreFunctionsById;
