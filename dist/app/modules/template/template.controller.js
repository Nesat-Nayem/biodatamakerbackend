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
exports.deleteTemplateById = exports.updateTemplateById = exports.getTemplateById = exports.getAllTemplates = exports.createTemplate = void 0;
const template_model_1 = require("./template.model");
const template_validation_1 = require("./template.validation");
const appError_1 = require("../../errors/appError");
const cloudinary_1 = require("../../config/cloudinary");
const slugify = (str) => str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
const createTemplate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { name, slug, categories, previewImages, isActive, order, title, subtitle, seoTitle, seoTags, seoDescription } = req.body;
        const thumbFile = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail) === null || _b === void 0 ? void 0 : _b[0];
        if (!thumbFile) {
            return next(new appError_1.appError('Template thumbnail is required', 400));
        }
        const thumbnail = thumbFile.path;
        let previews = [];
        const previewFiles = ((_c = req.files) === null || _c === void 0 ? void 0 : _c.previews) || [];
        if (previewFiles.length) {
            previews = previewFiles.map((f) => f.path);
        }
        else if (previewImages) {
            try {
                const parsed = typeof previewImages === 'string' ? JSON.parse(previewImages) : previewImages;
                if (Array.isArray(parsed))
                    previews = parsed;
            }
            catch (e) {
                return next(new appError_1.appError('Invalid JSON for previewImages', 400));
            }
        }
        // Banners multi image
        let banners = undefined;
        const bannersFiles = ((_d = req.files) === null || _d === void 0 ? void 0 : _d.banners) || [];
        if (bannersFiles.length) {
            banners = bannersFiles.map((f) => f.path);
        }
        // Parse categories (stringified array supported)
        let parsedCategories = undefined;
        if (categories !== undefined) {
            try {
                parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
            }
            catch (e) {
                return next(new appError_1.appError('Invalid JSON for categories', 400));
            }
        }
        // Parse SEO tags: accept JSON string, comma-separated string, or array
        let parsedSeoTags = undefined;
        if (seoTags !== undefined) {
            if (Array.isArray(seoTags)) {
                parsedSeoTags = seoTags;
            }
            else if (typeof seoTags === 'string') {
                try {
                    if (seoTags.trim().startsWith('[')) {
                        parsedSeoTags = JSON.parse(seoTags);
                    }
                    else {
                        parsedSeoTags = seoTags.split(',').map((s) => s.trim()).filter(Boolean);
                    }
                }
                catch (e) {
                    return next(new appError_1.appError('Invalid SEO tags format', 400));
                }
            }
        }
        const validated = template_validation_1.templateCreateValidation.parse({
            name,
            slug: slug || slugify(name),
            thumbnail,
            previewImages: previews,
            categories: parsedCategories,
            title,
            subtitle,
            banners,
            seoTitle,
            seoTags: parsedSeoTags,
            seoDescription,
            isActive: isActive === 'true' || isActive === true || undefined,
            order: order ? parseInt(order) : undefined,
        });
        const doc = new template_model_1.Template(validated);
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Template created successfully', data: doc });
    }
    catch (error) {
        // cleanup uploaded files on error
        const files = req.files || {};
        const cleanup = (fileArr, folder) => {
            var _a;
            for (const f of fileArr || []) {
                const publicId = (_a = f.path.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
                if (publicId)
                    cloudinary_1.cloudinary.uploader.destroy(`${folder}/${publicId}`).catch(() => void 0);
            }
        };
        cleanup(files.thumbnail, 'restaurant-templates');
        cleanup(files.previews, 'restaurant-templates');
        cleanup(files.banners, 'restaurant-templates');
        next(error);
    }
});
exports.createTemplate = createTemplate;
const getAllTemplates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { active } = req.query;
        const filter = { isDeleted: false };
        if (active === 'true')
            filter.isActive = true;
        const docs = yield template_model_1.Template.find(filter).sort({ order: 1, createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Templates retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTemplates = getAllTemplates;
const getTemplateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield template_model_1.Template.findOne({ _id: req.params.id, isDeleted: false });
        if (!doc)
            return next(new appError_1.appError('Template not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Template retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getTemplateById = getTemplateById;
const updateTemplateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const { id } = req.params;
        const { name, slug, categories, previewImages, isActive, order, title, subtitle, seoTitle, seoTags, seoDescription, banners } = req.body;
        const existing = yield template_model_1.Template.findOne({ _id: id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Template not found', 404));
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (slug !== undefined)
            updateData.slug = slug || slugify(name || existing.name);
        if (categories !== undefined) {
            try {
                updateData.categories = typeof categories === 'string' ? JSON.parse(categories) : categories;
            }
            catch (e) {
                return next(new appError_1.appError('Invalid JSON for categories', 400));
            }
        }
        if (isActive !== undefined)
            updateData.isActive = isActive === 'true' || isActive === true;
        if (order !== undefined)
            updateData.order = parseInt(order);
        if (title !== undefined)
            updateData.title = title;
        if (subtitle !== undefined)
            updateData.subtitle = subtitle;
        if (seoTitle !== undefined)
            updateData.seoTitle = seoTitle;
        if (seoDescription !== undefined)
            updateData.seoDescription = seoDescription;
        if (seoTags !== undefined) {
            if (Array.isArray(seoTags)) {
                updateData.seoTags = seoTags;
            }
            else if (typeof seoTags === 'string') {
                try {
                    updateData.seoTags = seoTags.trim().startsWith('[')
                        ? JSON.parse(seoTags)
                        : seoTags.split(',').map((s) => s.trim()).filter(Boolean);
                }
                catch (e) {
                    return next(new appError_1.appError('Invalid SEO tags format', 400));
                }
            }
        }
        const thumbFile = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail) === null || _b === void 0 ? void 0 : _b[0];
        if (thumbFile) {
            updateData.thumbnail = thumbFile.path;
            if (existing.thumbnail) {
                const publicId = (_c = existing.thumbnail.split('/').pop()) === null || _c === void 0 ? void 0 : _c.split('.')[0];
                if (publicId)
                    yield cloudinary_1.cloudinary.uploader.destroy(`restaurant-templates/${publicId}`);
            }
        }
        const previewFiles = ((_d = req.files) === null || _d === void 0 ? void 0 : _d.previews) || [];
        if (previewFiles.length) {
            updateData.previewImages = previewFiles.map((f) => f.path);
        }
        else if (previewImages !== undefined) {
            try {
                const parsed = typeof previewImages === 'string' ? JSON.parse(previewImages) : previewImages;
                updateData.previewImages = parsed;
            }
            catch (e) {
                return next(new appError_1.appError('Invalid JSON for previewImages', 400));
            }
        }
        // Handle banners update: files or body array/string
        const bannersFiles = ((_e = req.files) === null || _e === void 0 ? void 0 : _e.banners) || [];
        if (bannersFiles.length) {
            updateData.banners = bannersFiles.map((f) => f.path);
        }
        else if (banners !== undefined) {
            try {
                updateData.banners = typeof banners === 'string' ? JSON.parse(banners) : banners;
            }
            catch (e) {
                return next(new appError_1.appError('Invalid JSON for banners', 400));
            }
        }
        const validated = template_validation_1.templateUpdateValidation.parse(updateData);
        const updated = yield template_model_1.Template.findByIdAndUpdate(id, validated, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Template updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTemplateById = updateTemplateById;
const deleteTemplateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield template_model_1.Template.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Template not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Template deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTemplateById = deleteTemplateById;
