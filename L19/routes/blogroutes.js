const express = require('express');
const router = express.Router();
let blogcontroller=require("../controller/blogcontroller")

router.post("/",blogcontroller.postAddBlog)
router.get("/",blogcontroller.getAllBlogs)
router.get("/:id",blogcontroller.getOneBlog)

router.delete("/:blogId",blogcontroller.deleteOneBlog)




module.exports=router