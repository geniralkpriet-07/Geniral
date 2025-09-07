import express from 'express';
import { 
  getAllClubs, 
  getClubById,
  getClubMembers,
  getFacultyByClub
} from '../controllers/clubController.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

// Public routes with caching (TTL: 1 hour = 3600 seconds)
router.get('/', cacheMiddleware(3600), getAllClubs);
router.get('/:id', cacheMiddleware(3600), getClubById);
router.get('/:id/members', cacheMiddleware(3600), getClubMembers);
router.get('/:id/faculty', cacheMiddleware(3600), getFacultyByClub);

export default router;