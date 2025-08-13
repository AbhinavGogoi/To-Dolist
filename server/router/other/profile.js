const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../model/user");
const { default: mongoose } = require("mongoose");
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, "ABCD"); // Use the same secret key
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
router.get("/profile/:id", async (req, res) => {
  try {
    const {id:_id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userData = await User.findById({_id});
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({data:userData});
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user" });
  }
});
module.exports = router;