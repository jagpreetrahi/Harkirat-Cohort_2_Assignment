// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint.

/* What i learned here is - for catching the exception in the middlewarw i have to use the one more arg as err, that basically
tell something went wrong in the route 

When an exception is thrown in any route then express automatically forward it to the nearest error handling middleware.
*/


const express = require('express')
const app = express();
const PORT = 3000;

let errorCount = 0;
const errorHandle = (err , req, res, next) => {
    console.log(errorCount)
    errorCount++;
    return res.status(400).json({
        message : err.message || "Something went wrong"
    })
}


app.get('/api' , (req, res) => {
    throw new Error("User not found")
   
})

app.get('/user', (req,res) => {
    return res.status(403).json({
        message : "User not found for this id",
       
    })
})

app.get('/errorCount', (req,res) => {
    return res.status(200).json({
        errorCount : errorCount
    })
})

app.use(errorHandle)
app.listen(PORT , () => {
  console.log(`Successfully run the port on ${PORT}`)
})

