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
exports.deleteAdvertiseById = exports.updateAdvertiseById = exports.getAdvertiseById = exports.getAllAdvertises = exports.createAdvertise = void 0;
const advertise_model_1 = require("./advertise.model");
const advertise_validation_1 = require("./advertise.validation");
const appError_1 = require("../../errors/appError");
const cloudinary_1 = require("../../config/cloudinary");
const createAdvertise = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, status } = req.body;
        if (!req.file) {
            return next(new appError_1.appError('Advertise banner is required', 400));
        }
        const payload = {
            banner: req.file.path,
            url,
            status,
        };
        const validated = advertise_validation_1.advertiseCreateValidation.parse(payload);
        const doc = new advertise_model_1.Advertise(validated);
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Advertise created successfully', data: doc });
    }
    catch (error) {
        // no cleanup as cloudinary storage auto handles temp files
        next(error);
    }
});
exports.createAdvertise = createAdvertise;
const getAllAdvertises = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield advertise_model_1.Advertise.find({ isDeleted: false }).sort({ createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Advertises retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAdvertises = getAllAdvertises;
const getAdvertiseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield advertise_model_1.Advertise.findOne({ _id: req.params.id, isDeleted: false });
        if (!doc)
            return next(new appError_1.appError('Advertise not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Advertise retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getAdvertiseById = getAdvertiseById;
const updateAdvertiseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const existing = yield advertise_model_1.Advertise.findOne({ _id: id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Advertise not found', 404));
        const { url, status } = req.body;
        const updateData = {};
        if (url !== undefined)
            updateData.url = url;
        if (status !== undefined)
            updateData.status = status;
        if (req.file) {
            updateData.banner = req.file.path;
            // attempt to delete old banner
            const oldUrl = existing.banner;
            if (oldUrl) {
                const publicId = (_a = oldUrl.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
                if (publicId) {
                    yield cloudinary_1.cloudinary.uploader.destroy(`restaurant-uploads/${publicId}`).catch(() => void 0);
                }
            }
        }
        const validated = advertise_validation_1.advertiseUpdateValidation.parse(updateData);
        const updated = yield advertise_model_1.Advertise.findByIdAndUpdate(id, validated, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Advertise updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAdvertiseById = updateAdvertiseById;
const deleteAdvertiseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield advertise_model_1.Advertise.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Advertise not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Advertise deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAdvertiseById = deleteAdvertiseById;
