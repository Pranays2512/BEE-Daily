const express=require('express');
const fs = require('fs');
const path = require('path');
const app=express();
const port=3000;    


// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/users",(req,res)=>{
 
    const usersFilePath = path.join(__dirname, 'users.json');

    fs.readFile(usersFilePath,"utf-8",(err,data)=>{
        if(err){
            console.error("Error reading users.json:", err);
            return res.status(500).json({ error: "Could not read user data." });
        }
        try {
            const users = JSON.parse(data);
            res.json(users);
        } catch (parseError) {
            console.error("Error parsing users.json:", parseError);
            res.status(500).json({ error: "Malformed user data." });
        }
    });
})

app.post("/users", (req, res) => {
    const usersFilePath = path.join(__dirname, 'users.json');
    const newItem = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description
    };

    fs.readFile(usersFilePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading users.json:", err);
            return res.status(500).json({ error: "Could not read user data." });
        }
        const users = JSON.parse(data);
        users.push(newItem);

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error("Error writing to users.json:", writeErr);
                return res.status(500).json({ error: "Could not save new item." });
            }
            res.status(201).json(newItem);
        });
    });
});

app.post("/users", (req, res) => {
    const usersFilePath = path.join(__dirname, 'users.json');
    const newItem = {
        id: Date.now(), // Use a timestamp for a unique ID
        title: req.body.title,
        description: req.body.description
    };

    fs.readFile(usersFilePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading users.json:", err);
            return res.status(500).json({ error: "Could not read user data." });
        }
        const users = JSON.parse(data);
        users.push(newItem);

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error("Error writing to users.json:", writeErr);
                return res.status(500).json({ error: "Could not save new item." });
            }
            res.status(201).json(newItem);
        });
    });
});

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})