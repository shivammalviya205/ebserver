import express from 'express';
import { bookAppointment,updateSlot,getuserdata} from '../controllers/user.js';

const router=express.Router();
router.post("/:userId/:expertId/book",bookAppointment);
router.post("/:userId/updateslot",updateSlot);
router.get("/:userId/getuserdata",getuserdata);
export default router;