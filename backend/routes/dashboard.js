import { Router } from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import {
  getPublicSiteStatus,
  getSiteStatus,
  listUsers,
  setSiteStatus,
  stats,
  updateUser,
  pickWinner,
} from '../controllers/dashboardController.js';

const router = Router();

router.get('/stats', auth, admin, stats);

router.get('/users', auth, listUsers);
router.put('/users/:id', auth, admin, updateUser);

router.get('/site-status', auth, admin, getSiteStatus);
router.put('/site-status', auth, admin, setSiteStatus);
router.post('/raffle', auth, admin, pickWinner);

// Public read-only endpoint for the frontend site
router.get('/public-site-status', getPublicSiteStatus);

export default router;
