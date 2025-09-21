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
exports.deleteCompareById = exports.updateCompareById = exports.getCompareById = exports.getAllCompares = exports.createCompare = void 0;
const compare_model_1 = require("./compare.model");
const compare_validation_1 = require("./compare.validation");
const appError_1 = require("../../errors/appError");
const cloudinary_1 = require("../../config/cloudinary");
const parseCompare = (input) => {
    if (input === undefined)
        return undefined;
    let parsed;
    if (typeof input === 'string') {
        try {
            parsed = JSON.parse(input);
        }
        catch (e) {
            throw new appError_1.appError('Invalid JSON for compare', 400);
        }
    }
    else {
        parsed = input;
    }
    if (!Array.isArray(parsed))
        return undefined;
    return parsed.map((item) => {
        const title = item.title;
        let value = item.value;
        if (typeof value === 'string') {
            const v = value.toLowerCase();
            value = v === 'yes' || v === 'true';
        }
        return { title, value: !!value };
    });
};
const createCompare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { title, compare } = req.body;
        const banner1File = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.banner1) === null || _b === void 0 ? void 0 : _b[0];
        const banner2File = (_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c.banner2) === null || _d === void 0 ? void 0 : _d[0];
        if (!banner1File || !banner2File) {
            return next(new appError_1.appError('Both banner1 and banner2 images are required', 400));
        }
        const payload = {
            title,
            banner1: banner1File.path,
            banner2: banner2File.path,
            compare: parseCompare(compare),
        };
        const validated = compare_validation_1.compareCreateValidation.parse(payload);
        const doc = new compare_model_1.Compare(validated);
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Compare created successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.createCompare = createCompare;
const getAllCompares = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield compare_model_1.Compare.find({ isDeleted: false }).sort({ createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Compares retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCompares = getAllCompares;
const getCompareById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield compare_model_1.Compare.findOne({ _id: req.params.id, isDeleted: false });
        if (!doc)
            return next(new appError_1.appError('Compare not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Compare retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getCompareById = getCompareById;
const updateCompareById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const { id } = req.params;
        const existing = yield compare_model_1.Compare.findOne({ _id: id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Compare not found', 404));
        const { title, compare } = req.body;
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        const compareParsed = parseCompare(compare);
        if (compareParsed !== undefined)
            updateData.compare = compareParsed;
        const banner1File = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.banner1) === null || _b === void 0 ? void 0 : _b[0];
        const banner2File = (_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c.banner2) === null || _d === void 0 ? void 0 : _d[0];
        if (banner1File) {
            updateData.banner1 = banner1File.path;
            const oldUrl = existing.banner1;
            if (oldUrl) {
                const publicId = (_e = oldUrl.split('/').pop()) === null || _e === void 0 ? void 0 : _e.split('.')[0];
                if (publicId)
                    yield cloudinary_1.cloudinary.uploader.destroy(`restaurant-uploads/${publicId}`).catch(() => void 0);
            }
        }
        if (banner2File) {
            updateData.banner2 = banner2File.path;
            const oldUrl = existing.banner2;
            if (oldUrl) {
                const publicId = (_f = oldUrl.split('/').pop()) === null || _f === void 0 ? void 0 : _f.split('.')[0];
                if (publicId)
                    yield cloudinary_1.cloudinary.uploader.destroy(`restaurant-uploads/${publicId}`).catch(() => void 0);
            }
        }
        const validated = compare_validation_1.compareUpdateValidation.parse(updateData);
        const updated = yield compare_model_1.Compare.findByIdAndUpdate(id, validated, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Compare updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCompareById = updateCompareById;
const deleteCompareById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield compare_model_1.Compare.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Compare not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Compare deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCompareById = deleteCompareById;
