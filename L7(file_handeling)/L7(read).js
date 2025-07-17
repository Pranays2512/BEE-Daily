const fs = require('fs');
const{ read } = require('./IO/io.js');
const{ write } = require('./IO/io.js');


async function readuser(){
    let users = await read("./user.txt");
    let users2 = await read("./user2.txt");
    let alluser=users.concat(users2);
    write("./alluser.txt",alluser);

}
readuser()