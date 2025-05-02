const BloodDonationCampModel = require("../model/BloodDonationCamp");

class AdminController {
  //check admin auth
  async CheckAuth(req, res, next) {
    console.log(req.user);
    try {
      if (req.user) {
        next();
      } else {
        res.redirect("/admin/login");
      }
    } catch (err) {
      console.log(err);
    }
  }
  //register view
  async registerView(req, res) {
    try {
      return res.render("register", {
        title: "Admin Register",
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //login view
  async loginView(req, res) {
    try {
      return res.render("login", {
        title: "Admin Register",
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //dashboard
  async dashboard(req, res) {
    try {
      res.render("home", {
        title: "home",
        user: req.user,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  //logout admin
  async logout(req, res) {
    try {
      res.clearCookie("userToken"), res.redirect("/admin/login");
    } catch (error) {
      console.log(error.message);
    }
  }
  //camp view
  async campView(req, res) {
    try {
      const camps = await BloodDonationCampModel.find().populate(
        "organizer",
        "name"
      );
      return res.render("camps", {
        title: "Camps",
        user: req.user,
        data: camps,
      });
    } catch (error) {
      console.log(error);
    }
  }
  //camp form
  async campFormView(req, res) {
    try {
      return res.render("campform", {
        title: "CampForm",
        user: req.user,
      });
    } catch (error) {}
  }
  //get camp by id
  async getCampByIdAdmin(req, res) {
    try {
      const camp = await BloodDonationCampModel.findById(
        req.params.id
      ).populate("organizer", "name email");
      if (!camp) {
        return res.status(400).send("Camp not found");
      }
      res.render("camp-details", {
        title: "Camp Details",
        user: req.user,
        data: camp,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
  //update camp view
  async updateCampView(req, res) {
    try {
      const { id } = req.params;
      const camp = await BloodDonationCampModel.findById(id);
      if (camp) {
        return res.render("updatecamp", {
          user: req.user,
          data: camp,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
 
}

module.exports = new AdminController();
