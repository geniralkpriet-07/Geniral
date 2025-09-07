import express from 'express';
import { 
  getAllAssociationMembers, 
  getAssociationMemberById,
  getAssociationMembersByRole
} from '../controllers/associationHeadController.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

router.get('/', cacheMiddleware(3600), getAllAssociationMembers);

router.get('/id/:id', cacheMiddleware(3600), getAssociationMemberById);

router.get('/role/:role', cacheMiddleware(3600), getAssociationMembersByRole);

export default router;