const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    // whenever a new tuple is generated, a tuple id("_id") can be used to identify the file get the path for downloading

    // file name
    name: {
        type: String,
        required: true
    },
    // file type
    type: {
        type: String,
        required: true
    },

    // file size
    size: {
        type: String,
        required: true
    },

    // date when this file was uploaded
    date: {
        type: Date,
        required: true
    },

    // which course this file was uploaded to
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});


const File = mongoose.model('File', FileSchema);

module.exports = {File, FileSchema};
