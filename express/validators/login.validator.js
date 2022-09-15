const validator = require('../middlewares/request.body.validator');
const schemas = require('../schemas/login.schema');

exports.login = (req, res, next) => {
    const message = validator(schemas.login, req.body);
    message == null ? next() : res.status(422).json({ status: 'fail', message: message });
};
