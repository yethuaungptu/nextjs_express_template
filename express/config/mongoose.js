const mongoose = require('mongoose');
const env = require('./environment');
const dayjs = require('dayjs');

mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
    logger.info(` [${dayjs(new Date()).format('DD/MM/YYYY HH:mm:ss')}] -${collectionName}.${methodName}`);
});

mongoose
    .connect(env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.error('Cannot connect to MongoDB : ', err.message));
