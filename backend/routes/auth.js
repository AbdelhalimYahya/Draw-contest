import { Router } from 'express';
import { login, logout, profile, signup, deleteUser } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/profile', auth, profile);
router.delete('/user/:id', deleteUser);

export default router;
