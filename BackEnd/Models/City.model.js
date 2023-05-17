const mongoose=require("mongoose");

const CitySchema=mongoose.Schema({
    name:String,
    stateId:String
})

const CityModel=mongoose.model("City",CitySchema);

module.exports={
    CityModel
}