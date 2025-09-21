import express from 'express';
import { auth } from '../../middlewares/authMiddleware';
import { upload } from '../../config/cloudinary';
import { createCompare, deleteCompareById, getAllCompares, getCompareById, updateCompareById } from './compare.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Compare
 *     description: Compare items management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CompareItem:
 *       type: object
 *       properties:
 *         title: { type: string }
 *         value: { type: boolean, description: 'true=yes, false=no' }
 *     Compare:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         title: { type: string }
 *         banner1: { type: string }
 *         banner2: { type: string }
 *         compare:
 *           type: array
 *           items: { $ref: '#/components/schemas/CompareItem' }
 *         isDeleted: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     CompareResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/Compare'
 *     CompareListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items: { $ref: '#/components/schemas/Compare' }
 */

/**
 * @swagger
 * /v1/api/compares:
 *   get:
 *     summary: Get all compares
 *     tags: [Compare]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompareListResponse'
 */
router.get('/', getAllCompares);

/**
 * @swagger
 * /v1/api/compares/{id}:
 *   get:
 *     summary: Get a compare by ID
 *     tags: [Compare]
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
 *               $ref: '#/components/schemas/CompareResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', getCompareById);

/**
 * @swagger
 * /v1/api/compares:
 *   post:
 *     summary: Create a compare
 *     tags: [Compare]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, banner1, banner2]
 *             properties:
 *               title: { type: string }
 *               banner1: { type: string, format: binary }
 *               banner2: { type: string, format: binary }
 *               compare:
 *                 type: string
 *                 description: JSON array like [{"title":"Feature A","value":true}]
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompareResponse'
 */
router.post('/', auth('admin'), upload.fields([{ name: 'banner1', maxCount: 1 }, { name: 'banner2', maxCount: 1 }]), createCompare);

/**
 * @swagger
 * /v1/api/compares/{id}:
 *   put:
 *     summary: Update a compare
 *     tags: [Compare]
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
 *               banner1: { type: string, format: binary }
 *               banner2: { type: string, format: binary }
 *               compare:
 *                 type: string
 *                 description: JSON array like [{"title":"Feature A","value":true}]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompareResponse'
 */
router.put('/:id', auth('admin'), upload.fields([{ name: 'banner1', maxCount: 1 }, { name: 'banner2', maxCount: 1 }]), updateCompareById);

/**
 * @swagger
 * /v1/api/compares/{id}:
 *   delete:
 *     summary: Delete a compare
 *     tags: [Compare]
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
 *               $ref: '#/components/schemas/CompareResponse'
 */
router.delete('/:id', auth('admin'), deleteCompareById);

export const compareRouter = router;
