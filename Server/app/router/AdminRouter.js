const express = require('express');
const AdminController = require('../controller/AdminController');
const AdminAuthCheck = require('../middleware/AdminAuthCheck');
const router = express.Router();


router.get('/admin/register',AdminController.registerView);
router.get('/admin/login',AdminController.loginView);
router.get('/',AdminAuthCheck,AdminController.CheckAuth,AdminController.dashboard)
router.get('/logout',AdminAuthCheck,AdminController.logout)
router.get('/admin/buttons',AdminAuthCheck,AdminController.CheckAuth,AdminController.campView)




module.exports = router;