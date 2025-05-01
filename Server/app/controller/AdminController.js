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
  //logout admin
  async logout(req, res) {
    try {
      res.clearCookie("userToken"),
       res.redirect("/admin/login");
    } catch (error) {
      console.log(error.message);
    }
  }
  //camp view
  async campView (req,res){
    try {
      return res.render('buttons',{
        title:'buttons',
        user:req.user
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new AdminController();
