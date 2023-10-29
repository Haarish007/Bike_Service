const express=require('express');
const User = require('../models/users');
const routes=express.Router()



routes.post("/usersignup",async(req,res)=>{
    try{
        const email=req.body.userEmail
        const duplicateEmail=await User.find({userEmail:email})
        if(duplicateEmail){
           return res.status(409).send("Email Already found")
        }
        const newUser= new User(req.body)
        await newUser.save()
        res.status(201).send("user created")

    }
    catch(error){
        console.log(error);
        res.status(500).send(error)
    }
})






module.exports=routes;