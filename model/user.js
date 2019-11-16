const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    aadharNo: {
        type: Number,
        required: true,
        unique: true,
        minlength: 12,
        maxlength: 12
    }
})

const model = mongoose.model('user', schema);

module.exports = model;