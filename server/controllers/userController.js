const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const asyncFunction = require("../utils/error");
const User = require("../db/model/userSchema");

const jwtSecretKey = process.env.secretKey;

// Handle sign up
const handleSignup = asyncFunction(async (req, res) => {
    const user = req.body.user;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = await User.create({...user, password: hashedPassword});

    const payload = {
        name: newUser.name,
        email: newUser.email,
        _id: newUser._id,
    };

    const token = jwt.sign(payload, jwtSecretKey, {expiresIn: "1h"});
    console.log(token);

    res.status(200).json({
        message: "User registered and Logged in successfully",
        token,
        user: payload,
    });
});

// handle Sign In
const handleSignin = asyncFunction(async (req, res) => {
    const user = req.body?.user;

    console.log(user);
    if (!user || !user.email || !user.password) {
        res.status(400).json({
            message: "Please give all the details!",
        });
        return;
    }

    const {email, password} = user;

    const dbUser = await User.findOne({email});
    if (!dbUser) {
        return res.status(400).json({
            message: "User not Registered",
        });
    }

    const isPasswordValid = bcrypt.compareSync(password, dbUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Incorrect email or password",
        });
    }

    const payload = {
        name: dbUser.name,
        email: dbUser.email,
        _id: dbUser._id,
    };

    const token = jwt.sign(payload, jwtSecretKey, {expiresIn: "1h"});
    console.log(token);

    res.status(200).json({
        message: "User Logged in successfully",
        token,
        user: payload,
    });
});

module.exports = {
    handleSignin,
    handleSignup,
};
