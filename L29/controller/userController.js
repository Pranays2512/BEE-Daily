const { fetchAllUsers, addUser, deleteUser } = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await addUser(req.body.email, req.body.name);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const message = await deleteUser(req.params.id);
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers, createUser, deleteUserById };
