const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const userModel = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new userModel({
    name: "Aditya",
    age: 20
})

me.save().then((data) => {
    console.log(data)
}).catch((e) => {
    console.log(e)
});