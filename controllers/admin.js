import AppointmentModel from "../models/Appointment.js";
import Expert from "../models/Expert.js";

export const addExpert=async(req,res)=>{
    try {
        const {userName,email,contact,domain,fees,timing}=req.body;
        const image = req.file.filename;
        const expert=await Expert.create({
            userName:userName,
            email:email,
            picturePath:image,
            contact:contact,
            domain:domain,
            fees:fees,
            timing:timing
    
        });
        const msg="expert registered succesfull"
        console.log(expert);
        res.status(201).json({msg,expert});
       } catch (err) {
        res.status(501).json({ error: err.message });
       }
}

export const getAllExpert=async(req,res)=>{
    try{
      const experts= await Expert.find();
       return res.status(201).json(experts);
    }catch(err)
    {
        res.status(501).json({ error: err.message });
    }
}

export const getOneData=async(req,res)=>{
    const {id}=req.params
    try{
      const expert= await Expert.findById({_id:id});
       return res.status(201).json(expert);
    }catch(err)
    {
        res.status(501).json({ error: err.message });
    }
}

export const getSlotsData=async(req,res)=>{
  const {id}=req.params;
  try{
    const slots=await AppointmentModel.find({expertId:id});
    return res.status(201).json(slots);
  }catch(err){
    res.status(501).json({ error: err.message });
  }
}

export const getAllSlotsData=async(req,res)=>{
  const {id}=req.params;
  try{
    const slots=await AppointmentModel.find();
    return res.status(201).json(slots);
  }catch(err){
    res.status(501).json({ error: err.message });
  }
}
 


export const deleteExpert = async (req, res) => {
    try {
      const { id } = req.params;
      const expert = await Expert.deleteOne({ _id:id });
      console.log(expert);
      res.status(200).json({msg:"deleted successfully"});
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };


  export const editExpert=async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id)
        const {userName,domain,fees,contact,timing}=req.body;
        const doc = await Expert.findOneAndUpdate(
            { _id: id },
            { userName: userName,domain:domain,fees:fees,contact:contact,timing:timing},
            // If `new` isn't true, `findOneAndUpdate()` will return the
            // document as it was before it was updated.
            { new: true }
           );
           
           return res.json({status:'ok'})
    } catch (error) {
        console.log(error);
       return res.json({status:'error'})
    }
  }
