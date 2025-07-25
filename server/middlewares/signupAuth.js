const User = require("../db/model/userSchema");

const signUpAuth = async (req, res, next) => {
    const user = req.body?.user;

    if (!user || !user.name || !user.email || !user.password) {
        res.status(400).json({
            message: "Please give all the details!",
        });
        return;
    }

    const {email} = user;
    const dbUser = await User.findOne({email});

    if (dbUser) {
        res.status(400).json({
            message: "user is already register, Please login!",
        });
        return;
    }
    next();
};

module.exports = signUpAuth;
