const express=require("express");
const cors=require("cors");

const { connection } = require("./Configue/db");
const { customerRouter } = require("./Routes/customer.route");
const { searchableRouter } = require("./Routes/Searchable.route");
const { EditDeleteRouter } = require("./Routes/EditDelete.route");

const app=express();

app.use(express.json()) // This is to convert the parse the post request object;
// To access server for every frontend website 
app.use(cors({
    origin:"*"
}))


app.get("/",(req,res)=>{
    res.send("hi welcome")
})

app.use("/customer",customerRouter);
app.use("/searchable",searchableRouter);
app.use("/customer/EditDeletecustomer",EditDeleteRouter)

app.listen(9001,async(req,res)=>{
    try {
        await connection;
        console.log("connected to DB successfully");
    } catch (error) {
        console.log(error);
        console.log("failed to connect to DB");
    }
    console.log("listening on port 9001");
})