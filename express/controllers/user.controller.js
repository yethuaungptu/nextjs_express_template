const {
    ok,
    error,
    created,
    retrieved,
    updated,
    deleted,
    paginatedData,
    getAdmin,
    authFail
} = require('./base.controller');
const User = require('../models/user.model');

exports.index = (req, res) => {
    ok(res, 'User Home', 'Done');
};
