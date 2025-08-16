// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

const express = require('express')
const app = express();
const PORT = 3000;

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {}
}, 10000)

const ratelimitting = (req,res,next) => {

    const user_id = req.headers['user-id'];
    if(!numberOfRequestsForUser[user_id]){
        numberOfRequestsForUser[user_id] = 0;
    }
    if(numberOfRequestsForUser[user_id] < 5){
        console.log("THe request is ", numberOfRequestsForUser[user_id])
        numberOfRequestsForUser[user_id]++;
        next();
       
    }
    else{
        return res.status(404).json({
            message : "You have exhaustes your request for the given routes"
        })
    }

}


app.use(ratelimitting);

app.get('/api' , (req, res) => {
    
    return res.status(200).json({
        message : "Successfully return the data",
        
    })
})

app.get('/user', (req,res) => {
    return res.status(403).json({
        message : "User not found for this id",
       
    })
})


app.listen(PORT , () => {
  console.log(`Successfully run the port on ${PORT}`)
})