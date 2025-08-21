const express = require("express");
const app = express();
const { m1, m2, checkadmin } = require("./middleware/middleware");
const blogRoutes = require("./routes/blogroutes");  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(m1);

app.get("/home", (req, res) => {
  console.log("home page");
  res.json({
    success: true,
    message: "home page",
  });
});


app.use(m2);

app.get("/about", checkadmin, (req, res) => {
  if (req.isAdmin) {
    return res.json({   
      success: true,
      message: "about page",
    });
  }

  return res.json({
    success: false,
    message: "no access",
  });
});

app.use("/blogs", blogRoutes);

app.listen(3000, () => {
  console.log("server started");
});
