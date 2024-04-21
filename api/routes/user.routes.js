import { Router } from 'express';
import {
  deleteUser,
  test,
  updateUser,
} from '../controllers/user.controllers.js';
import { validUser } from '../utils/validUser.js';

const router = Router();

router.get('/test', test);
router.post('/update/:id', validUser, updateUser);
router.delete('/delete/:id', validUser, deleteUser);

export default router;
