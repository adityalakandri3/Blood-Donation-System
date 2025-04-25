const express = require('express');
const { RoleCheck, AuthCheck } = require('../middleware/Auth');
const DonorController = require('../controller/DonorController');
const router = express.Router();



router.get('/get-blood-request-donor',RoleCheck('donor'),AuthCheck,DonorController.getMatchingRequestForDonor);
router.get('/get-blood-request-donor/:id',RoleCheck('donor'),AuthCheck,DonorController.getMatchingRequestForDonorById);
router.put('/accept-blood-request/:id',RoleCheck('donor'),AuthCheck,DonorController.acceptBloodRequest)


module.exports = router;