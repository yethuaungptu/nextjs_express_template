const http = require('http');
const app = require('./app');
const env = require('./config/environment');

const server = http.createServer(app);

server.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});
