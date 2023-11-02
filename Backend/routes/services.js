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

routes.delete('/deleteservice/:id',async(req,res)=>{
    try{
        const deletedService= await Services.deleteOne({_id:req.params.id})
        res.json({message:"Service deleted"})
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


routes.patch("/editservice/:id",async(req,res)=>{
    try{
        const data=req.body;
        const editedService=await Services.findByIdAndUpdate(req.params.id,{$set:data},{new:true})
        if(!editedService){
            return res.status(404).json({message:"Service not found"})
        }
    }
    catch(error){
        res.send(error)
    }

})








module.exports=routes