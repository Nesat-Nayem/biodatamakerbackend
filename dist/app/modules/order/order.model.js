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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PaymentInfoSchema = new mongoose_1.Schema({
    method: { type: String, enum: ['card', 'upi', 'netbanking', 'wallet', 'cash_on_delivery'], default: undefined },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: undefined },
    transactionId: { type: String },
    paymentDate: { type: Date },
}, { _id: false });
const OrderSchema = new mongoose_1.Schema({
    orderNumber: { type: String, required: true, unique: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Plan' },
    planValue: { type: String },
    template: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Template' },
    biodata: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Biodata' },
    totalAmount: { type: Number, required: true, min: 0 }, // rupees
    currency: { type: String, default: 'INR' },
    paymentStatus: { type: String, enum: ['unpaid', 'pending', 'paid', 'refunded', 'failed'], default: 'unpaid' },
    status: { type: String, enum: ['created', 'completed', 'cancelled'], default: 'created' },
    paymentInfo: { type: PaymentInfoSchema, default: {} },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.createdAt = new Date(ret.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            ret.updatedAt = new Date(ret.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        },
    },
});
OrderSchema.pre('validate', function (next) {
    if (this.isNew && !this.orderNumber) {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.orderNumber = `ORD-${timestamp}-${random}`;
    }
    next();
});
exports.Order = mongoose_1.default.model('Order', OrderSchema);
