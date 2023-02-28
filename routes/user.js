import express from 'express';
import { bookAppointment} from '../controllers/user.js';

const router=express.Router();
router.post("/:userId/:expertId/book",bookAppointment);

export default router;