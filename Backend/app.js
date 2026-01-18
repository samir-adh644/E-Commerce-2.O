require("./model/index")
const express = require('express')
const app = express();
const PORT = 3000;

app.get(('/'),(req,res)=>{
    res.send("My name is sila.")
})

app.listen(PORT,()=>{
 console.log("server started successfully")
})

