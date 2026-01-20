
const express = require('express')
const app = express();
const PORT = 3000;

// routes importing
const authRoute = require('./routes/authRoutes')

// very very important
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// using routes

app.get('/',(req,res)=>{
    res.send("hello")
})
app.use('/',authRoute)


app.listen(PORT,()=>{
 console.log("server started successfully")
})

