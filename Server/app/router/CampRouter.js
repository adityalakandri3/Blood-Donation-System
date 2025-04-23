const express = require('express');
const { RoleCheck, AuthCheck } = require('../middleware/Auth');
const CampController = require('../controller/CampController');
const router = express.Router();



router.post('/create-camp',AuthCheck,RoleCheck('admin'),CampController.createCamp);
router.get('/get-camp',CampController.getAllCamp);
router.get('/get-camp/:id',CampController.getCampById);


module.exports= router;