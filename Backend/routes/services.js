const express=require('express')
const Services = require('../models/services')
const routes=express.Router()



routes.post('/newservice',async(req,res)=>{
    try{
           const newService=new Services(req.body)
           await newService.save()
           //console.log(newService);
    }
    catch(error){
            console.log(error);
    }

    res.send("created")
})

routes.delete('/deleteService/:id',async(req,res)=>{
    try{
        const deletedService=Services.deleteOne({_id:req.params.id})
        res.send({message:"Service deleted"})
    }
    catch(error){
        res.send(error)
    }
})


routes.get('/getallservices',async(req,res)=>{
    try{
         const servies=await Services.find()
         res.json(servies)
    }
    catch(error){
        console.log(error);
        res.error(error)
    }
})








module.exports=routes