
const express = require('express');
const fs = require('fs');
const app = express();  
port = 3000;
app.use(express.static(__dirname + '/public'));
app.get('/todo',(req, res) => {
    fs.readFile('todo.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let todo = JSON.parse(data);
        res.json(todo);
       
    });
});
app.listen(port, () => {
    console.log("server started");
});