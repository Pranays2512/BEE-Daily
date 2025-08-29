import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

// Create blog
// Create blog
export const createBlog = async (req, res) => {
    const { title, content } = req.body;
    try {
        const blog = new Blog({ title, content, userId: req.user.id });
        await blog.save();

        await User.findByIdAndUpdate(req.user.id, { $push: { blogs: blog._id } });

        res.status(201).json({ 
            success: true, 
            message: "Blog created successfully", 
            blog 
        });
    } catch (error) {
        console.error("Error creating blog:", error); 
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};


// Get all blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("userId", "name email");
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

// Get single blog
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("userId", "name email");
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
        res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
