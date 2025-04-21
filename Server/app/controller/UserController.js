const { hashedPassword, matchPassword } = require("../middleware/Auth");
const sendEmailVerificationOtp = require("../middleware/EmailVerifyOtp");
const emailVerificationModel = require("../model/OtpModel");
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

      sendEmailVerificationOtp(req, user);
      //Response for saving the data
      if (user) {
        return res.status(200).json({
          status: true,
          message: "User registered and OTP sent successfully.",
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
  //Verify OTP
  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      //Checking if any of the fields are empty
      if (!email || !otp) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }

      //checking if email exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({
          status: false,
          message: "Email doesn't exist.",
        });
      }

      //checking if the email id is verified
      if (existingUser.is_verified) {
        return res.status(400).json({
          status: false,
          message: "Email is already Verified.",
        });
      }

      //checking if there is matching verification otp
      const emailVerification = await emailVerificationModel.findOne({
        user_id: existingUser._id,
        otp,
      });
      //matching OTP
      if (!emailVerification) {
        if (!existingUser.is_verified) {
          await sendEmailVerificationOtp(req, existingUser);
          return res.status(400).json({
            status: false,
            message: "Invalid OTP. New OTP has been sent to your email.",
          });
        }
        return res.status(400).json({
          status: false,
          message: "Invalid OTP.",
        });
      }

      //checking expiration time
      const currentTime = new Date();
      const expirationTime = new Date(
        emailVerification.created_At.getTime() + 15 * 60 * 1000
      );

      if (currentTime > expirationTime) {
        await sendEmailVerificationOtp(req, existingUser);
        return res.status(400).json({
          status: false,
          message: "OTP expired. New OTP has been sent to your email.",
        });
      }
      //if otp is valid is verified is set to true ans saved
      existingUser.is_verified = true;
      await existingUser.save();

      //after saving the data the otp and data in the database is deleted.
      await emailVerificationModel.deleteMany({ userId: existingUser._id });
      return res.status(200).json({
        status: true,
        message: "Email Verified Successfully",
      });
    } catch (error) {
      res.status(400).json({
        status: true,
        message: `Something went wrong,${error.message}`,
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

      if(!user.is_verified){
        return res.status(400).json({
          status:false,
          message:'User not verified.'
        })
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
        token: token,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while logging in.${error.message}`,
      });
    }
  }
  //dashboard
  async userDashboard(req,res){
    try {
      return res.status(200).json({
        status:true,
        message:'Welcome to Dashboard',
        data:req.user
      })
    } catch (error) {
      return res.status(400).json({
        status:false,
        message:`Something went wrong,${error.message}`,
      })
    }
  }
}

module.exports = new UserController();
