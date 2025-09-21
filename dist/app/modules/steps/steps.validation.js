"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepsUpdateValidation = exports.stepsCreateValidation = void 0;
const zod_1 = require("zod");
const stepsCardSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    icon: zod_1.z.string().min(1),
    desc: zod_1.z.string().min(1),
});
exports.stepsCreateValidation = zod_1.z.object({
    title: zod_1.z.string().min(1),
    subtitle: zod_1.z.string().optional(),
    cards: zod_1.z.array(stepsCardSchema).length(3, 'Must provide exactly 3 cards'),
});
exports.stepsUpdateValidation = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    subtitle: zod_1.z.string().optional(),
    cards: zod_1.z.array(stepsCardSchema).length(3).optional(),
});
