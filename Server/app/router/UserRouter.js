const express = require('express');
const UserController = require('../controller/UserController')
const router = express.Router();



router.get('/',UserController.home)


module.exports = router;