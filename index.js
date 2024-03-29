import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Razorpay from 'razorpay'

import {connectDb} from './db.js';
import {register} from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from  './routes/user.js';
//import postRoutes from './routes/posts.js';
import adminRoutes from './routes/admin.js';
import paymentRoute from './routes/paymentRoute.js'
import { verifyToken } from './middleware/auth.js';
//import {createPost} from './controllers/posts.js';
import { addExpert } from './controllers/admin.js';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());

//app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/* Mongoose setup */ 
connectDb(); 


/* File storage*/ 
// Set up the storage for the uploaded image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname);
    }
  });
  
  // Initialize the upload middleware
  const upload = multer({
    storage: storage
  }).single('image');
 
  // I have not handle the error if this multer fails to upload 




/* Routes With files 
(inko alag rakhan h because they are using upload function as  middleware) 
*/
 app.post("/auth/register",upload,register);
 app.post('/admin/addexpert',upload,addExpert);
// upload.single("picture")
//app.post("/posts/create",verifyToken,upload,createPost);




/* Routes */
app.use("/auth",authRoutes);
app.use('/user',userRoutes);
app.use("/admin",adminRoutes);
//app.use('/posts',postRoutes);

//main server requests
//this can be avoided
app.get('/',(req,res)=>{
    res.send("Hello namaste dev")
})


app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});


const PORT = process.env.PORT || 3002;
//server ko listen karna padta h port no pr 
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})

