const express = require("express");
const router = express.Router();
const user = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/user-create", async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword, profession } =
      req.body;

    console.log(name, email, phone, password, confirmPassword, profession);

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !profession ||
      !phone
    ) {
      return res.status(404).json({
        message: "name or email or password or phone or profession is missing",
        success: false,
      });
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res
        .status(201)
        .json({ message: "user already exists", success: false });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      name,
      email,
      phone,
      password: hashpassword,
      confirmPassword: hashpassword,
      profession,
    });
    await newUser.save();
    res.status(201).json({ message: "user created" });
  } catch (error) {
    res.status(500).json({ message: "user not created" });
  }
});
router.post("/user-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "email and password are required", success: false });
    }
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }
    const validpassword = await bcrypt.compare(password, existingUser.password);
    if (!validpassword) {
      return res
        .status(401)
        .json({ message: "invalid password", success: false });
    }
    const token = jwt.sign(
      {
        userid: existingUser._id,
        email: existingUser.email,
      },
      "Frost#2004", // secret key
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "User logged in",
      success: true,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "user not logged in" });
  }
});
module.exports = router;