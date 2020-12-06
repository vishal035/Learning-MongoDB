const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate: {
            validator(value) {
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
        unique: true,
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
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password not contain \"password\" word');
                }
            },
            message: () => `Check You Password`
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({
        _id: user._id.toString()
    }, 'thisismysceret')

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new Error("User not found by the provided credentials")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("User not found by the provided credentials")
    }

    return user
}

//Hash the user password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    console.log("Just Before saving users");

    next()
})

const User = mongoose.model('User', userSchema);


module.exports = User;