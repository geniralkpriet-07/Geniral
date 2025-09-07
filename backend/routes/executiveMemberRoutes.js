import express from 'express';
import {
  getAllExecutiveMembers,
  getExecutiveMemberById
} from '../controllers/executiveMemberController.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

// Public routes with caching (TTL: 1 hour = 3600 seconds)
router.get('/', cacheMiddleware(3600), getAllExecutiveMembers);
router.get('/:id', cacheMiddleware(3600), getExecutiveMemberById);

export default router;