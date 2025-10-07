const express = require("express");
const { getAllUsers, createUser, deleteUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.delete("/:id", deleteUserById);

module.exports = router;
