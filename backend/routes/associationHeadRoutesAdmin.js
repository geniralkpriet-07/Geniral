import express from 'express';
import { 
  getAllAssociationHeads, 
  getAssociationHeadById, 
  createAssociationHead, 
  updateAssociationHead, 
  deleteAssociationHead 
} from '../controllers/associationHeadControllerAdmin.js';
import { authenticateToken} from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllAssociationHeads);

router.get('/:id', getAssociationHeadById);

router.post('/', authenticateToken,  createAssociationHead);
router.put('/:id', authenticateToken, updateAssociationHead);
router.delete('/:id', authenticateToken, deleteAssociationHead);

export default router;