const express = require('express');
const cors = require('cors');//we use this beacuse suppose our server is running on 8080 port but react application is running on 3000 when client call server(8080) then server say i don't know this port so for allow this port we done this app.use cose and body parse and add in middleware we didn't pass anything that means anyone can requests to server it is open to the world ...
const app = express();
const bodyParser = require('body-parser');// beacuse request body which is have email and pass for this we can use this library 
require('dotenv').config();
//Uycv4q8ES5Y9gbGO,1234


require('./Models/db');

//i need port from environment var so i have to load environment variable
const PORT = process.env.PORT || 8080; //Now we can fetch the port  if it is there then it can be fetch otherwise it can be taken from hardcoded thing
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
//testing the server localhost:8080/ping 
//jab banda ting ko request kre tab ussey pong mile ya ping ko ...
app.get('/ting',(req,res)=>{
    res.send('pong');
})


app.use(bodyParser.json());// we should add in middleware also
app.use(cors());
//now we create router 
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);

});


