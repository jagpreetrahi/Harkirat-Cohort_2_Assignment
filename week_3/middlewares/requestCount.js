const express = require('express')
const app = express();
const PORT = 3000;

/* global middleware that let's you count the number of request happen on the server

Problem : I faced issue to test a endpoint for this given routes and was not able to get back the response, the reason was 
i was not declaring the middleware properly with the arguments like req, res ,next. that's why express not able to understand
the next controller for the given route.

*/
let requestCount = 0;
const countServerRequest = (req,res,next) => {
    requestCount++;
    next()
}

app.use(countServerRequest);

app.get('/api' , (req, res) => {
    console.log("Insdie the api route")
    return res.status(200).json({
        message : "Successfully return the data",
        count : requestCount
    })
})

app.get('/user', (req,res) => {
    return res.status(400).json({
        message : "User not found for this id",
        count : requestCount
    })
})


app.listen(PORT , () => {
  console.log(`Successfully run the port on ${PORT}`)
})