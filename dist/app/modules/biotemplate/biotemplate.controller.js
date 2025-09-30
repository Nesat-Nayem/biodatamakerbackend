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
exports.deleteBioTemplateById = exports.updateBioTemplateById = exports.getBioTemplateById = exports.getAllBioTemplates = exports.createBioTemplate = void 0;
const biotemplate_model_1 = require("./biotemplate.model");
const biotemplate_validation_1 = require("./biotemplate.validation");
const appError_1 = require("../../errors/appError");
const cloudinary_1 = require("../../config/cloudinary");
const createBioTemplate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { templatename } = req.body;
        // If banner image is uploaded through multer middleware, req.file will be available
        if (!req.file) {
            next(new appError_1.appError("Banner image is required", 400));
            return;
        }
        // Get the banner URL from req.file
        const banner = req.file.path;
        // Validate the input
        const validatedData = biotemplate_validation_1.biotemplateValidation.parse({
            templatename,
            banner,
        });
        // Create a new biotemplate
        const biotemplate = new biotemplate_model_1.BioTemplate(validatedData);
        yield biotemplate.save();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "BioTemplate created successfully",
            data: biotemplate,
        });
        return;
    }
    catch (error) {
        // If error is during image upload, delete the uploaded image if any
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
            const publicId = (_b = req.file.path.split('/').pop()) === null || _b === void 0 ? void 0 : _b.split('.')[0];
            if (publicId) {
                yield cloudinary_1.cloudinary.uploader.destroy(`restaurant-banners/${publicId}`);
            }
        }
        next(error);
    }
});
exports.createBioTemplate = createBioTemplate;
const getAllBioTemplates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { isDeleted: false };
        const biotemplates = yield biotemplate_model_1.BioTemplate.find(filter).sort({ createdAt: -1 });
        if (biotemplates.length === 0) {
            res.json({
                success: true,
                statusCode: 200,
                message: "No biotemplates found",
                data: [],
            });
            return;
        }
        res.json({
            success: true,
            statusCode: 200,
            message: "BioTemplates retrieved successfully",
            data: biotemplates,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBioTemplates = getAllBioTemplates;
const getBioTemplateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biotemplate = yield biotemplate_model_1.BioTemplate.findOne({
            _id: req.params.id,
            isDeleted: false
        });
        if (!biotemplate) {
            return next(new appError_1.appError("BioTemplate not found", 404));
        }
        res.json({
            success: true,
            statusCode: 200,
            message: "BioTemplate retrieved successfully",
            data: biotemplate,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getBioTemplateById = getBioTemplateById;
const updateBioTemplateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const biotemplateId = req.params.id;
        const { templatename } = req.body;
        // Find the biotemplate to update
        const biotemplate = yield biotemplate_model_1.BioTemplate.findOne({
            _id: biotemplateId,
            isDeleted: false
        });
        if (!biotemplate) {
            next(new appError_1.appError("BioTemplate not found", 404));
            return;
        }
        // Prepare update data
        const updateData = {};
        if (templatename !== undefined) {
            updateData.templatename = templatename;
        }
        // If there's a new banner image
        if (req.file) {
            updateData.banner = req.file.path;
            // Delete the old image from cloudinary if it exists
            if (biotemplate.banner) {
                const publicId = (_a = biotemplate.banner.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
                if (publicId) {
                    yield cloudinary_1.cloudinary.uploader.destroy(`restaurant-banners/${publicId}`);
                }
            }
        }
        // Validate the update data
        if (Object.keys(updateData).length > 0) {
            const validatedData = biotemplate_validation_1.biotemplateUpdateValidation.parse(updateData);
            // Update the biotemplate
            const updatedBioTemplate = yield biotemplate_model_1.BioTemplate.findByIdAndUpdate(biotemplateId, validatedData, { new: true });
            res.json({
                success: true,
                statusCode: 200,
                message: "BioTemplate updated successfully",
                data: updatedBioTemplate,
            });
            return;
        }
        // If no updates provided
        res.json({
            success: true,
            statusCode: 200,
            message: "No changes to update",
            data: biotemplate,
        });
        return;
    }
    catch (error) {
        // If error occurs and image was uploaded, delete it
        if ((_b = req.file) === null || _b === void 0 ? void 0 : _b.path) {
            const publicId = (_c = req.file.path.split('/').pop()) === null || _c === void 0 ? void 0 : _c.split('.')[0];
            if (publicId) {
                yield cloudinary_1.cloudinary.uploader.destroy(`restaurant-banners/${publicId}`);
            }
        }
        next(error);
    }
});
exports.updateBioTemplateById = updateBioTemplateById;
const deleteBioTemplateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biotemplate = yield biotemplate_model_1.BioTemplate.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!biotemplate) {
            next(new appError_1.appError("BioTemplate not found", 404));
            return;
        }
        res.json({
            success: true,
            statusCode: 200,
            message: "BioTemplate deleted successfully",
            data: biotemplate,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBioTemplateById = deleteBioTemplateById;
