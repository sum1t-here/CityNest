import { Router } from 'express';
import { google, signIn, signUp } from '../controllers/auth.controllers.js';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', google);

export default router;
