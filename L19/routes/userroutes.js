const express=require("express")    
const router = express.Router();
let usercontroller=require("../controller/usercontroller")


router.post("/",usercontroller.postAddUser)
router.get("/",usercontroller.getAllUser)
router.get("/:id",usercontroller.getOneUser)

module.exports=router;

