const mongoose = require('mongoose');
const validator = require('validator');


const user = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate: {
            validator(value){
                if (value < 0) {
                    throw new Error("Age should be Positive..!")
                }
            },
            message: props => `'${props.value}' is not a valid age`
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid")
                }
            },
            message: props => `'${props.value}' is not a valid E-mail`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate: {
            validator(value) {
                if (value.toLowerCase().includes('password')){
                    throw new Error('Password not contain \"password\" word');
                }
        },
        message: () => `Check You Password`
        }
    }
});


module.exports = user;

