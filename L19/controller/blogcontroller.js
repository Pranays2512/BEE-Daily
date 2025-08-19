const Blogs= require("../model/blog");
const user = require("../model/user");
module.exports.postAddBlog=async(req,res)=>{
  let {title,body,userId}  = req.body;
  let userExist= await user.findById(userId);
  if(userExist){
   let newBlog=new Blogs({
    title:title,
    body:body,
    date: Date.now(),
    userId:userId
   })
  await newBlog.save()
  userExist.blogs.push(newBlog._id)
  await userExist.save();
  res.json({
    success:true,
    data:newBlog,
    message:"blog added successfully"
  })
}
}
module.exports.deleteOneBlog=async(req,res)=>{
  let {blogId}= req.params;
  let  {userId}= req.body;
  let blogExist = await Blogs.findById(blogId);
  if(!blogExist) return res.json({
    success:false,
    message:"Blog doest not exist"
  })
  if(blogExist.userId!=userId) return res.json({
    success:false,
    message:"You are not allowed to delete this blog"
  })
  await Blogs.findByIdAndDelete(blogId);
  console.log("aaaaaaaaaaaaaaaaaaaaaa")
  let userExist = await user.findById(userId);
  let blog= userExist.blogs.filter((id)=> id!=blogId)
  userExist.blogs=blog
  await userExist.save();
  console.log("bbbbbbbbbbbbbbb")
  res.json({
    success:true,
    message:"blog deleted successfully",
    data:userExist
  })
}
module.exports.getAllBlogs=async(req,res)=>{
   let allblog= await Blogs.find();
   res.json({
        success:true,
        data:allblog
   }) 
}
module.exports.getOneBlog=async(req,res)=>{
    let {id}= req.params
    let blog= await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })
}