const express=require("express");

const customerRouter=express.Router();

customerRouter.get("/",async(req,res)=>{
    res.send("hi get customer")
})

customerRouter.post("/create",async(req,res)=>{

})

customerRouter.delete("/delete/:customerId",async(req,res)=>{

})

module.exports={
    customerRouter
}