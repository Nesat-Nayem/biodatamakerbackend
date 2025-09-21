"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterUpdateValidation = exports.counterCreateValidation = void 0;
const zod_1 = require("zod");
exports.counterCreateValidation = zod_1.z.object({
    totalBiodataCreated: zod_1.z.number().nonnegative(),
    happyClients: zod_1.z.number().nonnegative(),
    dailyVisits: zod_1.z.number().nonnegative(),
    activeUsers: zod_1.z.number().nonnegative(),
});
exports.counterUpdateValidation = zod_1.z.object({
    totalBiodataCreated: zod_1.z.number().nonnegative().optional(),
    happyClients: zod_1.z.number().nonnegative().optional(),
    dailyVisits: zod_1.z.number().nonnegative().optional(),
    activeUsers: zod_1.z.number().nonnegative().optional(),
});
