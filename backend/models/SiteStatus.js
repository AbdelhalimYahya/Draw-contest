import mongoose from 'mongoose';

const siteStatusSchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, default: true },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

export default mongoose.models.SiteStatus || mongoose.model('SiteStatus', siteStatusSchema);
