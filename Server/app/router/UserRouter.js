const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();



router.post('/create-user',userController.createUser)
router.post('/login-user',userController.loginUser)


module.exports = router;