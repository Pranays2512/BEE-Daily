import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();

app.use(express.json());
import path from "path";
import { fileURLToPath } from "url";

// Needed to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (e.g., HTML, CSS, JS) from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/lec17")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.listen(3333, () => {
    console.log("Server started on port 3333");
});
