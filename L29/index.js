const express = require("express");
const userRoutes = require("./src/routes/userRoutes");
const tweetRoutes = require("./src/routes/tweetRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/tweets", tweetRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
