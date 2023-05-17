const mongoose=require("mongoose");

const LanguageSchema=mongoose.Schema({
    name:String
})

const LanguageModel=mongoose.model("Language",LanguageSchema)

module.exports={
    LanguageModel
}