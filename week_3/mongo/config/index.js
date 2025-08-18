const dotenv = require('dotenv')
dotenv.config();
module.exports = {
    serverConfig : process.env.PORT,
    mongoConfig : process.env.mongo_url_1
}
