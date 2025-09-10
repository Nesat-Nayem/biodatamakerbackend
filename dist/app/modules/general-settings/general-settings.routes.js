"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalSettingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const cloudinary_1 = require("../../config/cloudinary");
const general_settings_controller_1 = require("./general-settings.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     GeneralSettings:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         number: { type: string }
 *         email: { type: string }
 *         facebook: { type: string }
 *         instagram: { type: string }
 *         linkedIn: { type: string }
 *         twitter: { type: string }
 *         youtube: { type: string }
 *         favicon: { type: string, description: 'Favicon URL' }
 *         logo: { type: string, description: 'Logo URL' }
 *         headerTab: { type: string }
 *         address: { type: string }
 *         iframe: { type: string }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *       example:
 *         _id: "66d0c4f2aa11bb22cc33dd55"
 *         number: "+971 55 123 4567"
 *         email: "support@example.com"
 *         facebook: "https://facebook.com/bigsell"
 *         instagram: "https://instagram.com/bigsell"
 *         linkedIn: "https://www.linkedin.com/company/bigsell"
 *         twitter: "https://twitter.com/bigsell"
 *         youtube: "https://youtube.com/@bigsell"
 *         favicon: "https://res.cloudinary.com/demo/image/upload/v1724663000/settings/favicon.png"
 *         logo: "https://res.cloudinary.com/demo/image/upload/v1724663000/settings/logo.png"
 *         headerTab: "BigSell - Best Electronics Deals"
 *         address: "Office 123, Dubai, UAE"
 *         iframe: "<iframe src='https://maps.google.com/...'></iframe>"
 *         createdAt: "2025-08-26 11:00:00"
 *         updatedAt: "2025-08-26 11:00:00"
 *     GeneralSettingsResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/GeneralSettings'
 */
/**
 * @swagger
 * /v1/api/general-settings:
 *   get:
 *     summary: Get general settings
 *     tags: [General Settings]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralSettingsResponse'
 */
router.get('/', general_settings_controller_1.getGeneralSettings);
/**
 * @swagger
 * /v1/api/general-settings:
 *   put:
 *     summary: Update general settings
 *     tags: [General Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               number: { type: string }
 *               email: { type: string }
 *               facebook: { type: string }
 *               instagram: { type: string }
 *               linkedIn: { type: string }
 *               twitter: { type: string }
 *               youtube: { type: string }
 *               headerTab: { type: string }
 *               address: { type: string }
 *               iframe: { type: string }
 *               favicon: { type: string, format: binary }
 *               logo: { type: string, format: binary }
 *           encoding:
 *             favicon:
 *               contentType: image/png, image/x-icon, image/jpeg
 *             logo:
 *               contentType: image/png, image/jpeg, image/webp
 *           examples:
 *             UpdateTextOnly:
 *               summary: Update without images
 *               value:
 *                 number: "+971 55 123 4567"
 *                 email: "support@example.com"
 *                 facebook: "https://facebook.com/bigsell"
 *                 instagram: "https://instagram.com/bigsell"
 *                 linkedIn: "https://www.linkedin.com/company/bigsell"
 *                 twitter: "https://twitter.com/bigsell"
 *                 youtube: "https://youtube.com/@bigsell"
 *                 headerTab: "BigSell - Best Electronics Deals"
 *                 address: "Office 123, Dubai, UAE"
 *                 iframe: "<iframe src='https://maps.google.com/...'></iframe>"
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralSettingsResponse'
 */
router.put('/', (0, authMiddleware_1.auth)('admin'), cloudinary_1.upload.fields([
    { name: 'favicon', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
]), general_settings_controller_1.updateGeneralSettings);
exports.generalSettingsRouter = router;
