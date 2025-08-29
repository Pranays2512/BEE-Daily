import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }]
});

const User = mongoose.model("User", userSchema);

export default User;
