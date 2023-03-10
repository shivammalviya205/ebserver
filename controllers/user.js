import AppointmentModel from "../models/Appointment.js";
import moment from 'moment'
import User from "../models/User.js";
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


export const updateSlot=async(req,res)=>{
    const{userId}=req.params;
    //console.log(req.params);
    try{
      const{plan}=req.body;
      // console.log(plan);
      const user= await User.findById(userId);
      //console.log(user);
      if(plan==='Gold'){
        console.log(user.goldslots);
        user.goldslots++;
        console.log(user.goldslots);
      }
      else if(plan==='Silver'){
        user.silverslots++;
      }
      else if(plan==='Platinum'){
        user.platinumslots++;
      }
      await user.save();
      const updateduser= await User.findById({_id:userId});
      return res.status(200).json(updateduser);


    }catch(err){
        return res.status(404).json(err.message)
    }
}
