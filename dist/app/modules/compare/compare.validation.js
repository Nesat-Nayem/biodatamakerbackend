"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareUpdateValidation = exports.compareCreateValidation = void 0;
const zod_1 = require("zod");
const compareItemSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    value: zod_1.z.boolean(),
});
exports.compareCreateValidation = zod_1.z.object({
    title: zod_1.z.string().min(1),
    banner1: zod_1.z.string().min(1),
    banner2: zod_1.z.string().min(1),
    compare: zod_1.z.array(compareItemSchema).optional(),
});
exports.compareUpdateValidation = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    banner1: zod_1.z.string().min(1).optional(),
    banner2: zod_1.z.string().min(1).optional(),
    compare: zod_1.z.array(compareItemSchema).optional(),
});
