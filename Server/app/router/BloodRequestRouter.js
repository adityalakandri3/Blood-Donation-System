const express = require("express");
const router = express.Router();
const BloodRequestController = require("../controller/BloodRequest");
const { AuthCheck, RoleCheck } = require("../middleware/Auth");

// Create a blood request

router.post(
  "/create-blood-request",AuthCheck,
  RoleCheck("recipient"),
  BloodRequestController.createBloodRequest
);

// Get all blood requests
router.get("/get-blood-request",AuthCheck, BloodRequestController.getAllBloodRequests);

//get blood request by id
router.get(
  "/get-blood-request/:id",AuthCheck,
  BloodRequestController.getAllBloodRequestById
);

// Update blood request
router.put(
  "/update-blood-request/:id",
  RoleCheck("recipient"),AuthCheck,
  BloodRequestController.updateBloodRequest
);

//delete blood request by id
router.delete(
  "/delete-blood-request/:id",
  RoleCheck("recipient"),AuthCheck,
  BloodRequestController.deleteBloodRequest
);

module.exports = router;
