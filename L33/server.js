const express = require('express');
const app = express();
app.use(express.json());
const { createClient } = require("redis");

let client; 

async function connect() {
    client = createClient();

    client.on("error", function (err) {
        console.log("Error: " + err);
    });

    await client.connect();
}

connect()
.then(() => {
    app.listen(3000, () => {
        console.log("connected to redis");
         cachedData();     
        readAllCache(); 
    });
})
.catch((err) => {
    console.error("Failed to connect:", err);
});

async function cachedData() {
    await client.set("users:100", JSON.stringify([{
        name: "pranay",
        age: "19"
    }]));

    console.log("Data cached successfully!");
}
async function readAllCache() {
    try {
        const keys = await client.keys('*');
        if (keys.length === 0) {
            console.log("No keys found in Redis.");
            return;
        }

        console.log("All keys:", keys);

        const allData = {};
        for (const key of keys) {
            const value = await client.get(key);
            try {
                allData[key] = JSON.parse(value);
            } catch {
                allData[key] = value;
            }
        }

        console.log("All cached data:", allData);
    } catch (err) {
        console.error("Error reading all cache:", err);
    }
}


