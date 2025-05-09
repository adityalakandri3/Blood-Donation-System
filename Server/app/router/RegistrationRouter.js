const express = require('express');
const CampRegistrationController = require('../controller/CampRegistrationController');
const { AuthCheck } = require('../middleware/Auth');
const router = express.Router()


router.post('/camp-register/:id',AuthCheck,CampRegistrationController.campRegister)
router.get('/my-registrations',AuthCheck,CampRegistrationController.myRegistrations)
router.post('/my-registrations/cancel-registration/:id',AuthCheck,CampRegistrationController.cancelRegistration)

module.exports = router