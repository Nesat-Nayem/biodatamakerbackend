"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionUpdateValidation = exports.transactionCreateValidation = void 0;
const zod_1 = require("zod");
exports.transactionCreateValidation = zod_1.z.object({
    fullName: zod_1.z.string().min(1),
    selectedPackage: zod_1.z.string().min(1),
    payment: zod_1.z.number().nonnegative(),
    paymentMode: zod_1.z.string().min(1),
    status: zod_1.z.enum(['pending', 'success', 'failed', 'cancelled']).optional(),
});
exports.transactionUpdateValidation = zod_1.z.object({
    fullName: zod_1.z.string().min(1).optional(),
    selectedPackage: zod_1.z.string().min(1).optional(),
    payment: zod_1.z.number().nonnegative().optional(),
    paymentMode: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(['pending', 'success', 'failed', 'cancelled']).optional(),
});
