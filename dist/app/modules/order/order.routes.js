"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Orders for template downloads
 */
/**
 * @swagger
 * /v1/api/orders:
 *   post:
 *     summary: Create an order for a template plan
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [planId]
 *             properties:
 *               planId: { type: string, description: Plan ID }
 *               planValue: { type: string, description: Alternative to planId (word|editable|image) }
 *               templateId: { type: string }
 *               biodataId: { type: string }
 *               currency: { type: string, example: INR }
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', (0, authMiddleware_1.auth)(), order_controller_1.createOrder);
/**
 * @swagger
 * /v1/api/orders/my:
 *   get:
 *     summary: Get my orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/my', (0, authMiddleware_1.auth)(), order_controller_1.getMyOrders);
/**
 * @swagger
 * /v1/api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/:id', (0, authMiddleware_1.auth)(), order_controller_1.getOrderById);
/**
 * @swagger
 * /v1/api/orders/{id}/cancel:
 *   post:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/:id/cancel', (0, authMiddleware_1.auth)(), order_controller_1.cancelOrder);
/**
 * @swagger
 * /v1/api/orders:
 *   get:
 *     summary: List all orders (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', (0, authMiddleware_1.auth)('admin'), order_controller_1.adminListOrders);
exports.orderRouter = router;
