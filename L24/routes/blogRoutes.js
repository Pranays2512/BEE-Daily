import express from "express";
import { createBlog, getBlogs, getBlogById } from "../controllers/blogControllwe.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);

export default router;


