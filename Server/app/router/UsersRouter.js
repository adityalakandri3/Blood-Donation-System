const express = require('express');
const UserController = require('../controller/UserController');
const { AuthCheck } = require('../middleware/Auth');
const router = express.Router();


router.post('/create-user',UserController.createUser)
router.post('/login-user',UserController.loginUser)
router.post('/verify-otp',UserController.verifyOTP);
router.post('/reset-password-link',UserController.resetPasswordLink);
router.post('/reset-password/:id/:token',UserController.resetPassword);


router.get('/user-dashboard',AuthCheck,UserController.userDashboard)
router.post('/update-password',AuthCheck,UserController.updatePassword);
router.get('/edit-user/:id',AuthCheck,UserController.editUser);
router.post('/update-user/:id',AuthCheck,UserController.updateUser);

module.exports = router;