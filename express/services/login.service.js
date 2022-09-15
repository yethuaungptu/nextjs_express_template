const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.adminLogin = (req, res) => {
    Admin.findOne({ username: req.body.username }, (err, rtn) => {
        if (err) {
            res.status(500).json({
                message: 'Internal server error',
                error: err
            });
        } else {
            if (rtn != null && Admin.compare(req.body.password, rtn.password)) {
                const token = jwt.sign({ id: rtn._id, name: rtn.username }, 'Wedding@Invite2022');
                res.status(200).json({
                    message: 'Admin login success',
                    token: token
                });
            } else {
                res.status(404).json({
                    message: 'Username not found or password not match'
                });
            }
        }
    });
};

exports.userLogin = (req, res) => {
    User.findOne({ username: req.body.username }, (err, rtn) => {
        if (err) {
            res.status(500).json({
                message: 'Internal server error',
                error: err
            });
        } else {
            if (rtn != null && User.compare(req.body.password, rtn.password)) {
                const token = jwt.sign({ id: rtn._id, name: rtn.username }, 'Wedding@InviteUser2022');
                res.status(200).json({
                    message: 'User login success',
                    token: token
                });
            } else {
                res.status(404).json({
                    message: 'Username not found or password not match'
                });
            }
        }
    });
};
