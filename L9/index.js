const express = require('express');
const fs = require('fs');
const app = express();

const DATA_FILE = 'data.json';
app.use(express.json());

app.get('/users/:email', (req, res) => {
    fs.readFile(DATA_FILE,(err, data) => {
        if (err) console.log(err);
        const users = data ? JSON.parse(data) : [];
        const email = req.params.email; 
        const user = users.find(u => u.email === email);
        if (user) {
           res.send(user);
           console.log("already registered");
           
        } else {
            res.send(null);
            console.log("not registered");
            
        }
    });
});
app.post('/users', (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password,
    };

    fs.readFile(DATA_FILE,(err, data) => {
        if (err) {
            console.log(err);
        }
        const users = data ? JSON.parse(data) : [];
        users.push(newUser);
        fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), (writeErr) => {
            if (err) {
                console.log(err);
            }

            res.send(newUser);
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("server started");
});
