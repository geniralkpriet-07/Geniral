import express from 'express';
import { 
  getAllAssociationMembers, 
  getAssociationMemberById,
  getAssociationMembersByRole
} from '../controllers/associationHeadController.js';

const router = express.Router();

router.get('/', getAllAssociationMembers);

router.get('/id/:id', getAssociationMemberById);

router.get('/role/:role', getAssociationMembersByRole);

export default router;