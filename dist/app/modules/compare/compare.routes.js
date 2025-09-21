"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const cloudinary_1 = require("../../config/cloudinary");
const compare_controller_1 = require("./compare.controller");
const router = express_1.default.Router();
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
router.get('/', compare_controller_1.getAllCompares);
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
router.get('/:id', compare_controller_1.getCompareById);
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
router.post('/', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.fields([{ name: 'banner1', maxCount: 1 }, { name: 'banner2', maxCount: 1 }]), compare_controller_1.createCompare);
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
router.put('/:id', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.fields([{ name: 'banner1', maxCount: 1 }, { name: 'banner2', maxCount: 1 }]), compare_controller_1.updateCompareById);
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
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), compare_controller_1.deleteCompareById);
exports.compareRouter = router;
