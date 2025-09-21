"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const package_controller_1 = require("./package.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Package
 *     description: Pricing packages management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Package:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         title: { type: string }
 *         subtitle: { type: string }
 *         aiDescription: { type: string }
 *         proTip: { type: string }
 *         packageName: { type: string }
 *         packageSubtitle: { type: string }
 *         badgeTitle: { type: string }
 *         packagePrice: { type: number }
 *         packageDescription: { type: string }
 *         isDeleted: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     PackageResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/Package'
 *     PackageListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Package'
 */
/**
 * @swagger
 * /v1/api/packages:
 *   get:
 *     summary: Get all packages
 *     tags: [Package]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageListResponse'
 */
router.get('/', package_controller_1.getAllPackages);
/**
 * @swagger
 * /v1/api/packages/{id}:
 *   get:
 *     summary: Get a package by ID
 *     tags: [Package]
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
 *               $ref: '#/components/schemas/PackageResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', package_controller_1.getPackageById);
/**
 * @swagger
 * /v1/api/packages:
 *   post:
 *     summary: Create a package
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, packageName, packagePrice, packageDescription]
 *             properties:
 *               title: { type: string }
 *               subtitle: { type: string }
 *               aiDescription: { type: string }
 *               proTip: { type: string }
 *               packageName: { type: string }
 *               packageSubtitle: { type: string }
 *               badgeTitle: { type: string }
 *               packagePrice: { type: number }
 *               packageDescription: { type: string }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageResponse'
 */
router.post('/', (0, authMiddleware_1.auth)('admin'), package_controller_1.createPackage);
/**
 * @swagger
 * /v1/api/packages/{id}:
 *   put:
 *     summary: Update a package
 *     tags: [Package]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               subtitle: { type: string }
 *               aiDescription: { type: string }
 *               proTip: { type: string }
 *               packageName: { type: string }
 *               packageSubtitle: { type: string }
 *               badgeTitle: { type: string }
 *               packagePrice: { type: number }
 *               packageDescription: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageResponse'
 */
router.put('/:id', (0, authMiddleware_1.auth)('admin'), package_controller_1.updatePackageById);
/**
 * @swagger
 * /v1/api/packages/{id}:
 *   delete:
 *     summary: Delete a package
 *     tags: [Package]
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
 *               $ref: '#/components/schemas/PackageResponse'
 */
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), package_controller_1.deletePackageById);
exports.packageRouter = router;
