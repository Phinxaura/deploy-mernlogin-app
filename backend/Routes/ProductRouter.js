const ensureAuthenticated = require('../Middleware/Auth');


const router  = require ('express').Router();

// router.post('/login',(req,resp)=>{
//   resp.send('login success');
// });

//before resolve this request first we call the middle ware ensureauthenticated
router.get('/',ensureAuthenticated,(req,res)=>{
    console.log('------logged in user Details------',req.user);
    res.status(200).json([
        {
            name : "mobile",
            price : 10000 
        },
        {
            name : "TV",
            price : 20000 
        }

    ])
});


module.exports = router;