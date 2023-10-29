const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const bodyParser=require("body-parser")

app.use(bodyParser.json())



app.use(express.urlencoded({ extended: false }));

dotenv.config()

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("db connected")
})

app.use("/crabbit/bookings",require("./routes/bookings"))
app.use("/crabbit/services",require("./routes/services"))
app.use("/crabbit/users",require("./routes/users"))

app.listen(3000,()=>{
    console.log("server connected");
})