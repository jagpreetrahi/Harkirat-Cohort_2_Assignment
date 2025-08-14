/*
Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.
*/

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dummy.txt');
const data = "This is somethingn you don't know something bcz something is something"

fs.writeFile(filePath, data , 'utf-8', (err) => {
    if(err){
        console.log(err)
    }
})

// expensive operation here is 
for(let i = 0 ; i<100000000; i++){
    let j = i + 2
}

console.log("Execution operation start")