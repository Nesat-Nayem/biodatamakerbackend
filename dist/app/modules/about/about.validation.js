"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutUpdateValidation = void 0;
const zod_1 = require("zod");
exports.aboutUpdateValidation = zod_1.z.object({
    // New top-level fields
    title: zod_1.z.string().min(1).optional(),
    subtitle: zod_1.z.string().min(1).optional(),
    banner: zod_1.z.string().min(1).optional(),
    mission: zod_1.z.string().min(1).optional(),
    vision: zod_1.z.string().min(1).optional(),
    desc: zod_1.z.string().min(1).optional(),
    metaTitle: zod_1.z.string().min(1).optional(),
    metaTags: zod_1.z.array(zod_1.z.string()).optional(),
    metaDesc: zod_1.z.string().min(1).optional(),
    aboutUs: zod_1.z
        .object({
        image: zod_1.z.string().min(1).optional(),
        title: zod_1.z.string().min(1).optional(),
        subtitle: zod_1.z.string().min(1).optional(),
        url: zod_1.z.string().min(1).optional(),
    })
        .optional(),
    counter: zod_1.z
        .object({
        happyCustomers: zod_1.z.number().int().nonnegative().optional(),
        electronicsProducts: zod_1.z.number().int().nonnegative().optional(),
        activeSalesman: zod_1.z.number().int().nonnegative().optional(),
        storeWorldwide: zod_1.z.number().int().nonnegative().optional(),
    })
        .optional(),
    aboutInfo: zod_1.z
        .object({
        image: zod_1.z.string().min(1).optional(),
        title: zod_1.z.string().min(1).optional(),
        description: zod_1.z.string().min(1).optional(),
    })
        .optional(),
    whyChooseUs: zod_1.z
        .array(zod_1.z.object({
        image: zod_1.z.string().min(1).optional(),
        title: zod_1.z.string().min(1).optional(),
        shortDesc: zod_1.z.string().min(1).optional(),
    }))
        .max(3)
        .optional(),
});
