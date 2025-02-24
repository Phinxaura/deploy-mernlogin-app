const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup  = async(req,res)=>{
try{
    const {name,email,password} = req.body;
    const user = await UserModel.findOne({ email });//already in system so not able to sign up here we check
    if(user){
        return res.status(409)
        .json({message : 'user is already exist , you can login ',success : false})
    }
    const userModel = new UserModel ({name,email,password});
    userModel.password = await bcrypt.hash(password,10) //emcypt the passwd
    await userModel.save();//after encryption save method is call so that new user data is save 
    res.status(201)
    .json({message : "signup succesfully",
           success : true
    })
}
catch(err){
res.status(500)
.json({
    message : "Internal Server Error",
    success : false
})
}}

const login  = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({ email });//already in system so not able to sign up here we check  2nd parameter is come from this db 1st is come from user
        const errorMsg = 'Auth fail , email or password is wrong';
        if(!user){
            return res.status(403)
            .json({message : errorMsg,success : false})
        }
        const isPassEqual  = await bcrypt.compare(password,user.password)//first pass is  come from cleint side/user side  , in 2nd parameter 
        if(!isPassEqual){
            return res.status(403)
            .json({message : errorMsg,success : false})
        }
        //if username and password is right then we can create jwt token .....
        //by using secret we can encrypt and decrypt jwt token ..
        const jwtToken =  jwt.sign(
            {email: user.email ,_id : user._id },
            process.env.JWT_SECRET,
            {expiresIn : '24h' }
        )
        res.status(200)
        .json({message : "Login succesfully",
               success : true,
               jwtToken,
               email,
               name:user.name
        })
    }
    catch(err){
    res.status(500)
    .json({
        message : "Internal Server Error",
        success : false
    })
    }}

module.exports = {
    signup,
    login
}