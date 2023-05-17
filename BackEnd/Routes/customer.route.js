const express=require("express");
const { CityModel } = require("../Models/City.model");
const { CountryModel } = require("../Models/Country.model");
const { CustomerModel } = require("../Models/Customer.model");
const { LanguageModel } = require("../Models/Language.model");
const { StateModel } = require("../Models/State.model");

const customerRouter=express.Router();

customerRouter.get("/:page",async(req,res)=>{
    const page=Number(req.params.page);
    let customer_data=await CustomerModel.find().skip((page-1)*1).limit(1);
    console.log(customer_data,"customer_data");
    let new_updated=[];
    for(let i=0;i<customer_data.length;i++){
        let customer=customer_data[i];
        let item2={};
        const {languagesId,countryId,stateId,cityId}=customer;
        const languages0= await LanguageModel.find({"_id":languagesId});
        item2["languages"]=languages0[0].name;

        const country0=await CountryModel.find({"_id":countryId});
        item2["country"]=country0[0]["name"];
        
        const state0=await StateModel.find({"_id":stateId});
        item2["state"]=state0[0]["name"];
        
        const city0=await CityModel.find({_id:cityId});
        item2["city"]=city0[0].name;

        const new_item={customer,...item2};
        new_updated.push(new_item)
        
    }
    console.log(new_updated,"new_updated");
    res.send(new_updated)
})

customerRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    console.log(payload,"payload");
    const {languages,country,state,city}=req.body;

    //1 
    const new_langauges=new LanguageModel({name:languages});
    await new_langauges.save();

    const languages1=await LanguageModel.find({name:languages});
    
    //2
    let country1=await CountryModel.find({name:country});
    if(country1.length===0){
        const new_country=new CountryModel({name:country});
        await new_country.save();
        country1=await CountryModel.find({name:country});
    }
    
    console.log(country1,"country1")
    //3
    let state1=await StateModel.find({name:state});
    if(state1.length===0){
        const new_state=new StateModel({name:state,countryId:country1[0]._id});
        await new_state.save();
        state1=await StateModel.find({name:state});
    }
    
    //4
    let city1=await CityModel.find({name:city});
    if(city1.length===0){
        const new_city=new CityModel({name:city,stateId:state1[0]._id});
        await new_city.save();
        city1=await CityModel.find({name:city});
    }

    //5 
    payload["countryId"]=country1[0]._id;
    payload["stateId"]=state1[0]._id;
    payload["cityId"]=city1[0]._id;
    payload["languagesId"]=languages1[0]._id;
    const date=new Date();
    payload["createdDate"]=date;
    
    console.log(payload,"updated payload")
    // I am not using bcrypt to hash the password because of time constraint;
    const new_customer=new CustomerModel(payload);
    await new_customer.save();

    res.send("succesfully addeed")

})

customerRouter.delete("/delete/:customerId",async(req,res)=>{
     
})

module.exports={
    customerRouter
}