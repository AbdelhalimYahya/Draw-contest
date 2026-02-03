import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import SiteStatus from '../models/SiteStatus.js';

export const stats = async (req, res) => {
  try {
    const [users, subscriptions, accepted, pending, rejected] = await Promise.all([
      User.countDocuments(),
      Subscription.countDocuments(),
      Subscription.countDocuments({ status: 'accepted' }),
      Subscription.countDocuments({ status: 'pending' }),
      Subscription.countDocuments({ status: 'rejected' }),
    ]);

    res.json({ users, subscriptions, accepted, pending, rejected });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ message: 'Server error fetching stats' });
  }
};

export const listUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 100);
    const skip = (page - 1) * limit;
    const q = (req.query.q || '').trim();

    const filter = q
      ? {
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { phone: { $regex: q, $options: 'i' } },
        ],
      }
      : {};

    const [items, total] = await Promise.all([
      User.find(filter).select('-password').populate('subscription').sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('List users error:', err);
    res.status(500).json({ message: 'Server error listing users' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    const update = {};
    if (name) update.name = name;
    if (phone) update.phone = phone;

    const user = await User.findByIdAndUpdate(id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ message: 'Server error updating user' });
  }
};

export const getSiteStatus = async (req, res) => {
  try {
    let status = await SiteStatus.findOne();
    if (!status) status = await SiteStatus.create({ isActive: true });
    res.json({ isActive: status.isActive });
  } catch (err) {
    console.error('Get site status error:', err);
    res.status(500).json({ message: 'Server error fetching site status' });
  }
};

export const setSiteStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') return res.status(400).json({ message: 'isActive must be boolean' });

    let status = await SiteStatus.findOne();
    if (!status) status = await SiteStatus.create({ isActive });
    status.isActive = isActive;
    await status.save();

    res.json({ isActive: status.isActive });
  } catch (err) {
    console.error('Set site status error:', err);
    res.status(500).json({ message: 'Server error updating site status' });
  }
};
