import { Router } from 'express';
import { test, updateUser } from '../controllers/user.controllers.js';
import { validUser } from '../utils/validUser.js';

const router = Router();

router.get('/test', test);
router.post('/update/:id', validUser, updateUser);

export default router;
