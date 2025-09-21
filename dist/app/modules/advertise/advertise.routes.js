"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertiseRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const cloudinary_1 = require("../../config/cloudinary");
const advertise_controller_1 = require("./advertise.controller");
const router = express_1.default.Router();
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
router.get('/', advertise_controller_1.getAllAdvertises);
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
router.get('/:id', advertise_controller_1.getAdvertiseById);
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
router.post('/', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.single('banner'), advertise_controller_1.createAdvertise);
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
router.put('/:id', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.single('banner'), advertise_controller_1.updateAdvertiseById);
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
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), advertise_controller_1.deleteAdvertiseById);
exports.advertiseRouter = router;
