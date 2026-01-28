import SiteStatus from '../models/SiteStatus.js';

const siteActive = async (req, res, next) => {
  try {
    let status = await SiteStatus.findOne();
    if (!status) status = await SiteStatus.create({ isActive: true });

    if (!status.isActive) {
      return res.status(403).json({ message: 'Competition is over. Try the next competition.' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default siteActive;
