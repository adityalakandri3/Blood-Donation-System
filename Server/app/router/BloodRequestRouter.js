const express = require("express");
const router = express.Router();
const BloodRequestController = require("../controller/BloodRequest");
const { AuthCheck, RoleCheck } = require("../middleware/Auth");

// Create a blood request
router.all("/*", AuthCheck);

router.post(
  "/create-blood-request",
  RoleCheck("recipient"),
  BloodRequestController.createBloodRequest
);

// Get all blood requests
router.get("/get-blood-request", BloodRequestController.getAllBloodRequests);

//get blood request by id
router.get(
  "/get-blood-request/:id",
  BloodRequestController.getAllBloodRequestById
);

// Update blood request
router.put(
  "/update-blood-request/:id",
  RoleCheck("recipient"),
  BloodRequestController.updateBloodRequest
);

//delete blood request by id
router.delete(
  "/delete-blood-request/:id",
  RoleCheck("recipient"),
  BloodRequestController.deleteBloodRequest
);

module.exports = router;
