const express=require("express");
const { CityModel } = require("../Models/City.model");
const { CountryModel } = require("../Models/Country.model");
const { StateModel } = require("../Models/State.model");

const searchableRouter=express.Router();

searchableRouter.get("/country",async(req,res)=>{
   const getAllCountries=await CountryModel.find();
   res.send(getAllCountries);
})

searchableRouter.get("/state/:country",async(req,res)=>{
    const country=req.params.country;
    const {_id}=await CountryModel.findOne({"name":country});
  
    const states=await StateModel.find({"countryId":_id});
    res.send(states)
    
})

searchableRouter.get("/city/:state",async(req,res)=>{
    const state=req.params.state;
    const {_id}=await StateModel.findOne({name:state});
    const cities=await CityModel.find({"stateId":_id});
    res.send(cities);

})

module.exports={
    searchableRouter
}