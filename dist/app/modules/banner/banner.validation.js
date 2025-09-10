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
    image: zod_1.z.string().min(1, 'Image is required'),
    primaryButton: buttonSchema,
    secondaryButton: buttonSchema.partial().optional(),
    isActive: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional()
});
exports.bannerUpdateValidation = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Banner title is required').optional(),
    description: zod_1.z.string().min(1, 'Banner description is required').optional(),
    image: zod_1.z.string().min(1, 'Image is required').optional(),
    primaryButton: buttonSchema.partial().optional(),
    secondaryButton: buttonSchema.partial().optional(),
    isActive: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional()
});
