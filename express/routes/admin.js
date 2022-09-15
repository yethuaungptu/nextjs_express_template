const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const loginService = require('../services/login.service');
const checkAuth = require('../middlewares/check.auth');

router.post('/login', loginService.adminLogin);
router.get('/', checkAuth, adminController.index);

//start plan
router.post('/plannamecheck', checkAuth, adminController.planNameCheck);
router.post('/addplan', checkAuth, adminController.createPlan);
router.get('/planlist', checkAuth, adminController.planList);
router.patch('/planupdate', checkAuth, adminController.planUpdate);
router.delete('/plandelete', checkAuth, adminController.planDelete);
//end plan

//start user
router.post('/adduser', checkAuth, adminController.addUser);
router.get('/userlist', checkAuth, adminController.userList);
router.get('/userdetail/:id', checkAuth, adminController.userDetail);
router.patch('/userupdate', checkAuth, adminController.userUpdate);
router.delete('/userdelete', checkAuth, adminController.userDelete);
router.post('/usernamecheck', checkAuth, adminController.userNameCheck);
//end user

module.exports = router;
