const express = require('express');
const userController = require('../controller/userController');
const { AuthCheck } = require('../middleware/Auth');
const router = express.Router();



router.post('/create-user',userController.createUser)
router.post('/login-user',userController.loginUser)
router.post('/verify-otp',userController.verifyOTP);
router.post('/reset-password-link',userController.resetPasswordLink);
router.post('/reset-password/:id/:token',userController.resetPassword);

router.all('/*',AuthCheck);
router.get('/user-dashboard',userController.userDashboard)
router.post('/update-password',userController.updatePassword);
router.get('/edit-user/:id',userController.editUser);
router.post('/update-user/:id',userController.updateUser);

module.exports = router;