const transporter = require("../config/emailConfig");
const { hashedPassword, matchPassword } = require("../middleware/Auth");
const sendEmailVerificationOtp = require("../middleware/EmailVerifyOtp");
const emailVerificationModel = require("../model/OtpModel");
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createToken = require("../helper/createTokenforAdmin");

class UserController {
  //User Create function
  async createUser(req, res) {
    // console.log(req.body)
    try {
      const { name, email, password, role, bloodType, location } = req.body;
  
      // Checking if all the fields are present
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
  
      // Hashing password
      const hashPassword = await hashedPassword(password);
  
      // Setting is_verified to true for admin, false otherwise
      const is_verified = role === "admin" ? true : false;
  
      // Saving the data in the database
      const data = new User({
        name,
        email,
        password: hashPassword,
        role,
        bloodType,
        location,
        is_verified,
      });
  
      const user = await data.save();
  
      // Send OTP only if not admin
      if (role !== "admin") {
        sendEmailVerificationOtp(req, user);
      }
  
      if (role === "admin") {
        // Redirect to login page after admin registration
        return res.redirect('/admin/login');
      }
  
      return res.status(200).json({
        status: true,
        message:
          role === "admin"
            ? "Admin registered successfully. Please login."
            : "User registered and OTP sent successfully.",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while creating user: ${error.message}`,
      });s
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

      if (!user.is_verified) {
        return res.status(400).json({
          status: false,
          message: "User not verified.",
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
      //for admin
      if(user.role==="admin"){
        const tokendata = await createToken({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bloodType: user.bloodType,
          location: user.location,
        });
        if (tokendata) {
          res.cookie("userToken", tokendata);
          console.log('Admin logged in')
          return res.redirect("/");
        } else {
          console.log("login failed");
          return res.redirect("/admin/login");
        }

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
        { expiresIn: "1h" }
      );

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
  //update password
  async updatePassword(req, res) {
    try {
      const { user_id, password } = req.body;
      if (!password) {
        return res.status(400).json({
          status: false,
          message: "Password is required",
        });
      }
      //finding user
      const userdata = await User.findOne({ _id: user_id });
      if (userdata) {
        const newPassword = await hashedPassword(password);

        //if user is present updating password
        const updateuser = await User.findOneAndUpdate(
          { _id: user_id },
          {
            $set: {
              password: newPassword,
            },
          }
        );
        return res.status(200).json({
          status: true,
          message: "Password updated successfully",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Password not updated",
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong,${err.message}`,
      });
    }
  }
  //reset password link
  async resetPasswordLink(req, res) {
    try {
      const { email } = req.body;
      //email is required
      if (!email) {
        return res.status(400).json({
          status: false,
          message: "Email is required.",
        });
      }
      //check if the user exist or not

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Email doesn't exist.",
        });
      }

      //generating token for resetPassword
      const secret = user._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: "20m",
      });
      console.log("token", token);
      //reset link
      const resetLink = `${process.env.FRONT_END_HOST}/account/reset-password/${user._id}/${token}`;
      console.log(resetLink);

      //send mail
      await transporter.sendMail({
        from: process.env.EMAIL_HOST,
        to: user.email,
        subject: "Password Reset Link",
        html: `<h5> Hello, ${user.name},</h5><h5> Please <a>${resetLink}</a> Click here to reset your password.</h5> `,
      });

      return res.status(200).json({
        status: true,
        message: "Email to reset password has been sent successfully.",
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //reset password
  async resetPassword(req, res) {
    try {
      const { password, confirmPassword } = req.body;
      const { id, token } = req.params;

      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "User not found.",
        });
      }

      //validate token
      const newSecret = user._id + process.env.JWT_SECRET_KEY;
      jwt.verify(token, newSecret);

      //both fields are required
      if (!password || !confirmPassword) {
        return res.status(400).json({
          status: false,
          message: "Both fields are required.",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          status: false,
          message: "Password and Confirm Password doesn't match. ",
        });
      }

      //Generate salt
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);

      //update password
      await User.findByIdAndUpdate(user._id, {
        $set: { password: newHashPassword },
      });

      return res.status(200).json({
        status: true,
        message: "Password reset successful.",
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Unable to reset password.${error.message}`,
      });
    }
  }
  //dashboard
  async userDashboard(req, res) {
    try {
      return res.status(200).json({
        status: true,
        message: "Welcome to Dashboard",
        data: req.user,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong,${error.message}`,
      });
    }
  }
  //edit User
  async editUser(req, res) {
    try {
      const { id } = req.params;
      const edit = await User.findById(id);
      if (!edit) {
        return res.status(400).json({
          status: false,
          message: "User not found.",
        });
      }
      return res.status(200).json({
        status: true,
        message: "User fetched successfully.",
        data: edit,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong,${error.message}.`,
      });
    }
  }
  //update User
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, password, role, bloodType, location } = req.body;
      //checking if all the fields are present
      if (
        !name ||
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
      const updatedData = {
        name,
        password: hashPassword,
        role,
        bloodType,
        location,
      };
      const update = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      return res.status(200).json({
        status: true,
        message: "User Updated Succesfully.",
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong whie updating user.${error.message}`,
      });
    }
  }
}

module.exports = new UserController();
