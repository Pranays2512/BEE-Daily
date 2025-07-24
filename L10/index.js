const express = require('express');
const fs = require('fs/promises');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const DATA_FILE = 'users.json';


app.get('/login', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const users = JSON.parse(data);

        const email = req.query.email; 
        const user = users.find(u => u.email === email);

        if (user) {
            console.log("logged in");
            res.send(user);  
        } else {
            console.log("Not registered");
            res.send(null); 
        }

    } catch (err) {
        console.error("Error reading file", err);
        res.status(500).send("Server error");
    }
});


app.post('/login', async (req, res) => {
    const newUser = {
        name: req.body.name,
        rollno: req.body.rollno,
        email: req.body.email,
        password: req.body.password,
    };

    let users = [];
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        if (err.code !== 'ENOENT') return res.send(err);
    }

  
    const existingUser = users.find(user => user.email === newUser.email);
    if (existingUser) {
        return res.send('<h1>User already registered!</h1><a href="/">Go back</a>');
    }

    users.push(newUser);

    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
        res.send('<h1>User created successfully!</h1><p>You can now log in.</p><a href="/">Go back</a>');
    } catch (error) {
        console.error(error);
        res.send('Server error while saving data.');
    }
});


app.listen(port, () => {
    console.log("Server started on port", port);
});
