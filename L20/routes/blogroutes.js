const express = require("express");
const { isLogin } = require("../middleware/middleware");
const router = express.Router();

let blogs = [
  { id: 1, title: "First Blog", content: "This is my first blog post." },
  { id: 2, title: "Second Blog", content: "Another blog entry here." }
];


router.get("/", isLogin, (req, res) => {
  res.json({
    success: true,
    blogs
  });
});


router.get("/:id", isLogin, (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found"
    });
  }

  res.json({
    success: true,
    blog
  });
});


router.post("/", isLogin, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required"
    });
  }

  const newBlog = {
    id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
    title,
    content
  };

  blogs.push(newBlog);

  res.status(201).json({
    success: true,
    message: "Blog added successfully",
    blog: newBlog
  });
});

module.exports = router;
