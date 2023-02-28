import express from 'express';
import {  deleteExpert, editExpert, getAllExpert,getOneData,getSlotsData,getAllSlotsData } from '../controllers/admin.js';

const router=express.Router();
router.get("/getallexperts",getAllExpert);
router.get("/:id/getonedata",getOneData);
router.get("/:id/getslotsdata",getSlotsData);
router.get("/getallslotsdata",getAllSlotsData);
router.delete('/:id/deleteexpert',deleteExpert);
router.post('/:id/editexpert',editExpert);
export default router;