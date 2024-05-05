import { Router } from 'express';
import {
  createListing,
  deleteListing,
} from '../controllers/listing.controller.js';
import { validUser } from '../utils/validUser.js';

const router = Router();

router.post('/create', validUser, createListing);
router.delete('/delete/:id', validUser, deleteListing);

export default router;
