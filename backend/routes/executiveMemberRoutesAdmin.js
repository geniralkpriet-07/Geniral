import express from 'express';
import {
  getAllExecutiveMembers,
  getExecutiveMemberById,
  createExecutiveMember,
  updateExecutiveMember,
  deleteExecutiveMember
} from '../controllers/executiveMemberControllerAdmin.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin routes - all require authentication and admin privileges
router.get('/', authenticateToken, getAllExecutiveMembers);
router.get('/:id', authenticateToken, getExecutiveMemberById);
router.post('/', authenticateToken, requireAdmin, createExecutiveMember);
router.put('/:id', authenticateToken, requireAdmin, updateExecutiveMember);
router.delete('/:id', authenticateToken, requireAdmin, deleteExecutiveMember);

export default router;