let fs=require('fs');
function read(file){
    return new Promise((resolve,reject)=>{
    
fs.readFile(file,function(err,data){
    if(err){
        return reject(err);
    }
       let users =JSON.parse(data) 
       resolve(users);
      
})
    })
}
function write(file,users){
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,JSON.stringify(users),function(err){
            if(err){
                return reject(err);
            }else{
                return resolve("file written");
            }
        });
    })
}
exports.write=write;
exports.read=read;