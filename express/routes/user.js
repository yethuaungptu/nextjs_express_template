const router = require('express').Router();
const userController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/check.user.auth');

router.get('/', checkAuth, userController.index);

module.exports = router;
