import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
      required: true,
    },
    expertId:{
      type: String,
      required: true,
    },
    expertName:{
      type: String,
      required: true,
    },
    userName:{
      type: String,
      required: true,
    },
    date:{
      type: String,
      required: true,
    },
    slotno:{
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AppointmentModel = mongoose.model("appointment", appointmentSchema);
export default AppointmentModel;