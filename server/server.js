const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require('dotenv').config();

const authRoutes=require('./routes/auth');
const postRoutes=require('./routes/posts');


const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes);


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
app.listen(5000,()=>{
    console.log("server running on http://localhost:5000")
})
})
.catch(err=>console.error(err));