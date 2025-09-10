const express = require('express')
const app = express();
const {connectMongo} = require('./db')
const {serverConfig, mongoConfig} = require('./config')
const apiRoutes = require('./routes');

connectMongo();
app.use(express.json(), express.urlencoded({extended : true}))
app.use('/api/v1', apiRoutes);


app.listen(serverConfig, () => {
    console.log(`Successfully running on PORT ${serverConfig}`);
    console.log(`MongoDB URL: ${mongoConfig}`);
});

