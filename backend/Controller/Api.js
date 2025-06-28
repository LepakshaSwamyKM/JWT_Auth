const User_DB = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sign_up = async (req, res) => {
  try {
    console.log(req.body);
    const userInfo = await User_DB.findOne({ email: req.body.email });
    if (userInfo) {
      return res
        .status(400)
        .json({
          message: "user is already found, you can login",
          success: "false",
        });
    }
    const user = new User_DB(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    console.log(user.password);
    await user.save();
    console.log(user);
    res.status(200).json({
      message: "user created successfully",
      success: "true",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.details[0].message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userInfo = await User_DB.findOne({ email });
    if (!userInfo) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        success: false,
        error: "Incorrect password",
      });
    }

    const jwt_token = jwt.sign(
      { email: userInfo.email, _id: userInfo._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      email: userInfo.email,
      name: userInfo.user,
      token: jwt_token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

module.exports = { sign_up, login };
