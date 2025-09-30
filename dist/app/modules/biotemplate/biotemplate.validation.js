"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biotemplateUpdateValidation = exports.biotemplateValidation = void 0;
const zod_1 = require("zod");
exports.biotemplateValidation = zod_1.z.object({
    templatename: zod_1.z.string().min(1, 'Template name is required'),
    banner: zod_1.z.string().min(1, 'Banner is required'),
});
exports.biotemplateUpdateValidation = zod_1.z.object({
    templatename: zod_1.z.string().min(1, 'Template name is required').optional(),
    banner: zod_1.z.string().min(1, 'Banner is required').optional(),
});
