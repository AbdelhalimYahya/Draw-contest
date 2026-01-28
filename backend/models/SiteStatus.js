import mongoose from 'mongoose';

const siteStatusSchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.SiteStatus || mongoose.model('SiteStatus', siteStatusSchema);
