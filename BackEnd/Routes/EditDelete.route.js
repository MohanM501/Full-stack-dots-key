const { CustomerModel } = require("../Models/Customer.model");

express=require("express");

const EditDeleteRouter=express.Router();

EditDeleteRouter.patch("/edit/:customerId",async(req,res)=>{
    const payload=req.body;
    const customerId=req.params.customerId;
    
    try {
         await CustomerModel.findByIdAndUpdate({_id:customerId},payload);
         res.status(202).json("Edited succesffuly")
    } catch (error) {
        res.status(401).json({"msg":"Error"})
    }

})

EditDeleteRouter.delete("/delete/:customerId",async(req,res)=>{
   const customerId=req.params.customerId;
   try {
       await CustomerModel.findOneAndDelete({_id:customerId});
       res.status(204).json("Deleted Successfully");
   } catch (error) {
     res.status(401).json({"msg":"Error"})
   }
})

module.exports={
    EditDeleteRouter
}