/* Bill board model */

"use strict";

const mongoose = require("mongoose");

const BillBoardSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  date: {
    type: String /* change later to date type*/,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

const BillBoard = mongoose.model("BillBoard", BillBoardSchema);

module.exports = { BillBoard };
