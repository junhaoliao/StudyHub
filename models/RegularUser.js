/* Regular user model */
"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const RegularUserSchema = new mongoose.Schema({
    username: String,
    password: String,
    GPA: Number,
    gender: String,
    levelOfEducation: String,
    fieldOfStudy: String,
    coursesTeaching: [mongoose.Schema.Types.ObjectId], // the courses being administrated by this user
    coursesTaking: [mongoose.Schema.Types.ObjectId], // the courses being taken by this user
    coursesLiked: [mongoose.Schema.Types.ObjectId], // the courses liked by this user
    filesFavoured: [mongoose.Schema.Types.ObjectId] // filed that were favoured by the user, for making the favourite page
});

RegularUserSchema.pre("save", function (next) {
    const user = this;
    if (user.isModified("password")) {
        // generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

RegularUserSchema.statics.findByUsernamePassword = function (
    username,
    password
) {
    const User = this;

    return User.findOne({username: username}).then(user => {
        if (!user) {
            return Promise.reject(); // a rejected promise
        }
        // if the user exists, make sure their password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

const RegularUser = mongoose.model("RegularUser", RegularUserSchema);

module.exports = {RegularUser};
