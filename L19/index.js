const express = require("express");
const mongoose= require("mongoose")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const Blogs= require("./model/blog");
const user = require("./model/user");
let blogroute=require("./routes/blogroutes")
let userroute=require("./routes/userroutes");

app.use("/api/blogs",blogroute)
app.use("/api/users",userroute)


app.listen(3000,()=>{
    console.log("server started")
})
mongoose.connect('mongodb://127.0.0.1:27017')
  .then(() => console.log('Connected!'));