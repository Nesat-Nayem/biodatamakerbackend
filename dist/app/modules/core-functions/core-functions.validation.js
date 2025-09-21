"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreFunctionsUpdateValidation = exports.coreFunctionsCreateValidation = void 0;
const zod_1 = require("zod");
const coreCardSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    subtitle: zod_1.z.string().min(1),
});
exports.coreFunctionsCreateValidation = zod_1.z.object({
    title: zod_1.z.string().min(1),
    subtitle: zod_1.z.string().optional(),
    banner: zod_1.z.string().min(1),
    cards: zod_1.z.array(coreCardSchema).length(3, 'Must provide exactly 3 cards'),
});
exports.coreFunctionsUpdateValidation = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    subtitle: zod_1.z.string().optional(),
    banner: zod_1.z.string().min(1).optional(),
    cards: zod_1.z.array(coreCardSchema).length(3).optional(),
});
