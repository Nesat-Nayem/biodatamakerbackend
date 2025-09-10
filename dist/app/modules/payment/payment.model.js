"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Refund Info Schema
const RefundInfoSchema = new mongoose_1.Schema({
    refundId: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    reason: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'processed', 'failed'],
        default: 'pending',
    },
    processedAt: {
        type: Date,
    },
    refundedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    _id: false,
    timestamps: true,
});
// Payment Gateway Response Schema
const PaymentGatewayResponseSchema = new mongoose_1.Schema({
    id: String,
    entity: String,
    amount: Number,
    currency: String,
    status: String,
    order_id: String,
    invoice_id: String,
    international: Boolean,
    method: String,
    amount_refunded: Number,
    refund_status: String,
    captured: Boolean,
    description: String,
    card_id: String,
    bank: String,
    wallet: String,
    vpa: String,
    email: String,
    contact: String,
    notes: mongoose_1.Schema.Types.Mixed,
    fee: Number,
    tax: Number,
    error_code: String,
    error_description: String,
    error_source: String,
    error_step: String,
    error_reason: String,
    created_at: Number,
}, { _id: false });
// Main Payment Schema
const PaymentSchema = new mongoose_1.Schema({
    // Basic Information
    paymentId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    orderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Amount Details
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    currency: {
        type: String,
        required: true,
        default: 'INR',
        uppercase: true,
    },
    amountRefunded: {
        type: Number,
        default: 0,
        min: 0,
    },
    // Payment Details
    method: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'wallet', 'cash_on_delivery'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded', 'partially_refunded'],
        default: 'pending',
    },
    // Razorpay Details
    razorpayOrderId: {
        type: String,
        trim: true,
        sparse: true, // Allows multiple null values
    },
    razorpayPaymentId: {
        type: String,
        trim: true,
        sparse: true,
    },
    razorpaySignature: {
        type: String,
        trim: true,
    },
    // Gateway Response
    gatewayResponse: {
        type: PaymentGatewayResponseSchema,
    },
    // Transaction Details
    description: {
        type: String,
        trim: true,
    },
    notes: {
        type: mongoose_1.Schema.Types.Mixed,
        default: {},
    },
    // Customer Details
    customerEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    customerPhone: {
        type: String,
        required: true,
        trim: true,
    },
    // Refund Information
    refunds: [RefundInfoSchema],
    // Failure Details
    failureReason: {
        type: String,
        trim: true,
    },
    errorCode: {
        type: String,
        trim: true,
    },
    errorDescription: {
        type: String,
        trim: true,
    },
    // Timestamps
    initiatedAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: {
        type: Date,
    },
    failedAt: {
        type: Date,
    },
    // Metadata
    ipAddress: {
        type: String,
        trim: true,
    },
    userAgent: {
        type: String,
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.createdAt = new Date(ret.createdAt).toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata'
            });
            ret.updatedAt = new Date(ret.updatedAt).toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata'
            });
            if (ret.initiatedAt) {
                ret.initiatedAt = new Date(ret.initiatedAt).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata'
                });
            }
            if (ret.completedAt) {
                ret.completedAt = new Date(ret.completedAt).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata'
                });
            }
            if (ret.failedAt) {
                ret.failedAt = new Date(ret.failedAt).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata'
                });
            }
            return ret;
        }
    }
});
// Indexes for better performance
PaymentSchema.index({ paymentId: 1 });
PaymentSchema.index({ orderId: 1 });
PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ razorpayOrderId: 1 });
PaymentSchema.index({ razorpayPaymentId: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ method: 1 });
PaymentSchema.index({ initiatedAt: -1 });
PaymentSchema.index({ userId: 1, status: 1 });
PaymentSchema.index({ orderId: 1, status: 1 });
PaymentSchema.index({ isDeleted: 1 });
// Generate unique payment ID
PaymentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew && !this.paymentId) {
            const timestamp = Date.now().toString();
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            this.paymentId = `PAY-${timestamp}-${random}`;
        }
        // Update status timestamps
        if (this.isModified('status')) {
            const now = new Date();
            switch (this.status) {
                case 'completed':
                    if (!this.completedAt)
                        this.completedAt = now;
                    break;
                case 'failed':
                case 'cancelled':
                    if (!this.failedAt)
                        this.failedAt = now;
                    break;
            }
        }
        // Update refund status based on refunded amount
        if (this.isModified('amountRefunded')) {
            if (this.amountRefunded > 0) {
                if (this.amountRefunded >= this.amount) {
                    this.status = 'refunded';
                }
                else {
                    this.status = 'partially_refunded';
                }
            }
        }
        next();
    });
});
// Static method to find user payments
PaymentSchema.statics.findUserPayments = function (userId, options = {}) {
    const { page = 1, limit = 10, status, method, sort = '-initiatedAt' } = options;
    const filter = { userId, isDeleted: false };
    if (status)
        filter.status = status;
    if (method)
        filter.method = method;
    const skip = (page - 1) * limit;
    return this.find(filter)
        .populate('orderId', 'orderNumber totalAmount status')
        .populate('userId', 'name email phone')
        .sort(sort)
        .skip(skip)
        .limit(limit);
};
// Static method to find order payments
PaymentSchema.statics.findOrderPayments = function (orderId) {
    return this.find({ orderId, isDeleted: false })
        .populate('userId', 'name email phone')
        .sort('-initiatedAt');
};
// Instance method to add refund
PaymentSchema.methods.addRefund = function (refundInfo) {
    this.refunds.push(refundInfo);
    this.amountRefunded += refundInfo.amount || 0;
    return this.save();
};
// Instance method to mark as completed
PaymentSchema.methods.markCompleted = function (gatewayResponse) {
    this.status = 'completed';
    this.completedAt = new Date();
    if (gatewayResponse) {
        this.gatewayResponse = gatewayResponse;
    }
    return this.save();
};
// Instance method to mark as failed
PaymentSchema.methods.markFailed = function (reason, errorCode, errorDescription) {
    this.status = 'failed';
    this.failedAt = new Date();
    this.failureReason = reason;
    if (errorCode)
        this.errorCode = errorCode;
    if (errorDescription)
        this.errorDescription = errorDescription;
    return this.save();
};
// Virtual for refund status
PaymentSchema.virtual('refundStatus').get(function () {
    if (this.amountRefunded === 0)
        return 'none';
    if (this.amountRefunded >= this.amount)
        return 'full';
    return 'partial';
});
// Virtual for amount in rupees (from paisa)
PaymentSchema.virtual('amountInRupees').get(function () {
    return this.amount / 100;
});
exports.Payment = mongoose_1.default.model('Payment', PaymentSchema);
