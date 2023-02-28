import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types
const ExpertSchema= new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    min:2,
    max:50,
  },
  email:{
    type:String,
    required:true,
    max:50,
    unique:true,
  },
  picturePath:{
   type:String,
   default:"",
  },
  contact:{
    type:String,
    required:true
  },
  domain:{
    type:String,
    required:true
  },
  timing:{
    type:Object,
    required:true
  },
  fees:{
    type:String,
    required:true
  }
},
{timestamps:true}
);

const Expert = mongoose.model("expert", ExpertSchema);
export default Expert;

