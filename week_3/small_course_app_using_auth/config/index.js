const dotenv = require('dotenv');
const path = require('path')
dotenv.config({ path: path.join(__dirname, "../../.env")});

module.exports = {
    serverConfig : process.env.PORT || 3000,
      mongoConfig: process.env.MONGO_URL_2,
}