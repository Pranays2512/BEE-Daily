const express=require("express")
const mongoose=require("mongoose")
const User=require("./model/user.js")
const app = express()
const PORT = 3000
mongoose.connect('mongodb://localhost:27017/test')
.then(()=>console.log('connected!'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.post("/users",async(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
   
    let user={
        name:name,
        email:email,
        password:password
    }
    let newUser=new User(user)
    await newUser.save()
    res.json({
        success:true,
        message:"user added",
        data:newUser
    })
    
  })
  app.get("/users",async(req,res)=>{
    let user=await User.find()
    res.json({
        success:true,
        message:"users fetched",
        data:user
    })
  })
  app.get("/users/:id",async(req,res)=>{
    let id=req.params.id
    let user=await User.findById(id)
    res.json({
        success:true,
        message:"user fetched",
        data:user
    })
  })

app.listen(PORT, function() {
  console.log('Server running: http://localhost:' + PORT);
});