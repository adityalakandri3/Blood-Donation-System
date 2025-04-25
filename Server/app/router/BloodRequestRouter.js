const express = require('express');
const router = express.Router();
const BloodRequestController = require('../controller/BloodRequest');
const { AuthCheck, RoleCheck } = require('../middleware/Auth');

// Create a blood request
router.post('/create-blood-request',AuthCheck, RoleCheck('recipient'),BloodRequestController.createBloodRequest);

// Get all blood requests
router.get('/get-blood-request', AuthCheck,BloodRequestController.getAllBloodRequests);

<<<<<<< HEAD
//get blood request by id
router.get('/get-blood-request/:id', AuthCheck,BloodRequestController.getAllBloodRequestById);

// Update blood request
router.put('/update-blood-request/:id', AuthCheck, RoleCheck('recipient'),BloodRequestController.updateBloodRequest);

//delete blood request by id
router.delete('/delete-blood-request/:id', AuthCheck, RoleCheck('recipient'),BloodRequestController.deleteBloodRequest);


=======
// Update blood request status
router.put('/blood-requests/:id',AuthCheck, BloodRequestController.updateBloodRequestStatus);

// Get blood requests by status
router.get('/blood-requests/status/:status',AuthCheck, BloodRequestController.getBloodRequestsByStatus);
>>>>>>> e4f96f2e10a1ce239242b5a9e065dbe2cb227f34

module.exports = router;