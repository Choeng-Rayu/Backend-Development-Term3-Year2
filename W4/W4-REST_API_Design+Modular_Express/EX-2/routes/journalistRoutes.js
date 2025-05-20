import express from 'express';
const router = express.Router();
import { 
    getAllJournalists, 
    getJournalistsById, 
    createJournalist, 
    updateJournalist, 
    deleteJournalist 
} from '../controllers/journalistsController.js';

router.get('/', getAllJournalists);
router.get('/:id', getJournalistsById);
router.post('/', createJournalist);
router.put('/:id', updateJournalist);
router.delete('/:id', deleteJournalist);

export default router;