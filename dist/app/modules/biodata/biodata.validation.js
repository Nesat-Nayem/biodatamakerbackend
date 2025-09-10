"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biodataUpdateValidation = exports.biodataCreateValidation = void 0;
const zod_1 = require("zod");
const fieldSchema = zod_1.z.object({
    label: zod_1.z.string().min(1),
    type: zod_1.z.string().min(1),
    required: zod_1.z.boolean().optional(),
    value: zod_1.z.string().optional(),
    options: zod_1.z.array(zod_1.z.string()).optional(),
});
const sectionsSchema = zod_1.z.record(zod_1.z.string(), zod_1.z.array(fieldSchema));
exports.biodataCreateValidation = zod_1.z.object({
    title: zod_1.z.string().optional(),
    godName: zod_1.z.string().optional(),
    sections: sectionsSchema,
    template: zod_1.z.string().optional(),
    profilePhoto: zod_1.z.string().optional(),
    godPhoto: zod_1.z.string().optional(),
});
exports.biodataUpdateValidation = zod_1.z.object({
    title: zod_1.z.string().optional(),
    godName: zod_1.z.string().optional(),
    sections: sectionsSchema.optional(),
    template: zod_1.z.string().optional(),
    profilePhoto: zod_1.z.string().optional(),
    godPhoto: zod_1.z.string().optional(),
});
