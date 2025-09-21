import express from 'express';
import { auth } from '../../middlewares/authMiddleware';
import { createTestimonial, deleteTestimonialById, getAllTestimonials, getTestimonialById, updateTestimonialById } from './testimonial.controller';

const router = express.Router();

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
router.get('/', getAllTestimonials);

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
router.get('/:id', getTestimonialById);

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
router.post('/', auth('admin'), createTestimonial);

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
router.put('/:id', auth('admin'), updateTestimonialById);

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
router.delete('/:id', auth('admin'), deleteTestimonialById);

export const testimonialRouter = router;
