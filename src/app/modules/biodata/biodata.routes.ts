import express from 'express';
import { auth } from '../../middlewares/authMiddleware';
import { upload } from '../../config/cloudinary';
import { createBiodata, deleteBiodataById, getAllBiodata, getBiodataById, updateBiodataById } from './biodata.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Biodata
 *     description: User biodata creation and management
 */

/**
 * @swagger
 * /v1/api/biodata:
 *   get:
 *     summary: Get biodata for current user (admin sees all)
 *     tags: [Biodata]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', auth(), getAllBiodata);

/**
 * @swagger
 * /v1/api/biodata/{id}:
 *   get:
 *     summary: Get a biodata by ID
 *     tags: [Biodata]
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
 *         description: OK
 */
router.get('/:id', auth(), getBiodataById);

/**
 * @swagger
 * /v1/api/biodata:
 *   post:
 *     summary: Create a biodata
 *     tags: [Biodata]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [sections]
 *             properties:
 *               title: { type: string }
 *               godName: { type: string }
 *               sections: { type: string, description: JSON string of sections }
 *               template: { type: string, description: Template ID }
 *               profilePhoto: { type: string, format: binary }
 *               godPhoto: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', auth(), upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'godPhoto', maxCount: 1 }]), createBiodata);

/**
 * @swagger
 * /v1/api/biodata/{id}:
 *   put:
 *     summary: Update a biodata
 *     tags: [Biodata]
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
 *               godName: { type: string }
 *               sections: { type: string }
 *               template: { type: string }
 *               profilePhoto: { type: string, format: binary }
 *               godPhoto: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:id', auth(), upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'godPhoto', maxCount: 1 }]), updateBiodataById);

/**
 * @swagger
 * /v1/api/biodata/{id}:
 *   delete:
 *     summary: Delete a biodata (soft)
 *     tags: [Biodata]
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
router.delete('/:id', auth(), deleteBiodataById);

export const biodataRouter = router;
