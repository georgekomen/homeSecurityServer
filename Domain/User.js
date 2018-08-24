const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    phonenumber: {type: String, required: true},
    country: {type: String, required: true},
    location: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);