import mongoose from 'mongoose';
import crypto from 'crypto';

function ngo_generateCertificateId() {
  return 'RK-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

const NgoOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trees: [{
    treeId: { type: String },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  certificateValidated: { type: Boolean, default: false },
  certificateId: { type: String, unique: true, default: ngo_generateCertificateId },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', NgoOrderSchema);
