const express = require('express');
const router = express.Router();
const BloodRequestController = require('../controller/BloodRequest');
const { AuthCheck } = require('../middleware/Auth');

// Create a blood request
router.post('/blood-requests',AuthCheck, BloodRequestController.createBloodRequest);

// Get all blood requests
router.get('/get-blood-request', AuthCheck,BloodRequestController.getAllBloodRequests);

// Update blood request status
router.put('/blood-requests/:id', BloodRequestController.updateBloodRequestStatus);

// Get blood requests by status
router.get('/blood-requests/status/:status', BloodRequestController.getBloodRequestsByStatus);

module.exports = router;
