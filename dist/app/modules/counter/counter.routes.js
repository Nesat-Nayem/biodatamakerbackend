"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const counter_controller_1 = require("./counter.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Counters
 *     description: Site-wide counters management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Counter:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         totalBiodataCreated: { type: integer }
 *         happyClients: { type: integer }
 *         dailyVisits: { type: integer }
 *         activeUsers: { type: integer }
 *         isDeleted: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     CounterResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/Counter'
 *     CounterListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Counter'
 */
/**
 * @swagger
 * /v1/api/counters:
 *   get:
 *     summary: Get all counters
 *     tags: [Counters]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CounterListResponse'
 */
router.get('/', counter_controller_1.getAllCounters);
/**
 * @swagger
 * /v1/api/counters/{id}:
 *   get:
 *     summary: Get a counter by ID
 *     tags: [Counters]
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
 *               $ref: '#/components/schemas/CounterResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', counter_controller_1.getCounterById);
/**
 * @swagger
 * /v1/api/counters:
 *   post:
 *     summary: Create a counter
 *     tags: [Counters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [totalBiodataCreated, happyClients, dailyVisits, activeUsers]
 *             properties:
 *               totalBiodataCreated: { type: integer }
 *               happyClients: { type: integer }
 *               dailyVisits: { type: integer }
 *               activeUsers: { type: integer }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CounterResponse'
 */
router.post('/', (0, authMiddleware_1.auth)('admin'), counter_controller_1.createCounter);
/**
 * @swagger
 * /v1/api/counters/{id}:
 *   put:
 *     summary: Update a counter
 *     tags: [Counters]
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
 *               totalBiodataCreated: { type: integer }
 *               happyClients: { type: integer }
 *               dailyVisits: { type: integer }
 *               activeUsers: { type: integer }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CounterResponse'
 */
router.put('/:id', (0, authMiddleware_1.auth)('admin'), counter_controller_1.updateCounterById);
/**
 * @swagger
 * /v1/api/counters/{id}:
 *   delete:
 *     summary: Delete a counter
 *     tags: [Counters]
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
 *               $ref: '#/components/schemas/CounterResponse'
 */
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), counter_controller_1.deleteCounterById);
exports.counterRouter = router;
