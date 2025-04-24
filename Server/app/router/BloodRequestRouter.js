const express = require("express");
const router = express.Router();
const bloodRequestController = require('../controller/BloodRequest');

// Create a blood request
router.post('/blood-requests', bloodRequestController.createBloodRequest);

// Get all blood requests
router.get('/blood-requests', bloodRequestController.getAllBloodRequests);

// Update blood request status
router.put('/blood-requests/:id', bloodRequestController.updateBloodRequestStatus);

// Get blood requests by status
router.get('/blood-requests/status/:status', bloodRequestController.getBloodRequestsByStatus);

module.exports = router;
