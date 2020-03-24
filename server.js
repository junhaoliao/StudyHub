"use strict";

// starting the express server
const express = require("express");
const app = express();

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// building database
const { ObjectID } = require("mongodb");
const { mongoose } = require("./db/mongoose");
const { Regularuser } = require("./models/RegularUser");

console.log("hello");

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
