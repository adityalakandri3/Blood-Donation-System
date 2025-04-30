class AdminController {
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
  async dashboard(req,res){
    try {
        res.render("home", {
          title: "home",
          user:req.user
        });
      } catch (error) {
        console.log(error.message);
      }
  
  }
}

module.exports = new AdminController();
