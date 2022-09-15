const dayjs = require('dayjs');
const morgan = require('morgan');

module.exports = morgan(
    (tokens, req, res) =>
        [
            ` [${dayjs(new Date()).format('DD/MM/YYYY HH:mm:ss')}]`,
            tokens.url(req, res),
            tokens.method(req, res),
            tokens.status(req, res),
            res.statusMessage
        ].join(' -'),
    { stream: logger.stream }
);
