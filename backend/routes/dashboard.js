import { Router } from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import {
  getSiteStatus,
  listUsers,
  setSiteStatus,
  stats,
  updateUser,
} from '../controllers/dashboardController.js';

const router = Router();

router.get('/stats', auth, admin, stats);

router.get('/users', auth, admin, listUsers);
router.put('/users/:id', auth, admin, updateUser);

router.get('/site-status', auth, admin, getSiteStatus);
router.put('/site-status', auth, admin, setSiteStatus);

export default router;
