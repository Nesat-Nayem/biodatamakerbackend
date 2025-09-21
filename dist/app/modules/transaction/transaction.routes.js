"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const transaction_controller_1 = require("./transaction.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Transactions
 *     description: Transaction history management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         fullName: { type: string }
 *         selectedPackage: { type: string }
 *         payment: { type: number }
 *         paymentMode: { type: string }
 *         status: { type: string, enum: [pending, success, failed, cancelled] }
 *         isDeleted: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     TransactionResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/Transaction'
 *     TransactionListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Transaction'
 */
/**
 * @swagger
 * /v1/api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionListResponse'
 */
router.get('/', transaction_controller_1.getAllTransactions);
/**
 * @swagger
 * /v1/api/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transactions]
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
 *               $ref: '#/components/schemas/TransactionResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', transaction_controller_1.getTransactionById);
/**
 * @swagger
 * /v1/api/transactions:
 *   post:
 *     summary: Create a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, selectedPackage, payment, paymentMode]
 *             properties:
 *               fullName: { type: string }
 *               selectedPackage: { type: string }
 *               payment: { type: number }
 *               paymentMode: { type: string }
 *               status: { type: string, enum: [pending, success, failed, cancelled] }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 */
router.post('/', (0, authMiddleware_1.auth)('admin'), transaction_controller_1.createTransaction);
/**
 * @swagger
 * /v1/api/transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
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
 *               fullName: { type: string }
 *               selectedPackage: { type: string }
 *               payment: { type: number }
 *               paymentMode: { type: string }
 *               status: { type: string, enum: [pending, success, failed, cancelled] }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 */
router.put('/:id', (0, authMiddleware_1.auth)('admin'), transaction_controller_1.updateTransactionById);
/**
 * @swagger
 * /v1/api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
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
 *               $ref: '#/components/schemas/TransactionResponse'
 */
router.delete('/:id', (0, authMiddleware_1.auth)('admin'), transaction_controller_1.deleteTransactionById);
exports.transactionRouter = router;
