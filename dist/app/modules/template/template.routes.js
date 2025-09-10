"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateRouter = void 0;
const express_1 = __importDefault(require("express"));
const template_controller_1 = require("./template.controller");
const cloudinary_1 = require("../../config/cloudinary");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = express_1.default.Router();
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
router.get('/', template_controller_1.getAllTemplates);
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
router.get('/:id', template_controller_1.getTemplateById);
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
router.post('/', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'previews', maxCount: 10 }]), template_controller_1.createTemplate);
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
router.put('/:id', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'previews', maxCount: 10 }]), template_controller_1.updateTemplateById);
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
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), template_controller_1.deleteTemplateById);
exports.templateRouter = router;
