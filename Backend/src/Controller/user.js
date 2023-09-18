const { json } = require("body-parser");
const User = require("../Model/userModel");
// const Weather = require("../Models/weather");

const signUp = async (req, res) => {
    const { name, gender, dob, email, password } = req.body;
    try {
        const user = new User({
            name: name,
            gender: gender,
            dob: dob,
            email: email,
            password: password
        });
        await user.save();
        res.status(200).json(user);
        console.log(user);
    } catch (error) {
        res.status(400).send({
            message: error.errors,
        });
    }
};

const signIn = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
        };

        const issPasswordValid = await user.comparePassword(password);
        if (!issPasswordValid) {
            res.status(401).json({ message: "Invalid email or password" });
        };

        const auth = user.generateAuthToken();

        res.status(200).json({ auth, user });
    } catch (error) {
        res.status(500).send({
            message: error.errors,
        });
    }
};

/* const weather = async (req, res) => {
    console.log(req.body);
    try{
        const {name, email} = req.body;
        const user = await Weather.findOne({ email });

    }
}; */

const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
        }
        else res.status(200).send(user);
    } catch (error) {
        res.status(500).send({
            message: error.errors,
        });
    }
};

module.exports = { signIn, signUp, getAllUser }