const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');

const router  = require ('express').Router();

// router.post('/login',(req,resp)=>{
//   resp.send('login success');
// });
router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup); //when request is validated then signup calls

module.exports = router;