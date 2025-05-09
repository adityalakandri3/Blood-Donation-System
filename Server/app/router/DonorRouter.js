const express = require('express');
const { RoleCheck, AuthCheck } = require('../middleware/Auth');
const DonorController = require('../controller/DonorController');
const router = express.Router();


router.get('/get-blood-request-donor',AuthCheck,RoleCheck('donor'),DonorController.getMatchingRequestForDonor);
router.get('/get-blood-request-donor/:id',AuthCheck,RoleCheck('donor'),DonorController.getMatchingRequestForDonorById);
router.post('/accept-blood-request/:id',AuthCheck,RoleCheck('donor'),AuthCheck,DonorController.acceptBloodRequest)


module.exports = router;