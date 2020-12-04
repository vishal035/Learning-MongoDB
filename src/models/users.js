const mongoose = require('mongoose');
const validator = require('validator');


const user = mongoose.model('User', {
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        validator(value) {
            if (value < 0) {
                throw new Error("Age should be Positive..!")
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validator(value) {
                if (value.toLowerCase().includes('password')){
                    throw new Error('Password not contain "password" word');
                }
        }
    }
});


module.exports = user;

