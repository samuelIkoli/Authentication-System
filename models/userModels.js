const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:['admin','user','manager','staff'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', UserSchema);