"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.biotemplateRouter = void 0;
const express_1 = __importDefault(require("express"));
const biotemplate_controller_1 = require("./biotemplate.controller");
const cloudinary_1 = require("../../config/cloudinary");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = express_1.default.Router();
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
router.get('/', biotemplate_controller_1.getAllBioTemplates);
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
router.get('/:id', biotemplate_controller_1.getBioTemplateById);
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
router.post('/', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.single('banner'), biotemplate_controller_1.createBioTemplate);
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
router.put('/:id', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.single('banner'), biotemplate_controller_1.updateBioTemplateById);
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
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), biotemplate_controller_1.deleteBioTemplateById);
exports.biotemplateRouter = router;
