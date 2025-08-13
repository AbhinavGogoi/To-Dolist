const express = require("express");
const mongoose = require("mongoose");
const Task = require("../../model/task.js");
const router = express.Router();
router.post("/add/:id", async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }
    const { title, description, category, priority, duedate } = req.body;
    console.log("Request body:", req.body);
    if (!title || !description || !category || !priority || !duedate) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    console.log("Adding task for user ID:", _id);
    const task = new Task({
      title,
      description,
      category,
      priority,
      duedate,
      userId: _id,
      completed: false,
    });
    console.log("Task details:", {
      title,
      description,
      category,
      priority,
      duedate,
    });
    await task.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Task added successfully",
        success: true,
      });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.get("/get/:id", async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
       .status(400)
       .json({ success: false, message: "Invalid user ID" });
    }
    const tasks = await Task.find({ userId: _id }).sort({ createdAt: -1 });
    if (!tasks) {
      return res.status(404).json({ success: false, message: "Tasks not found" });
    }
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;
