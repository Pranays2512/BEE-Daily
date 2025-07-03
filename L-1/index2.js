const fs = require('fs');
console.log(fs);
console.log("start");
setImmediate(() => {
    console.log("immediate");
});
setTimeout(() => {
    console.log("timeout");
}, 0);

fs.readFile("demo.txt", (err, data) => {
    console.log("fileread");
    setTimeout(() => {
        console.log("timeout 2");
    }, 0);
    setImmediate(() => {
        console.log("immediate 2");
    });
});

function sometask() {
    return new Promise((resolve, reject) => {
        resolve("task done");
    });
}

sometask()
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

console.log("end");
