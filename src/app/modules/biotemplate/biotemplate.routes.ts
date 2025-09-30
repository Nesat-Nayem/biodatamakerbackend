import express from 'express';
import { 
  createBioTemplate, 
  getAllBioTemplates, 
  getBioTemplateById, 
  updateBioTemplateById, 
  deleteBioTemplateById 
} from './biotemplate.controller';
import { upload } from '../../config/cloudinary';
import { auth } from '../../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     BioTemplate:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         templatename:
 *           type: string
 *         banner:
 *           type: string
 *           description: Banner image URL
 *         isDeleted:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     BioTemplateResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/BioTemplate'
 *     BioTemplateListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BioTemplate'
 */

/**
 * @swagger
 * /v1/api/biotemplates:
 *   get:
 *     summary: Get all biotemplates
 *     tags: [BioTemplates]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BioTemplateListResponse'
 */
router.get('/', getAllBioTemplates);

/**
 * @swagger
 * /v1/api/biotemplates/{id}:
 *   get:
 *     summary: Get a biotemplate by ID
 *     tags: [BioTemplates]
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
 *               $ref: '#/components/schemas/BioTemplateResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', getBioTemplateById);

/**
 * @swagger
 * /v1/api/biotemplates:
 *   post:
 *     summary: Create a biotemplate
 *     tags: [BioTemplates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [templatename, banner]
 *             properties:
 *               templatename:
 *                 type: string
 *                 example: Modern Bio Template
 *               banner:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BioTemplateResponse'
 */
router.post('/', auth('admin'), upload.single('banner'), createBioTemplate);

/**
 * @swagger
 * /v1/api/biotemplates/{id}:
 *   put:
 *     summary: Update a biotemplate
 *     tags: [BioTemplates]
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
 *               templatename:
 *                 type: string
 *                 example: Updated Bio Template
 *               banner:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BioTemplateResponse'
 */
router.put('/:id', auth('admin'), upload.single('banner'), updateBioTemplateById);

/**
 * @swagger
 * /v1/api/biotemplates/{id}:
 *   delete:
 *     summary: Delete a biotemplate
 *     tags: [BioTemplates]
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
 *               $ref: '#/components/schemas/BioTemplateResponse'
 */
router.delete('/:id', auth('admin'), deleteBioTemplateById);

export const biotemplateRouter = router;
