const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    gender: {
        type: String,
        require:true
    },
    dob: {
        type: Date,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    },
    cities: [
        {
            type: String
        }
    ]
});

const User = new mongoose.model("User", userSchema);
module.exports = User;