"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreFunctionsRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const cloudinary_1 = require("../../config/cloudinary");
const core_functions_controller_1 = require("./core-functions.controller");
const router = express_1.default.Router();
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
router.get('/', core_functions_controller_1.getAllCoreFunctions);
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
router.get('/:id', core_functions_controller_1.getCoreFunctionsById);
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
router.post('/', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.single('banner'), core_functions_controller_1.createCoreFunctions);
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
router.put('/:id', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.single('banner'), core_functions_controller_1.updateCoreFunctionsById);
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
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), core_functions_controller_1.deleteCoreFunctionsById);
exports.coreFunctionsRouter = router;
