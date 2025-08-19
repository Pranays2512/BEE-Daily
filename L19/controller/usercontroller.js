const user = require("../model/user");



module.exports.postAddUser=async(req,res)=>{
  let {username,email,password}  = req.body;
   let newUser=new user({
    username,
    email,
    password
   })
  await newUser.save()
  res.json({
    success:true,
    data:newUser,
    message:"blog added successfully"
  })
}
module.exports.getAllUser=async(req,res)=>{
   let allusers= await user.find();
   res.json({
        success:true,
        data:allusers
   }) 
}
module.exports.getOneUser=async(req,res)=>{
    let {id}= req.params
    let userExist= await user.findOne({_id:id}).populate("blogs")
    if(userExist){
    res.json({
        success:true,
        data:userExist
    })
  }
}

