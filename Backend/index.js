const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./src/Route/userRoute");

const app = express();

app.use(cors());

app.use(cookieParser());

/* app.get("/setcookie",(req,res)=>{
   res.cookie("name","avinash", {maxAge:86400, httpOnly: true});
   return res.send('Cookie has been set');
   
}); */

app.get("/getcookie",(req,res)=>{
   const name=req.cookies.name;
   if(name){
       return res.send(name)
   }
   return res.send("no cookies found");
   
});

app.use(express.json());

app.use("/", userRouter);

mongoose.connect("mongodb://localhost:27017/weather", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB is connected");
    })
    .catch((err) => {
        console.log(`${err}`);
    });

app.listen(4000, () => {
    console.log("Server is running at at 4000");
});