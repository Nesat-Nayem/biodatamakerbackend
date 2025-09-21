"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTestimonialById = exports.updateTestimonialById = exports.getTestimonialById = exports.getAllTestimonials = exports.createTestimonial = void 0;
const testimonial_model_1 = require("./testimonial.model");
const testimonial_validation_1 = require("./testimonial.validation");
const appError_1 = require("../../errors/appError");
const createTestimonial = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, designation, description, status } = req.body;
        const validated = testimonial_validation_1.testimonialCreateValidation.parse({ name, designation, description, status });
        const doc = new testimonial_model_1.Testimonial(validated);
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Testimonial created successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.createTestimonial = createTestimonial;
const getAllTestimonials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield testimonial_model_1.Testimonial.find({ isDeleted: false }).sort({ createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Testimonials retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTestimonials = getAllTestimonials;
const getTestimonialById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield testimonial_model_1.Testimonial.findOne({ _id: req.params.id, isDeleted: false });
        if (!doc)
            return next(new appError_1.appError('Testimonial not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Testimonial retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getTestimonialById = getTestimonialById;
const updateTestimonialById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existing = yield testimonial_model_1.Testimonial.findOne({ _id: id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Testimonial not found', 404));
        const { name, designation, description, status } = req.body;
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (designation !== undefined)
            updateData.designation = designation;
        if (description !== undefined)
            updateData.description = description;
        if (status !== undefined)
            updateData.status = status;
        const validated = testimonial_validation_1.testimonialUpdateValidation.parse(updateData);
        const updated = yield testimonial_model_1.Testimonial.findByIdAndUpdate(id, validated, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Testimonial updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTestimonialById = updateTestimonialById;
const deleteTestimonialById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield testimonial_model_1.Testimonial.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Testimonial not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Testimonial deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTestimonialById = deleteTestimonialById;
