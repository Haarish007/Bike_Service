const express=require('express')
const routes=express.Router()
const currentBookings=require('../models/currentBookings')
const completedBookings=require("../models/completedBookings")
const { ObjectId } = require('mongodb');
const User = require('../models/users');

//post new bookings
routes.post('/newbooking', async (req, res) => {
    try {
      console.log(req.body);
      const { userid, email, model, make, services } = req.body;
      const objectId = new ObjectId(userid);
  
      const newbooking = new currentBookings({
        userId: objectId,
        bikeMake: make,
        bikeModel: model,
        selectedServices: services,
        totalCost: 250,
      });
  
      await newbooking.save(); 
      console.log('New booking created');
     
      const user = await User.findById(userid); 

      if (user) {
        user.currentBookings.push(newbooking._id);
        await user.save();
      } else {
        console.log('User not found');
      } 

      res.send('posted');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating a new booking');
    }
  });


//post completed bookings
  routes.post("/completedBooking/:id",async(req,res)=>{
    console.log(req.params.id);
    try{
        const bookingInfo=await currentBookings.findById({_id:req.params.id})
        if(bookingInfo){
        const completedBooking=new completedBookings({
            userId:bookingInfo.userId,
            bikeMake:bookingInfo.bikeMake,
            bikeModel:bookingInfo.bikeModel,
            totalCost:bookingInfo.totalCost,
            services:bookingInfo.selectedServices
        })
        await completedBooking.save()

        const user = await User.findById(bookingInfo.userId); 

        if (user) {
          // Add the completed booking's ID to the user's completedServiceBookings array
          user.completedServiceBookings.push(completedBooking._id);
  
          // Remove the current booking's ID from the user's currentBookings array
          user.currentBookings = user.currentBookings.filter(id => id.toString() !== req.params.id);
  
          // Save the user object to update the arrays
          await user.save();
        } else {
          res.send("User not found");
        }


        const deletedBooking= await currentBookings.findByIdAndDelete({_id:req.params.id})
        console.log(deletedBooking);
      }
      else{
        res.send("no current open booking found")
      }

    }
    catch(err){
        console.log(err);
    }

      res.send({message:"booking added to completed"})
  })

//get open bookings for admin
routes.get("/allBookings/admin",async(req,res)=>{
  try{
    const bookings=await currentBookings.find()
    res.status(200).send(bookings)
    
  }
  catch(error){
    res.status(404).send({message:error})
  }
})

//get completed bookings for admin
routes.get("/allCompletedBookings/admin",async(req,res)=>{
  try{
    const bookings=await completedBookings.find()
    res.status(200).send(bookings)
    
  }
  catch(error){
    res.status(404).send({message:error})
  }
})


//get open Bookings for user
routes.get("/allBookings/user/:id",async(req,res)=>{
  try{
    const bookings=await currentBookings.find({userId:req.params.id})
    
    res.status(200).send(bookings)
    
  }
  catch(error){
    res.status(404).send({message:error})
  }
})


//get completed bookings for user
routes.get("/allCompletedBookings/user/:id",async(req,res)=>{
  try{
    const bookings=await completedBookings.find({userId:req.params.id})
    res.status(200).send(bookings)
    
  }
  catch(error){
    res.status(404).send({message:error})
  }
})



module.exports=routes