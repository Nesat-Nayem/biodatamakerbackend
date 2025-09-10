"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planUpdateValidation = exports.planCreateValidation = void 0;
const zod_1 = require("zod");
exports.planCreateValidation = zod_1.z.object({
    name: zod_1.z.string().min(1),
    value: zod_1.z.string().min(1),
    price: zod_1.z.number().nonnegative(),
    description: zod_1.z.string().optional(),
    label: zod_1.z.string().optional(),
    badgeColor: zod_1.z.string().optional(),
    isBest: zod_1.z.boolean().optional(),
    isActive: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional(),
});
exports.planUpdateValidation = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    value: zod_1.z.string().min(1).optional(),
    price: zod_1.z.number().nonnegative().optional(),
    description: zod_1.z.string().optional(),
    label: zod_1.z.string().optional(),
    badgeColor: zod_1.z.string().optional(),
    isBest: zod_1.z.boolean().optional(),
    isActive: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional(),
});
