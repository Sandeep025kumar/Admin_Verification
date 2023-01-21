const adminSchema = require('../model/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createData = async(req,res)=>{
    try{
        const hashPass = await bcrypt.hash(req.body.password,7);
        const postData = new adminSchema({
            ...req.body,password:hashPass
        })
        const existEmail = await adminSchema.findOne({email:req.body.email});
        if(existEmail) return res.json("Email already registered");
        const saveData = await postData.save();
        res.json(saveData)
    }
    catch(err){
        res.json(err)
    }
   
}
const logIn = async(req,res)=>{
        const userEmail = await adminSchema.findOne({email:req.body.email});
        if(!userEmail) return res.json("email is not valid");
        const userPass = await bcrypt.compare(req.body.password,userEmail.password);
        if(!userPass) return res.json("password not valid");
        // res.json("login successfully");
        const token = jwt.sign({id:userEmail._id,isAdmin:userEmail.isAdmin},process.env.TOKENKEY);
        res.cookie("sample",token,{
            httpOnly:true
        }).json("Login Successfully")
}
const updateData = async(req,res)=>{
    if(req.params.id===req.user.id || req.user.isAdmin){
        const data = await adminSchema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.json({msg:"updated successfully",result:data})
    }
    else{
        res.json("you are wrong person")
    }

} 
module.exports = {createData,logIn,updateData}