const express = require('express');
const CampRegistrationController = require('../controller/CampRegistrationController');
const { AuthCheck } = require('../middleware/Auth');
const router = express.Router()


router.all('/*',AuthCheck);
router.post('/camp-register/:id',CampRegistrationController.campRegister)
router.get('/my-registrations',CampRegistrationController.myRegistrations)
router.put('/my-registrations/cancel-registration/:id',CampRegistrationController.cancelRegistration)

module.exports = router