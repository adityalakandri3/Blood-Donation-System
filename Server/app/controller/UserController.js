const { hashedPassword, matchPassword } = require("../middleware/Auth");
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");

class UserController {
  //User Create function
  async createUser(req, res) {
    try {
      const { name, email, password, role, bloodType, location } = req.body;

      //checking if all the fields are present
      if (
        !name ||
        !email ||
        !password ||
        !role ||
        !bloodType ||
        !location?.state ||
        !location?.city
      ) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }

      //hashing Password
      const hashPassword = await hashedPassword(password);

      //saving the data in the database
      const data = new User({
        name,
        email,
        password: hashPassword,
        role,
        bloodType,
        location,
      });
      const user = await data.save();

      //Response for saving the data
      if (user) {
        return res.status(200).json({
          status: true,
          message: "User registered Successfully.",
          data: user,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while creating user:${error.message}`,
      });
    }
  }

  //User Login function
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      //checking if the fields are present or not
      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }

      //finding email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Email doesn't exist.",
        });
      }

      //Matching password
      const isMatch = await matchPassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: "Incorrect Password.",
        });
      }

      //create token
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bloodType: user.bloodType,
          location: user.location,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1hr" }
      );

      //return login Successful
      return res.status(200).json({
        status: true,
        message: "Login Successful.",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bloodType: user.bloodType,
          location: user.location,
        },
        token:token
      });
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:`Something went wrong while logging in.${error.message}`
        })
    }
  }
}

module.exports = new UserController();
