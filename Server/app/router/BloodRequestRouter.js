const express = require("express");
const router = express.Router();
const BloodRequestController = require("../controller/BloodRequest");
const { AuthCheck, RoleCheck } = require("../middleware/Auth");

// Create a blood request (only recipients)
router.post(
  "/create-blood-request",
  AuthCheck,
  RoleCheck("recipient"),
  BloodRequestController.createBloodRequest
);

// Get all blood requests for logged-in user
router.get(
  "/get-blood-request",
  AuthCheck,
  BloodRequestController.getAllBloodRequests
);

// Get a specific blood request by ID
router.get(
  "/get-blood-request/:id",
  AuthCheck,
  BloodRequestController.getAllBloodRequestById
);

// Update a blood request (only recipients)
router.put(
  "/update-blood-request/:id",
  AuthCheck,
  RoleCheck("recipient"),
  BloodRequestController.updateBloodRequest
);

// Delete a blood request (only recipients)
router.delete(
  "/delete-blood-request/:id",
  AuthCheck,
  RoleCheck("recipient"),
  BloodRequestController.deleteBloodRequest
);

module.exports = router;
