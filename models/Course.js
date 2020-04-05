const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});


const msgSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String
    },
    users: [mongoose.Schema.Types.ObjectId],
    likes: {type: Number, default: 0},
    announcements: [AnnouncementSchema],

    // list of resources that are shared in the class
    resources: [mongoose.Schema.Types.ObjectId],

    // list of messages of the chatroom
    chatroom: [msgSchema]
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

