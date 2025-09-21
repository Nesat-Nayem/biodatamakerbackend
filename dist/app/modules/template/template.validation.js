"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateUpdateValidation = exports.templateCreateValidation = void 0;
const zod_1 = require("zod");
exports.templateCreateValidation = zod_1.z.object({
    name: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1).optional(),
    thumbnail: zod_1.z.string().min(1),
    previewImages: zod_1.z.array(zod_1.z.string()).optional(),
    categories: zod_1.z.array(zod_1.z.string()).optional(),
    // Newly added optional fields
    title: zod_1.z.string().optional(),
    subtitle: zod_1.z.string().optional(),
    banners: zod_1.z.array(zod_1.z.string()).optional(),
    seoTitle: zod_1.z.string().optional(),
    seoTags: zod_1.z.array(zod_1.z.string()).optional(),
    seoDescription: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional(),
});
exports.templateUpdateValidation = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    slug: zod_1.z.string().min(1).optional(),
    thumbnail: zod_1.z.string().min(1).optional(),
    previewImages: zod_1.z.array(zod_1.z.string()).optional(),
    categories: zod_1.z.array(zod_1.z.string()).optional(),
    title: zod_1.z.string().optional(),
    subtitle: zod_1.z.string().optional(),
    banners: zod_1.z.array(zod_1.z.string()).optional(),
    seoTitle: zod_1.z.string().optional(),
    seoTags: zod_1.z.array(zod_1.z.string()).optional(),
    seoDescription: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional(),
});
