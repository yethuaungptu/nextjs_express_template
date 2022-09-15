const router = require('express').Router();
const Admin = require('../models/admin.model');
const loginService = require('../services/login.service');

router.get('/', (req, res) => {
    res.json({ message: 'Hello' });
});

router.post('/regAdmin', (req, res) => {
    const admin = new Admin();
    if (Admin.compare('wiAdmin2022', req.body.code)) {
        admin.username = req.body.username;
        admin.displayname = req.body.displayname;
        admin.password = req.body.password;
        admin.save((err, rtn) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal server error',
                    error: err
                });
            } else {
                res.status(201).json({
                    message: 'Admin account create success',
                    admin: rtn
                });
            }
        });
    } else {
        res.status(401).json({
            message: 'Code is incorrect'
        });
    }
});

//user login
router.post('/login', loginService.userLogin);

module.exports = router;
