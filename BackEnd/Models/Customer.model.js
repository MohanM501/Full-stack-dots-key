const mongoose=require("mongoose");

CustomerSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    createdDate:String,
    modifiedDate:String,
    isActive:Boolean,
    languagesId:String,
    countryId:String,
    stateId:String,
    cityId:String
})


const CustomerModel=mongoose.model("customer",CustomerSchema)

module.exports={
    CustomerModel
}