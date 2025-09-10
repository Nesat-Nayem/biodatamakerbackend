"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.biodataRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const cloudinary_1 = require("../../config/cloudinary");
const biodata_controller_1 = require("./biodata.controller");
const router = express_1.default.Router();
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
router.get('/', (0, authMiddleware_1.auth)(), biodata_controller_1.getAllBiodata);
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
router.get('/:id', (0, authMiddleware_1.auth)(), biodata_controller_1.getBiodataById);
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
router.post('/', (0, authMiddleware_1.auth)(), cloudinary_1.upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'godPhoto', maxCount: 1 }]), biodata_controller_1.createBiodata);
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
router.put('/:id', (0, authMiddleware_1.auth)(), cloudinary_1.upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'godPhoto', maxCount: 1 }]), biodata_controller_1.updateBiodataById);
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
router.delete('/:id', (0, authMiddleware_1.auth)(), biodata_controller_1.deleteBiodataById);
exports.biodataRouter = router;
