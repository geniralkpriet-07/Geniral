import express from 'express';
import { 
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
  addClubMember,
  updateClubMember,
  removeClubMember,
  addFaculty,
  updateFaculty,
  removeFaculty,
  updateClubHead,
  updateClubContent
} from '../controllers/clubControllerAdmin.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Main club routes
router.get('/', authenticateToken, getAllClubs);
router.get('/:id', authenticateToken, getClubById);
router.post('/', authenticateToken, requireAdmin, createClub);
router.put('/:id', authenticateToken, requireAdmin, updateClub);
router.delete('/:id', authenticateToken, requireAdmin, deleteClub);

// Member management
router.post('/:id/members', authenticateToken, requireAdmin, addClubMember);
router.put('/:id/members/:memberName', authenticateToken, requireAdmin, updateClubMember);
router.delete('/:id/members/:memberName', authenticateToken, requireAdmin, removeClubMember);

// Faculty management
router.post('/:id/faculty', authenticateToken, requireAdmin, addFaculty);
router.put('/:id/faculty/:facultyName', authenticateToken, requireAdmin, updateFaculty);
router.delete('/:id/faculty/:facultyName', authenticateToken, requireAdmin, removeFaculty);

// Club head management
router.put('/:id/head', authenticateToken, requireAdmin, updateClubHead);

// Club content management
router.put('/:id/content', authenticateToken, requireAdmin, updateClubContent);

export default router;