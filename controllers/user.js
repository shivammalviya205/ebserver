import AppointmentModel from "../models/Appointment.js";
import moment from 'moment'
export const bookAppointment=async(req,res)=>{
    try{
       const{userId,expertId}=req.params;
       const{ userName,expertName,slotno,date}=req.body;
        //const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
       
  
       const appointment= await AppointmentModel.create({
           userId:userId,
           expertId:expertId,
           userName:userName,
           expertName:expertName,
           date:date,
           slotno:slotno,
       });
       
        return res.status(200).json({appointment:appointment})

    }catch(err){
       return res.status(404).json(err.message)
    }
}

