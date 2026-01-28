import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

export const createSubscription = async (req, res) => {
  try {
    const phone = req.body.phone;
    if (!phone) return res.status(400).json({ message: 'phone is required' });
    if (!req.file) return res.status(400).json({ message: 'bill image is required' });

    const existingPending = await Subscription.findOne({ user: req.user._id, status: 'pending' });
    if (existingPending) return res.status(409).json({ message: 'You already have a pending subscription' });

    const subscription = await Subscription.create({
      user: req.user._id,
      phone,
      billImage: `/uploads/${req.file.filename}`,
      status: 'pending',
      rejectionMessage: '',
      subscriptionDate: new Date(),
    });

    await User.findByIdAndUpdate(req.user._id, {
      $set: {
        isSubscribed: true,
        subscription: subscription._id,
        subscriptionDate: subscription.subscriptionDate,
      },
    });

    res.status(201).json({ subscription });
  } catch (err) {
    console.error('Create subscription error:', err);
    res.status(500).json({ message: 'Server error creating subscription' });
  }
};

export const updateMySubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone } = req.body;

    const sub = await Subscription.findOne({ _id: id, user: req.user._id });
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    if (sub.status !== 'rejected') return res.status(400).json({ message: 'Only rejected subscriptions can be updated' });

    if (phone) sub.phone = phone;
    if (req.file) sub.billImage = `/uploads/${req.file.filename}`;

    sub.status = 'pending';
    sub.rejectionMessage = '';
    sub.subscriptionDate = new Date();
    await sub.save();

    await User.findByIdAndUpdate(req.user._id, {
      $set: {
        isSubscribed: true,
        subscription: sub._id,
        subscriptionDate: sub.subscriptionDate,
      },
    });

    res.json({ subscription: sub });
  } catch (err) {
    console.error('Update subscription error:', err);
    res.status(500).json({ message: 'Server error updating subscription' });
  }
};

export const listPendingSubscriptions = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 100);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Subscription.find({ status: 'pending' }).populate('user', 'name phone').sort({ createdAt: -1 }).skip(skip).limit(limit),
      Subscription.countDocuments({ status: 'pending' }),
    ]);

    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('List pending subscriptions error:', err);
    res.status(500).json({ message: 'Server error listing subscriptions' });
  }
};

export const setSubscriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionMessage } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'status must be accepted or rejected' });
    }

    const sub = await Subscription.findById(id);
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });

    sub.status = status;
    sub.rejectionMessage = status === 'rejected' ? (rejectionMessage || 'Rejected') : '';
    await sub.save();

    if (status === 'accepted') {
      await User.findByIdAndUpdate(sub.user, {
        $set: { isSubscribed: true, subscription: sub._id, subscriptionDate: sub.subscriptionDate },
      });
    }

    if (status === 'rejected') {
      await User.findByIdAndUpdate(sub.user, {
        $set: { isSubscribed: false },
      });
    }

    res.json({ subscription: sub });
  } catch (err) {
    console.error('Set subscription status error:', err);
    res.status(500).json({ message: 'Server error updating subscription status' });
  }
};
