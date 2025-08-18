const express = require('express')
const app = express();
const {serverConfig} = require('./config')
const apiRoutes = require('./routes');

// middleware for parsing the body
app.use(express.json(), express.urlencoded({extended : true}));

app.use('/api/v1', apiRoutes);

app.listen(serverConfig, () => {
    console.log(`Successfully run the port on ${serverConfig}`)
})