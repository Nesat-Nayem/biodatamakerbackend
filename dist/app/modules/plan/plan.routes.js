"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const plan_controller_1 = require("./plan.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Plans
 *     description: Pricing plans/packages management
 */
/**
 * @swagger
 * /v1/api/plans:
 *   get:
 *     summary: Get all plans
 *     tags: [Plans]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: If true, returns only active plans
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', plan_controller_1.getAllPlans);
/**
 * @swagger
 * /v1/api/plans/{id}:
 *   get:
 *     summary: Get a plan by ID
 *     tags: [Plans]
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
router.get('/:id', plan_controller_1.getPlanById);
/**
 * @swagger
 * /v1/api/plans:
 *   post:
 *     summary: Create a plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, value, price]
 *             properties:
 *               name: { type: string }
 *               value: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *               label: { type: string }
 *               badgeColor: { type: string }
 *               isBest: { type: boolean }
 *               isActive: { type: boolean }
 *               order: { type: integer }
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', (0, authMiddleware_1.auth)('admin'), plan_controller_1.createPlan);
/**
 * @swagger
 * /v1/api/plans/{id}:
 *   put:
 *     summary: Update a plan
 *     tags: [Plans]
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
 *               name: { type: string }
 *               value: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *               label: { type: string }
 *               badgeColor: { type: string }
 *               isBest: { type: boolean }
 *               isActive: { type: boolean }
 *               order: { type: integer }
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:id', (0, authMiddleware_1.auth)('admin'), plan_controller_1.updatePlanById);
/**
 * @swagger
 * /v1/api/plans/{id}:
 *   delete:
 *     summary: Delete a plan
 *     tags: [Plans]
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
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), plan_controller_1.deletePlanById);
exports.planRouter = router;
