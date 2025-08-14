/*
Reading the contents of a file

Write code to read contents of a file and print it to the console. 
You can use the fs library to as a black box, the goal is to understand async tasks. 
Try to do an expensive operation below the file read and see how it affects the output. 
Make the expensive operation more and more expensive and see how it affects the output. 

_dirname -> absolute path of the folder that contain the current script
*/

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dummy.txt');

/* this is done by the stream */
const readFileStream  = fs.createReadStream(filePath, {
    encoding : 'utf-8',
    highWaterMark : 16 * 1024,

})

readFileStream.on('data', (chunk) => {
      
    console.log(`Received chunk of ${chunk.length} bytes:`);
    console.log(chunk);
})

readFileStream.on('end' , () => {
     console.log("File read completed")
})

/* this is done by async readFile function */
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err)
    {
        console.error("Error reading the file", err);
        return;
    }

    // Simulate file contents being printed asynchronously after setTimeout
    setTimeout(function ()
    {
        console.log("\nWaiting for file contents to appear...\n");
        setTimeout(function ()
        {
            console.log("File contents: ", data);  // This will now run after the expensive operation
        }, 1000);
    }, 1500);
})

console.log("Expensive operation intiates");

for(let i = 0; i< 100000000; i++){
    let j = i * 2
}
console.log("Expensive operation done here")