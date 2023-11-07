const express=require('express')
const routes=express.Router()
const currentBookings=require('../models/currentBookings')
const completedBookings=require("../models/completedBookings")
const { ObjectId } = require('mongodb');
const User = require('../models/users');

//post new bookings
routes.post('/newbooking', async (req, res) => {
    try {
      const { userId, bikeModel, bikeMake, bookingDate ,selectedServices, totalCost } = req.body;
      const objectId = new ObjectId(userId);
  
      const newbooking = new currentBookings({
        userId: objectId,
        bikeModel,
        bikeMake,
        bookingDate,
        selectedServices,
        totalCost,
      });
  
      await newbooking.save(); 
      console.log('New booking created');
     
      const user = await User.findById(userId); 

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

//post changing status to ready for pickup

routes.patch('/changestatus', async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    const booking = await currentBookings.findByIdAndUpdate( bookingId,{ status: status },{ new: true })

    if (!booking) {
      console.log("not book")
      return res.status(404).json({ message: 'Service booking not found' });
    }

    return res.json({ message: 'Status changed to Ready for Pickup', booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

//post completed bookings
  routes.post("/completedbooking/:id",async(req,res)=>{
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
          user.completedServiceBookings.push(completedBooking._id);
          user.currentBookings = user.currentBookings.filter(id => id.toString()!==req.params.id);
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
routes.get("/currentbookings/admin",async(req,res)=>{
  try{
    const bookings=await currentBookings.find().populate('userId', 'userName userEmail userContact');
    if(!bookings){
      res.status(404).json({message:"no current bookingd found"})
    }

    const detailedBookings=bookings.map((booking)=>{
          return{
            _id:booking._id,
            bikeMake:booking.bikeMake,
            bikeModel:booking.bikeModel,
            selectedServices:booking.selectedServices,
            totalCost:booking.totalCost,
            status:booking.status,
            bookingDate:booking.bookingDate,
            userId:booking.userId._id,
            userName:booking.userId.userName,
            userEmail:booking.userId.userEmail,
            userContact:booking.userId.userContact
          }
    })
    res.status(200).send(detailedBookings)
    
  }
  catch(error){
    res.status(404).send({message:error})
  }
})

//get completed bookings for admin
routes.get("/completedbookings/admin",async(req,res)=>{
  try{
    const bookings=await completedBookings.find().populate('userId', 'userName userEmail userContact')
    if(!bookings){
      res.status(404).json({message:"no completed bookings found"})
    }

    const detailedBookings=bookings.map((booking)=>{
      return {
        _id:booking._id,
        bikeMake:booking.bikeMake,
        bikeModel:booking.bikeModel,
        completedDate:booking.completedDate,
        totalCost:booking.totalCost,
        services:booking.services,
        status:booking.status,
        userId:booking.userId._id,
        userName:booking.userId.userName,
        userEmail:booking.userId.userEmail,
        userContact:booking.userId.userContact
      };
    })
    res.status(200).send(detailedBookings)
    
  }
  catch(error){
    res.status(404).send({message:error})
  }
})


//get open Bookings for user
routes.get("/currentbookings/user/:id",async(req,res)=>{
  try{
    const bookings=await currentBookings.find({userId:req.params.id})
    
    res.status(200).send(bookings)
    
  }
  catch(error){
    res.status(404).send({message:error})
  }
})


//get completed bookings for user
routes.get("/completedbookings/user/:id",async(req,res)=>{
  try{
    const bookings=await completedBookings.find({userId:req.params.id})
    res.status(200).send(bookings)
    
  }
  catch(error){
    res.status(404).send({message:error})
  }
})



module.exports=routes