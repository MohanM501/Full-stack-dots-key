const mongoose=require("mongoose");

const StateSchema=mongoose.Schema({
    name:String,
    countryId:String
})

const StateModel=mongoose.model("State",StateSchema);

module.exports={
    StateModel
}