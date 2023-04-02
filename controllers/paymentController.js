import { instance } from "../index.js";
import crypto from "crypto";
import  Payment  from "../models/paymentModel.js";
import User from "../models/User.js";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
   
    const {userId,amount}=req.params;
        let days=30;
       if(amount==='4000'){days=30;}
       else if(amount==='10000'){days=90;}
       else if(amount==='20000'){days=180;}
       else if(amount==='40000'){days=360;}
   
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
     
    const doc = await User.findOneAndUpdate(
        { _id: userId },
        {paymentStatus:'Done',paymentId:razorpay_payment_id,validity:days,paymentdate:new Date()},
        // If `new` isn't true, `findOneAndUpdate()` will return the
        // document as it was before it was updated.
        { new: true }
       );
       
       //return res.json({status:'ok',user:doc})
     

    res.redirect(
      `http://localhost:3000/home`
    );
  } else {
    res.redirect( `http://localhost:3000/payment`)
  }
};