"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const testimonial_controller_1 = require("./testimonial.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Testimonials
 *     description: Testimonials management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         name: { type: string }
 *         designation: { type: string }
 *         description: { type: string }
 *         status: { type: string, enum: [active, inactive] }
 *         isDeleted: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     TestimonialResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/Testimonial'
 *     TestimonialListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Testimonial'
 */
/**
 * @swagger
 * /v1/api/testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialListResponse'
 */
router.get('/', testimonial_controller_1.getAllTestimonials);
/**
 * @swagger
 * /v1/api/testimonials/{id}:
 *   get:
 *     summary: Get a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', testimonial_controller_1.getTestimonialById);
/**
 * @swagger
 * /v1/api/testimonials:
 *   post:
 *     summary: Create a testimonial
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, designation, description]
 *             properties:
 *               name: { type: string }
 *               designation: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [active, inactive] }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 */
router.post('/', (0, authMiddleware_1.auth)('admin'), testimonial_controller_1.createTestimonial);
/**
 * @swagger
 * /v1/api/testimonials/{id}:
 *   put:
 *     summary: Update a testimonial
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               designation: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [active, inactive] }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 */
router.put('/:id', (0, authMiddleware_1.auth)('admin'), testimonial_controller_1.updateTestimonialById);
/**
 * @swagger
 * /v1/api/testimonials/{id}:
 *   delete:
 *     summary: Delete a testimonial
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 */
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), testimonial_controller_1.deleteTestimonialById);
exports.testimonialRouter = router;
