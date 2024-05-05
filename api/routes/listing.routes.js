import { Router } from 'express';
import {
  createListing,
  deleteListing,
  updateListing,
} from '../controllers/listing.controller.js';
import { validUser } from '../utils/validUser.js';

const router = Router();

router.post('/create', validUser, createListing);
router.delete('/delete/:id', validUser, deleteListing);
router.post('//update/:id', validUser, updateListing);

export default router;
