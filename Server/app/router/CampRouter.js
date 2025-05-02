const express = require("express");
const { RoleCheck, AuthCheck } = require("../middleware/Auth");
const CampController = require("../controller/CampController");
const campImage = require("../helper/campImage");
const AdminAuthCheck = require("../middleware/AdminAuthCheck");
const AdminController = require("../controller/AdminController");
const router = express.Router();

// get all camp.
router.get("/get-camp", AuthCheck, CampController.getAllCamp);

//campid
router.get("/get-camp/:id", AuthCheck, CampController.getCampById);

//create camp
router.post(
  "/admin/create-camp",
  AdminAuthCheck, 
  RoleCheck("admin"),  
  campImage.single("image"),
  CampController.createCamp
);


//camp id
router.post(
  "/admin/update-camp/:id",
  AdminAuthCheck,
  RoleCheck("admin"),
  campImage.single("image"),
  CampController.updateCamp
);
//camp id
router.get(
  "/admin/delete-camp/:id",
  AdminAuthCheck,
  RoleCheck("admin"),
  CampController.deleteCamp
);

//camp id
router.get(
  "/admin/get-registrations/:id",
  AdminAuthCheck,
  RoleCheck("admin"),
  CampController.getCampRegistrations
);

//user id
router.get(
  "/admin/user-registration/:id",
  RoleCheck("admin"),AuthCheck,
  CampController.getRegistrationsByUser
);

//change status
//registration id
router.put(
  "/admin/update-registration/:id",
  RoleCheck("admin"),AuthCheck,
  CampController.updateRegistrationStatus
);

module.exports = router;
