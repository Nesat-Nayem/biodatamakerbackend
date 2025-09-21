"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageUpdateValidation = exports.packageCreateValidation = void 0;
const zod_1 = require("zod");
exports.packageCreateValidation = zod_1.z.object({
    title: zod_1.z.string().min(1),
    subtitle: zod_1.z.string().optional(),
    aiDescription: zod_1.z.string().optional(),
    proTip: zod_1.z.string().optional(),
    packageName: zod_1.z.string().min(1),
    packageSubtitle: zod_1.z.string().optional(),
    badgeTitle: zod_1.z.string().optional(),
    packagePrice: zod_1.z.number().nonnegative(),
    packageDescription: zod_1.z.string().min(1),
});
exports.packageUpdateValidation = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    subtitle: zod_1.z.string().optional(),
    aiDescription: zod_1.z.string().optional(),
    proTip: zod_1.z.string().optional(),
    packageName: zod_1.z.string().min(1).optional(),
    packageSubtitle: zod_1.z.string().optional(),
    badgeTitle: zod_1.z.string().optional(),
    packagePrice: zod_1.z.number().nonnegative().optional(),
    packageDescription: zod_1.z.string().min(1).optional(),
});
