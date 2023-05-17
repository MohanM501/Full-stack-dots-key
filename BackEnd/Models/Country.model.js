const mongoose=require("mongoose");
const CountrySchema=mongoose.Schema({
    name:String
})

const CountryModel=mongoose.model("Country",CountrySchema);

module.exports={
    CountryModel
}