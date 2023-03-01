import express from 'express';
import { bookAppointment,updateSlot} from '../controllers/user.js';

const router=express.Router();
router.post("/:userId/:expertId/book",bookAppointment);
router.post("/:userId/updateslot",updateSlot);
export default router;