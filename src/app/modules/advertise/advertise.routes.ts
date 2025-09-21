import express from 'express';
import { auth } from '../../middlewares/authMiddleware';
import { upload } from '../../config/cloudinary';
import { createAdvertise, deleteAdvertiseById, getAdvertiseById, getAllAdvertises, updateAdvertiseById } from './advertise.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Advertise
 *     description: Advertisements management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Advertise:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         banner: { type: string, description: 'Banner image URL' }
 *         url: { type: string }
 *         status: { type: string, enum: [active, inactive] }
 *         isDeleted: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     AdvertiseResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/Advertise'
 *     AdvertiseListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Advertise'
 */

/**
 * @swagger
 * /v1/api/advertise:
 *   get:
 *     summary: Get all advertise items
 *     tags: [Advertise]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdvertiseListResponse'
 */
router.get('/', getAllAdvertises);

/**
 * @swagger
 * /v1/api/advertise/{id}:
 *   get:
 *     summary: Get an advertise item by ID
 *     tags: [Advertise]
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
 *               $ref: '#/components/schemas/AdvertiseResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', getAdvertiseById);

/**
 * @swagger
 * /v1/api/advertise:
 *   post:
 *     summary: Create an advertise item
 *     tags: [Advertise]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [banner, url]
 *             properties:
 *               banner: { type: string, format: binary }
 *               url: { type: string }
 *               status: { type: string, enum: [active, inactive] }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdvertiseResponse'
 */
router.post('/', auth('admin'), upload.single('banner'), createAdvertise);

/**
 * @swagger
 * /v1/api/advertise/{id}:
 *   put:
 *     summary: Update an advertise item
 *     tags: [Advertise]
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
 *               banner: { type: string, format: binary }
 *               url: { type: string }
 *               status: { type: string, enum: [active, inactive] }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdvertiseResponse'
 */
router.put('/:id', auth('admin'), upload.single('banner'), updateAdvertiseById);

/**
 * @swagger
 * /v1/api/advertise/{id}:
 *   delete:
 *     summary: Delete an advertise item
 *     tags: [Advertise]
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
 *               $ref: '#/components/schemas/AdvertiseResponse'
 */
router.delete('/:id', auth('admin'), deleteAdvertiseById);

export const advertiseRouter = router;
