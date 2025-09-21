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
exports.deletePackageById = exports.updatePackageById = exports.getPackageById = exports.getAllPackages = exports.createPackage = void 0;
const package_model_1 = require("./package.model");
const package_validation_1 = require("./package.validation");
const appError_1 = require("../../errors/appError");
const createPackage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, subtitle, aiDescription, proTip, packageName, packageSubtitle, badgeTitle, packagePrice, packageDescription, } = req.body;
        const payload = {
            title,
            subtitle,
            aiDescription,
            proTip,
            packageName,
            packageSubtitle,
            badgeTitle,
            packagePrice: typeof packagePrice === 'string' ? parseFloat(packagePrice) : packagePrice,
            packageDescription,
        };
        const validated = package_validation_1.packageCreateValidation.parse(payload);
        const doc = new package_model_1.Package(validated);
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Package created successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.createPackage = createPackage;
const getAllPackages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield package_model_1.Package.find({ isDeleted: false }).sort({ createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Packages retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPackages = getAllPackages;
const getPackageById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield package_model_1.Package.findOne({ _id: req.params.id, isDeleted: false });
        if (!doc)
            return next(new appError_1.appError('Package not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Package retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getPackageById = getPackageById;
const updatePackageById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existing = yield package_model_1.Package.findOne({ _id: id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Package not found', 404));
        const { title, subtitle, aiDescription, proTip, packageName, packageSubtitle, badgeTitle, packagePrice, packageDescription, } = req.body;
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (subtitle !== undefined)
            updateData.subtitle = subtitle;
        if (aiDescription !== undefined)
            updateData.aiDescription = aiDescription;
        if (proTip !== undefined)
            updateData.proTip = proTip;
        if (packageName !== undefined)
            updateData.packageName = packageName;
        if (packageSubtitle !== undefined)
            updateData.packageSubtitle = packageSubtitle;
        if (badgeTitle !== undefined)
            updateData.badgeTitle = badgeTitle;
        if (packagePrice !== undefined)
            updateData.packagePrice = typeof packagePrice === 'string' ? parseFloat(packagePrice) : packagePrice;
        if (packageDescription !== undefined)
            updateData.packageDescription = packageDescription;
        const validated = package_validation_1.packageUpdateValidation.parse(updateData);
        const updated = yield package_model_1.Package.findByIdAndUpdate(id, validated, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Package updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePackageById = updatePackageById;
const deletePackageById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield package_model_1.Package.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Package not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Package deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePackageById = deletePackageById;
