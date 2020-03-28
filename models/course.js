const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    users: [mongoose.Schema.Types.ObjectId]
});

CourseSchema.statics.findByCourseName = function (courseName) {
    const Course = this;

    return Course.findOne({name: courseName}).then(course => {
        if (!course) {
            return Promise.reject(); // a rejected promise
        }
        // if the course exists return it
        return new Promise((resolve) => {
            resolve(course);
        });
    });
};

const Course = mongoose.model('Course', CourseSchema);

module.exports = {Course, CourseSchema};
