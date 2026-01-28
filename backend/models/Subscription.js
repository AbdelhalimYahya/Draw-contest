import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phone: { type: String, required: true, trim: true },
    billImage: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    rejectionMessage: { type: String, default: '' },
    subscriptionDate: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export default mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);
