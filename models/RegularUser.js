/* Regular user model */
"use strict";

const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: String,
  admin: String
});

const RegularUserSchema = new mongoose.Schema({
  username: String,
  password: String,
  GPA: Number,
  gender: String,
  levelOfEducation: String,
  fieldOfStudy: String,
  courseTeaching: [CourseSchema],
  courseTaking: [CourseSchema]
});

const RegularUser = mongoose.model("RegularUser", RegularUserSchema);

module.exports = { RegularUser };
