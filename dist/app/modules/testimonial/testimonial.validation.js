"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialUpdateValidation = exports.testimonialCreateValidation = void 0;
const zod_1 = require("zod");
exports.testimonialCreateValidation = zod_1.z.object({
    name: zod_1.z.string().min(1),
    designation: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    status: zod_1.z.enum(['active', 'inactive']).optional(),
});
exports.testimonialUpdateValidation = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    designation: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(['active', 'inactive']).optional(),
});
