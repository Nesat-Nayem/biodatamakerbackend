"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerUpdateValidation = exports.bannerValidation = void 0;
const zod_1 = require("zod");
const buttonSchema = zod_1.z.object({
    label: zod_1.z.string().min(1, 'Button label is required'),
    href: zod_1.z.string().min(1, 'Button href is required'),
});
exports.bannerValidation = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Banner title is required'),
    description: zod_1.z.string().min(1, 'Banner description is required'),
    shortDesc: zod_1.z.string().min(1, 'Short description is required'),
    image: zod_1.z.string().min(1, 'Image is required'),
    banner: zod_1.z.string().min(1, 'Banner image is required'),
    primaryButton: buttonSchema,
    secondaryButton: buttonSchema.partial().optional(),
    totalBiodataCreated: zod_1.z.number().nonnegative().optional(),
    status: zod_1.z.enum(['active', 'inactive']).optional(),
    isActive: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional()
});
exports.bannerUpdateValidation = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Banner title is required').optional(),
    description: zod_1.z.string().min(1, 'Banner description is required').optional(),
    shortDesc: zod_1.z.string().min(1, 'Short description is required').optional(),
    image: zod_1.z.string().min(1, 'Image is required').optional(),
    banner: zod_1.z.string().min(1, 'Banner image is required').optional(),
    primaryButton: buttonSchema.partial().optional(),
    secondaryButton: buttonSchema.partial().optional(),
    totalBiodataCreated: zod_1.z.number().nonnegative().optional(),
    status: zod_1.z.enum(['active', 'inactive']).optional(),
    isActive: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional()
});
