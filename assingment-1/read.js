const fs  = require('fs');


const input = process.argv.slice(2).join(' ');

console.log(process.argv);

fs.writeFile('./input.txt', input, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('success');
})