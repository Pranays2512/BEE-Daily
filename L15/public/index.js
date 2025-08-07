const { response } = require("express")

const form=document.querySelector("#form")
const email=document.querySelector("#email")
const password=document.querySelector("#password")

function adduser(email,password){
    let newUser={
        email:email,
        password:password
    
    }
    fetch("/users",{
        method:"POST",
        body:JSON.stringify(newUser),
        headers:{
            "Content-Type":"application/json"
        }
  
    
    }).then((res) =>{
        return        res.json({
    success:true,
    data:newItem,
    message:"user added"

})
    }).then((data)=>{
        console.log(data)   
    }).catch((err)=>{
             return  res.json({
    success:false,
    message:"user not added"

})
    })
    

}

form.addEventListener("submit",function(e){
    e.preventDefault();
    adduser(email.value,password.value)

})