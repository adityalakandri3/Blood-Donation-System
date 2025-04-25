const express = require('express');
const { RoleCheck, AuthCheck } = require('../middleware/Auth');
const DonorController = require('../controller/DonorController');
const router = express.Router();


router.all('/*',AuthCheck);
router.get('/get-blood-request-donor',RoleCheck('donor'),DonorController.getMatchingRequestForDonor);
router.get('/get-blood-request-donor/:id',RoleCheck('donor'),DonorController.getMatchingRequestForDonorById);
router.put('/accept-blood-request/:id',RoleCheck('donor'),DonorController.acceptBloodRequest)


module.exports = router;