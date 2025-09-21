"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerRouter = void 0;
const express_1 = __importDefault(require("express"));
const banner_controller_1 = require("./banner.controller");
const cloudinary_1 = require("../../config/cloudinary");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         shortDesc:
 *           type: string
 *         image:
 *           type: string
 *           description: Image URL
 *         banner:
 *           type: string
 *           description: Banner image URL (same as image)
 *         primaryButton:
 *           type: object
 *           required: [label, href]
 *           properties:
 *             label:
 *               type: string
 *             href:
 *               type: string
 *         secondaryButton:
 *           type: object
 *           properties:
 *             label:
 *               type: string
 *             href:
 *               type: string
 *         totalBiodataCreated:
 *           type: integer
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *         isActive:
 *           type: boolean
 *         order:
 *           type: integer
 *         isDeleted:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     BannerResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/Banner'
 *     BannerListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Banner'
 */
/**
 * @swagger
 * /v1/api/banners:
 *   get:
 *     summary: Get all banners
 *     tags: [Banners]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: If true, returns only active banners
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerListResponse'
 */
// Get all banners (with optional active filter)
router.get('/', banner_controller_1.getAllBanners);
/**
 * @swagger
 * /v1/api/banners/{id}:
 *   get:
 *     summary: Get a banner by ID
 *     tags: [Banners]
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
 *               $ref: '#/components/schemas/BannerResponse'
 *       404:
 *         description: Not found
 */
// Get a single banner by ID
router.get('/:id', banner_controller_1.getBannerById);
// Create a new banner with image upload
/**
 * @swagger
 * /v1/api/banners:
 *   post:
 *     summary: Create a banner
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, description, shortDesc, image, primaryButton]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               shortDesc:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *               totalBiodataCreated:
 *                 type: integer
 *               primaryButton:
 *                 type: string
 *                 description: |
 *                   JSON string for the primary button, e.g. {"label":"Create Biodata","href":"/create-biodata"}
 *               secondaryButton:
 *                 type: string
 *                 description: |
 *                   JSON string for the secondary button, e.g. {"label":"Contact Us","href":"/contact-us"}
 *               primaryButtonLabel:
 *                 type: string
 *                 description: Alternative to primaryButton JSON.
 *               primaryButtonHref:
 *                 type: string
 *                 description: Alternative to primaryButton JSON.
 *               secondaryButtonLabel:
 *                 type: string
 *                 description: Alternative to secondaryButton JSON.
 *               secondaryButtonHref:
 *                 type: string
 *                 description: Alternative to secondaryButton JSON.
 *               isActive:
 *                 type: string
 *                 enum: [true, false]
 *               order:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerResponse'
 */
router.post('/', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.single('image'), banner_controller_1.createBanner);
// Update a banner by ID with optional image upload
/**
 * @swagger
 * /v1/api/banners/{id}:
 *   put:
 *     summary: Update a banner
 *     tags: [Banners]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               shortDesc:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               primaryButton:
 *                 type: string
 *                 description: JSON string like {"label":"Create Biodata","href":"/create-biodata"}
 *               secondaryButton:
 *                 type: string
 *               primaryButtonLabel:
 *                 type: string
 *               primaryButtonHref:
 *                 type: string
 *               secondaryButtonLabel:
 *                 type: string
 *               secondaryButtonHref:
 *                 type: string
 *               isActive:
 *                 type: string
 *                 enum: [true, false]
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *               totalBiodataCreated:
 *                 type: integer
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerResponse'
 */
router.put('/:id', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.single('image'), banner_controller_1.updateBannerById);
// Delete a banner by ID (soft delete)
/**
 * @swagger
 * /v1/api/banners/{id}:
 *   delete:
 *     summary: Delete a banner
 *     tags: [Banners]
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
 *               $ref: '#/components/schemas/BannerResponse'
 */
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), banner_controller_1.deleteBannerById);
exports.bannerRouter = router;
