const express = require("express");
const { RoleCheck, AuthCheck } = require("../middleware/Auth");
const CampController = require("../controller/CampController");
const campImage = require("../helper/campImage");
const router = express.Router();

// get all camp.
router.get("/get-camp", AuthCheck, CampController.getAllCamp);

//campid
router.get("/get-camp/:id", AuthCheck, CampController.getCampById);

router.all("/*", AuthCheck);
//create camp
router.post(
  "/admin/create-camp",
  RoleCheck("admin"),
  campImage.single("image"),
  CampController.createCamp
);

//camp id
router.post(
  "/admin/update-camp/:id",
  RoleCheck("admin"),
  campImage.single("image"),
  CampController.updateCamp
);
//camp id
router.delete(
  "/admin/delete-camp/:id",
  RoleCheck("admin"),
  CampController.deleteCamp
);

//camp id
router.get(
  "/admin/get-registrations/:id",
  RoleCheck("admin"),
  CampController.getCampRegistrations
);

//user id
router.get(
  "/admin/user-registration/:id",
  RoleCheck("admin"),
  CampController.getRegistrationsByUser
);

//change status
//registration id
router.put(
  "/admin/update-registration/:id",
  RoleCheck("admin"),
  CampController.updateRegistrationStatus
);

module.exports = router;
