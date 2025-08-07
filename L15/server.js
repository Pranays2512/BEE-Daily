const express=require("express")
const app = express()
const PORT = 3000
app.use(express.json());
app.use(express.urlencoded({extented:true}))
console.log((__dirname+"/public"))
app.use(express.static(__dirname+"/public"))
app.get("/",(req,res)=>{
    res.send("hehehehe")
})
app.post("/users", (req, res) => {
     const newItem = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(newItem)
  res.send()
 
  });
app.listen(PORT, function() {
  console.log('Server running: http://localhost:' + PORT);
});