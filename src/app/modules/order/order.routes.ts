import express from 'express';
import { auth } from '../../middlewares/authMiddleware';
import { adminListOrders, cancelOrder, createOrder, getMyOrders, getOrderById } from './order.controller';

const router = express.Router();

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
router.post('/', auth(), createOrder);

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
router.get('/my', auth(), getMyOrders);

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
router.get('/:id', auth(), getOrderById);

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
router.post('/:id/cancel', auth(), cancelOrder);

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
router.get('/', auth('admin'), adminListOrders);

export const orderRouter = router;
