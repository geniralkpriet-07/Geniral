import express from 'express';
import {
  getAllExecutiveMembers,
  getExecutiveMemberById
} from '../controllers/executiveMemberController.js';

const router = express.Router();

// Public routes
router.get('/', getAllExecutiveMembers);
router.get('/:id', getExecutiveMemberById);

export default router;