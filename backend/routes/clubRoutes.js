import express from 'express';
import { 
  getAllClubs, 
  getClubById,
  getClubMembers,
  getFacultyByClub
} from '../controllers/clubController.js';

const router = express.Router();

// Public routes
router.get('/', getAllClubs);
router.get('/:id', getClubById);
router.get('/:id/members', getClubMembers);
router.get('/:id/faculty', getFacultyByClub);

export default router;