import express from 'express';
import { auth } from '../../middlewares/authMiddleware';
import { createPackage, deletePackageById, getAllPackages, getPackageById, updatePackageById } from './package.controller';

const router = express.Router();

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
router.get('/', getAllPackages);

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
router.get('/:id', getPackageById);

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
router.post('/', auth('admin'), createPackage);

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
router.put('/:id', auth('admin'), updatePackageById);

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
router.delete('/:id', auth('admin'), deletePackageById);

export const packageRouter = router;
