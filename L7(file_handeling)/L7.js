const fs=require('fs');
let users=[
    {
        id:3,
        name:"parv",
        age: 25
    },
    {
        id:4,
        name:"soju",
        age: 30
    }
]
fs.writeFile("./user2.txt",JSON.stringify(users),function(err){
    if(err){
        console.log(err);
    }else{
        console.log("file written successfully");
    }
});