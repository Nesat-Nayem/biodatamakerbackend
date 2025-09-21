"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepsRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const steps_controller_1 = require("./steps.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Steps
 *     description: Steps section management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     StepsCard:
 *       type: object
 *       properties:
 *         title: { type: string }
 *         icon: { type: string }
 *         desc: { type: string }
 *     Steps:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         title: { type: string }
 *         subtitle: { type: string }
 *         cards:
 *           type: array
 *           items: { $ref: '#/components/schemas/StepsCard' }
 *         isDeleted: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     StepsResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/Steps'
 *     StepsListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items: { $ref: '#/components/schemas/Steps' }
 */
/**
 * @swagger
 * /v1/api/steps:
 *   get:
 *     summary: Get all Steps entries
 *     tags: [Steps]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StepsListResponse'
 */
router.get('/', steps_controller_1.getAllSteps);
/**
 * @swagger
 * /v1/api/steps/{id}:
 *   get:
 *     summary: Get a Steps entry by ID
 *     tags: [Steps]
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
 *               $ref: '#/components/schemas/StepsResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', steps_controller_1.getStepsById);
/**
 * @swagger
 * /v1/api/steps:
 *   post:
 *     summary: Create a Steps entry
 *     tags: [Steps]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, cards]
 *             properties:
 *               title: { type: string }
 *               subtitle: { type: string }
 *               cards:
 *                 type: array
 *                 items: { $ref: '#/components/schemas/StepsCard' }
 *                 description: Exactly 3 items
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StepsResponse'
 */
router.post('/', (0, authMiddleware_1.auth)('admin'), steps_controller_1.createSteps);
/**
 * @swagger
 * /v1/api/steps/{id}:
 *   put:
 *     summary: Update a Steps entry
 *     tags: [Steps]
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
 *               cards:
 *                 type: array
 *                 items: { $ref: '#/components/schemas/StepsCard' }
 *                 description: Exactly 3 items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StepsResponse'
 */
router.put('/:id', (0, authMiddleware_1.auth)('admin'), steps_controller_1.updateStepsById);
/**
 * @swagger
 * /v1/api/steps/{id}:
 *   delete:
 *     summary: Delete a Steps entry
 *     tags: [Steps]
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
 *               $ref: '#/components/schemas/StepsResponse'
 */
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), steps_controller_1.deleteStepsById);
exports.stepsRouter = router;
