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
    })
    .then(res => {
       
        if (!res.ok) {
          
            throw new Error('Network response was not ok.');
        }
       
        return res.json();
    })
    .then(data => {
        console.log(data);
        alert("User added successfully!");
    })
    .catch(err => {
        console.error(err);
        alert("Failed to add user.");
    })
}

form.addEventListener("submit",function(e){
    e.preventDefault();
    adduser(email.value,password.value)

})