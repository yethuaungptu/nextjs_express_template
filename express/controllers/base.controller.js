const { itemNotFoundError } = require('../errors/db.errors');
const jwt = require('jsonwebtoken');
const i18n = require('i18n');
const success = (res, message, data) => {
    return res.status(200).json({
        status: 'success',
        message,
        data
    });
};

exports.ok = (res, message, data = null) => {
    return res.status(200).json({
        status: 'success',
        message,
        data
    });
};

exports.error = (res, message, data = null) => {
    return res.status(500).json({
        status: 'error',
        message,
        data
    });
};

exports.created = (res, name, data = null) => {
    return res.status(201).json({
        status: 'success',
        // message: i18n.__('%s.create.success', i18n.__(name)),
        message: name,
        data
    });
};

exports.accepted = (res, message, data = null) => {
    return res.status(202).json({
        status: 'success',
        message,
        data
    });
};

exports.response = (res, status = 200, message, data = null) => {
    return res.status(status).json({
        status: 'success',
        message,
        data
    });
};

exports.retrieved = (res, name, data = null) => {
    if (!data) {
        throw itemNotFoundError(name);
    }
    // return success(res, i18n.__('%s.retrieve.success', i18n.__(name)), data);
    return success(res, name, data);
};

exports.updated = (res, name, data = null) => {
    if (!data) {
        throw itemNotFoundError(name);
    }
    // return success(res, i18n.__('%s.update.success', i18n.__(name)), data);
    return success(res, name, data);
};

exports.deleted = (res, name, data = null) => {
    if (!data) {
        throw itemNotFoundError(name);
    }
    // return success(res, i18n.__('%s.delete.success', i18n.__(name)), null);
    return success(res, name, data);
};

exports.paginatedData = (req, content, pageable) => {
    return req.query.page && req.query.size ? { content, pageable } : content;
};

exports.getAdmin = (req) => {
    try {
        return jwt.verify(req.headers.token, 'Wedding@Invite2022');
    } catch {
        return false;
    }
};

exports.authFail = (res) => {
    res.status(401).json({
        message: 'Auth Fail'
    });
};
