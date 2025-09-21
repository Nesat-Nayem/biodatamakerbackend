import express from 'express';
import { auth } from '../../middlewares/authMiddleware';
import { upload } from '../../config/cloudinary';
import { createCoreFunctions, deleteCoreFunctionsById, getAllCoreFunctions, getCoreFunctionsById, updateCoreFunctionsById } from './core-functions.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Core Functions
 *     description: Core features section management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CoreCard:
 *       type: object
 *       properties:
 *         title: { type: string }
 *         subtitle: { type: string }
 *     CoreFunctions:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         title: { type: string }
 *         subtitle: { type: string }
 *         banner: { type: string }
 *         cards:
 *           type: array
 *           items: { $ref: '#/components/schemas/CoreCard' }
 *         isDeleted: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     CoreFunctionsResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/CoreFunctions'
 *     CoreFunctionsListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items: { $ref: '#/components/schemas/CoreFunctions' }
 */

/**
 * @swagger
 * /v1/api/core-functions:
 *   get:
 *     summary: Get all Core Functions entries
 *     tags: [Core Functions]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoreFunctionsListResponse'
 */
router.get('/', getAllCoreFunctions);

/**
 * @swagger
 * /v1/api/core-functions/{id}:
 *   get:
 *     summary: Get a Core Functions entry by ID
 *     tags: [Core Functions]
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
 *               $ref: '#/components/schemas/CoreFunctionsResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', getCoreFunctionsById);

/**
 * @swagger
 * /v1/api/core-functions:
 *   post:
 *     summary: Create a Core Functions entry
 *     tags: [Core Functions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, banner, cards]
 *             properties:
 *               title: { type: string }
 *               subtitle: { type: string }
 *               banner: { type: string, format: binary }
 *               cards:
 *                 type: string
 *                 description: JSON array with exactly 3 items [{"title":"...","subtitle":"..."}, ...]
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoreFunctionsResponse'
 */
router.post('/', auth('admin'), upload.single('banner'), createCoreFunctions);

/**
 * @swagger
 * /v1/api/core-functions/{id}:
 *   put:
 *     summary: Update a Core Functions entry
 *     tags: [Core Functions]
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
 *               title: { type: string }
 *               subtitle: { type: string }
 *               banner: { type: string, format: binary }
 *               cards:
 *                 type: string
 *                 description: JSON array with exactly 3 items [{"title":"...","subtitle":"..."}, ...]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoreFunctionsResponse'
 */
router.put('/:id', auth('admin'), upload.single('banner'), updateCoreFunctionsById);

/**
 * @swagger
 * /v1/api/core-functions/{id}:
 *   delete:
 *     summary: Delete a Core Functions entry
 *     tags: [Core Functions]
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
 *               $ref: '#/components/schemas/CoreFunctionsResponse'
 */
router.delete('/:id', auth('admin'), deleteCoreFunctionsById);

export const coreFunctionsRouter = router;
