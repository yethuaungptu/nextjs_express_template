const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve((process.env.NODE_ENV || '') + '.env')
});

const PORT = process.env.PORT;
const MONGO = process.env.MONGODB_URL;

module.exports = {
    PORT,
    MONGO
};
