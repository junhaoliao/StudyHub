"use strict";
// DO NOT CHANGE THIS FILE
const mongoose = require("mongoose");

// DO NOT CHANGE THIS FILE
// db username and password removed for posting online
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/",
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

// DO NOT CHANGE THIS FILE
module.exports = {mongoose};
