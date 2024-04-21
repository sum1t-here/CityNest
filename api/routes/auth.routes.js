import { Router } from 'express';
import {
  google,
  signIn,
  signOut,
  signUp,
} from '../controllers/auth.controllers.js';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', google);
router.get('/signout', signOut);

export default router;
