const loginService = require('../services/login.service');
const { created, retrieved, updated, deleted, paginatedData } = require('./base.controller');

exports.login = async (req, res) => {
    const result = await loginService.login(req);
    return res.status(200).json(result);
};
