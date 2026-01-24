
const express = require('express')
const app = express();
const PORT = 3000;
const cors = require("cors");
const path = require("path")

app.use(cors({ origin: "http://localhost:5173",
    credentials:true,
 }));
 app.use("/storage",express.static(path.join(__dirname, "storage")));

// routes importing
const authRoute = require('./routes/authRoutes')
const orderRoute = require('./routes/orderlistRoutes')
const productRoute = require('./routes/productRoutes')

// very very important
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// using routes

app.get('/',(req,res)=>{
    res.send("hello")
})
app.use('/',authRoute)

app.use('/',orderRoute)

app.use('/',productRoute)


app.listen(PORT,()=>{
 console.log("server started successfully")
})

