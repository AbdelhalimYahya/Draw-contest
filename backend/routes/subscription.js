import { Router } from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import siteActive from '../middleware/siteActive.js';
import upload from '../middleware/upload.js';
import {
  createSubscription,
  listPendingSubscriptions,
  setSubscriptionStatus,
  updateMySubscription,
} from '../controllers/subscriptionController.js';

const router = Router();

// User routes
router.post('/', auth, siteActive, upload.single('bill'), createSubscription);
router.put('/:id', auth, siteActive, upload.single('bill'), updateMySubscription);

// Admin routes
router.get('/pending', auth, admin, listPendingSubscriptions);
router.put('/:id/status', auth, admin, setSubscriptionStatus);

export default router;
