import { Router } from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { validUser } from '../utils/validUser.js';

const router = Router();

router.post('/create', validUser, createListing);

export default router;
