const jwt = require("jsonwebtoken");
const verification = async(req,res,next)=>{
    const token = req.cookies.sample;
    if(!token) res.json("Token is not valid");
    jwt.verify(token,process.env.TOKENKEY,(err,user)=>{
        if(err) return res.json("Token is not valid");
        req.user = user;
        next();
    })
}
module.exports = verification;