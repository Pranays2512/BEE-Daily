const fs = require('fs');

function read(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) return reject(err);
            if (!data.trim()) return resolve([]); // empty file = empty array
            try {
                const parsed = JSON.parse(data);
                resolve(parsed);
            } catch (e) {
                console.error("Invalid JSON in file:", file);
                resolve([]); // fallback
            }
        });
    });
}

function write(file, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) return reject(err);
            resolve("Write successful");
        });
    });
}

module.exports = { read, write };
