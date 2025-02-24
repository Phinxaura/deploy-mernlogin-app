const mongoose = require('mongoose');//mongoose is a library to manage db connections and operations
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("MongoDb Connected.....");
}).catch((err)=>{
    console.log("Mongodb connection error " , err);
})

