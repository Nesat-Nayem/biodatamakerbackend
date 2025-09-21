"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertiseUpdateValidation = exports.advertiseCreateValidation = void 0;
const zod_1 = require("zod");
exports.advertiseCreateValidation = zod_1.z.object({
    banner: zod_1.z.string().min(1),
    url: zod_1.z.string().min(1),
    status: zod_1.z.enum(['active', 'inactive']).optional(),
});
exports.advertiseUpdateValidation = zod_1.z.object({
    banner: zod_1.z.string().min(1).optional(),
    url: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(['active', 'inactive']).optional(),
});
