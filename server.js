const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const router = require('./router/authrout');
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Db is not connected");
})
app.use(express.json());
app.use(cookieParser());
app.use('/api',router)
app.listen(PORT,()=>{
    console.log("server is running on port:",PORT);
})