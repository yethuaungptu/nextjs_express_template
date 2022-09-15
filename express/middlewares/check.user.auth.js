const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const token = req.headers.utoken;
        const decode = jwt.verify(token, 'Wedding@InviteUser2022');
        console.log(decode);
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed'
        });
    }
};
