const jwt = require('jsonwebtoken');//it will check the expiry 

const ensureAuthenticated = (req,res,next)=>{
const auth = req.headers['authorization'];
if(!auth){
    return res.status(403)
    .json({message : 'Unauthorized, JWT token is required'})
}
//now someone send jwt token here then we have to decrypt from secret and check the expiry
try{
    const decoded = jwt.verify(auth,process.env.JWT_SECRET);//here decode and check the key is correct or not expire or not if everything is right then we will add data in req.user
    req.user = decoded;//so that directly use user email without  use db call
    next();
}
catch(err){
    return res.status(401)
    .json({message : 'Unauthorized, JWT token wrong or expire'})
}
}

module.exports = ensureAuthenticated;