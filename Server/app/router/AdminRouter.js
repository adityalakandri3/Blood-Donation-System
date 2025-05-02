const express = require('express');
const AdminController = require('../controller/AdminController');
const AdminAuthCheck = require('../middleware/AdminAuthCheck');
const router = express.Router();


router.get('/admin/register',AdminController.registerView);
router.get('/admin/login',AdminController.loginView);
router.get('/',AdminAuthCheck,AdminController.CheckAuth,AdminController.home)
router.get('/logout',AdminAuthCheck,AdminController.logout)
router.get('/admin/camps',AdminAuthCheck,AdminController.CheckAuth,AdminController.campView)
router.get('/admin/get-camp-form',AdminAuthCheck,AdminController.CheckAuth,AdminController.campFormView)
router.get('/admin/get-camp-details/:id',AdminAuthCheck,AdminController.CheckAuth,AdminController.getCampByIdAdmin)
router.get('/admin/update-camp-details/:id',AdminAuthCheck,AdminController.CheckAuth,AdminController.updateCampView)

router.get('/admin/dashboard',AdminAuthCheck,AdminController.CheckAuth,AdminController.dashboard)
router.get('/admin/get-password/:id',AdminAuthCheck,AdminController.CheckAuth,AdminController.updatePasswordAdminView)
router.post('/admin/update-password/:id',AdminAuthCheck,AdminController.CheckAuth,AdminController.updatePasswordAdmin)

router.get('/admin/forgot-password',AdminController.forgotpasswordView);
router.get('/account/reset-password/:id/:token', AdminController.resetPasswordView);



module.exports = router;