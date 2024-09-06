const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    phone: {
        type: String,
        required: [true, 'password is required']
    },
    password: {
        type: String,
        default: '123456'
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
});
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;