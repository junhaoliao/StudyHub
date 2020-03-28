"use strict";
// DO NOT CHANGE THIS FILE
const mongoose = require("mongoose");

// DO NOT CHANGE THIS FILE
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/studyhub",
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

// DO NOT CHANGE THIS FILE
module.exports = { mongoose };
