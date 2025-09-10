import express from 'express';
import { createTemplate, deleteTemplateById, getAllTemplates, getTemplateById, updateTemplateById } from './template.controller';
import { upload } from '../../config/cloudinary';
import { auth } from '../../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Templates
 *     description: Biodata template management
 */

/**
 * @swagger
 * /v1/api/templates:
 *   get:
 *     summary: Get all templates
 *     tags: [Templates]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: If true, returns only active templates
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', getAllTemplates);

/**
 * @swagger
 * /v1/api/templates/{id}:
 *   get:
 *     summary: Get a template by ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/:id', getTemplateById);

/**
 * @swagger
 * /v1/api/templates:
 *   post:
 *     summary: Create a template
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, thumbnail]
 *             properties:
 *               name: { type: string }
 *               slug: { type: string }
 *               thumbnail: { type: string, format: binary }
 *               previews:
 *                 type: array
 *                 items: { type: string, format: binary }
 *               categories:
 *                 type: string
 *                 description: JSON string array of categories
 *               isActive:
 *                 type: string
 *                 enum: [true, false]
 *               order: { type: integer }
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', auth('admin'), upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'previews', maxCount: 10 }]), createTemplate);

/**
 * @swagger
 * /v1/api/templates/{id}:
 *   put:
 *     summary: Update a template
 *     tags: [Templates]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               slug: { type: string }
 *               thumbnail: { type: string, format: binary }
 *               previews:
 *                 type: array
 *                 items: { type: string, format: binary }
 *               categories:
 *                 type: string
 *               isActive:
 *                 type: string
 *                 enum: [true, false]
 *               order: { type: integer }
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:id', auth('admin'), upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'previews', maxCount: 10 }]), updateTemplateById);

/**
 * @swagger
 * /v1/api/templates/{id}:
 *   delete:
 *     summary: Delete a template
 *     tags: [Templates]
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
 */
router.delete('/:id', auth('admin'), deleteTemplateById);

export const templateRouter = router;
