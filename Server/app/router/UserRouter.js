const express = require('express');
const userController = require('../controller/userController');
const { AuthCheck } = require('../middleware/Auth');
const router = express.Router();



router.post('/create-user',userController.createUser)
router.post('/login-user',userController.loginUser)
router.post('/verify-otp',userController.verifyOTP);

router.all('/*',AuthCheck);
router.get('/user-dashboard',userController.userDashboard)

module.exports = router;