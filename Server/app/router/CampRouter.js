const express = require("express");
const { RoleCheck, AuthCheck } = require("../middleware/Auth");
const CampController = require("../controller/CampController");
const campImage = require("../helper/campImage");
const router = express.Router();

router.post(
  "/admin/create-camp",
  AuthCheck,
  RoleCheck("admin"),
  campImage.single("image"),
  CampController.createCamp
);
//camp id
router.post(
  "/admin/update-camp/:id",
  AuthCheck,
  RoleCheck("admin"),
  campImage.single("image"),
  CampController.updateCamp
);
//camp id
router.delete(
  "/admin/delete-camp/:id",
  AuthCheck,
  RoleCheck("admin"),
  CampController.deleteCamp
);
// get all camp.
router.get("/get-camp", AuthCheck, CampController.getAllCamp);

//campid
router.get("/get-camp/:id", AuthCheck, CampController.getCampById);

//camp id
router.get(
  "/admin/get-registrations/:id",
  AuthCheck,
  RoleCheck("admin"),
  CampController.getCampRegistrations
);

//user id
router.get(
  "/admin/user-registration/:id",
  AuthCheck,
  RoleCheck("admin"),
  CampController.getRegistrationsByUser
);

//change status
//registration id
router.put(
  "/admin/update-registration/:id",
  AuthCheck,
  RoleCheck("admin"),
  CampController.updateRegistrationStatus
);

module.exports = router;
