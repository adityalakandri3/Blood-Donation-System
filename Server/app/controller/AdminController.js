const { hashedPassword } = require("../middleware/Auth");
const BloodDonationCampModel = require("../model/BloodDonationCamp");
const BloodRequestModel = require("../model/BloodRequest");
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
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
      const message = req.flash("message")[0];
      const error = req.flash("error")[0];

      return res.render("register", {
        title: "Admin Register",
        message,
        error,
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
      const message = req.flash("message")[0];
      const error = req.flash("error")[0];
      return res.render("login", {
        title: "Admin Login",
        message,
        error,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //dashboard
  async home(req, res) {
    try {
      // Fetch the statistics
      const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });
      const totalDonors = await User.countDocuments({ role: "donor" });
      const totalRecipients = await User.countDocuments({ role: "recipient" });
      const totalBloodRequests = await BloodRequestModel.countDocuments();
      const pendingBloodRequests = await BloodRequestModel.countDocuments({
        status: "pending",
      });
      const message = req.flash("message");
      // Render the home page and pass statistics data
      res.render("home", {
        title: "Dashboard",
        message,
        user: req.user,
        totalUsers,
        totalDonors,
        totalRecipients,
        totalBloodRequests,
        pendingBloodRequests,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error occurred while fetching data.");
    }
  }

  //logout admin
  async logout(req, res) {
    try {
      req.flash('message',"Logged out successfully.")
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
  //admin dashboard
  async dashboard(req, res) {
    try {
      res.render("admindashboard", {
        user: req.user,
      });
      console.log(req.user);
    } catch (error) {
      console.log(error);
    }
  }
  //update admin password view
  async updatePasswordAdminView(req, res) {
    try {
      return res.render("updatePassword", {
        user: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  }
  //update password admin
  async updatePasswordAdmin(req, res) {
    try {
      const { id } = req.params;
      const { password, confirmPassword } = req.body;

      if (!password || !confirmPassword) {
        return res.status(400).json({
          status: false,
          message: "Both password and confirm password are required",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          status: false,
          message: "Password and confirm password do not match",
        });
      }

      // Find the user by ID
      const userdata = await User.findById(id);
      if (!userdata) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      // Hash and update password
      const newPassword = await hashedPassword(password);
      await User.findByIdAndUpdate(id, {
        $set: { password: newPassword },
      });

      return res.redirect("/");
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: `Something went wrong: ${err.message}`,
      });
    }
  }
  //admin forgot password view
  async forgotpasswordView(req, res) {
    try {
      res.render("forgotpassword");
    } catch (error) {
      console.log("error");
    }
  }
  //admin reset password view
  async resetPasswordView(req, res) {
    const { id, token } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.render("resetPassword", { error: "User not found." });
      }

      const secret = user._id + process.env.JWT_SECRET_KEY;
      jwt.verify(token, secret);

      // If the token is valid, render the form with the userId and token
      res.render("resetPassword", {
        error: null,
        userId: id,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AdminController();
