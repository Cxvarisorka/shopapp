const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createSendToken = (user, statusCode, res) => {
    const token = user.signToken();

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'Lax',
        maxAge: process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    };

    user.password = undefined;

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json(user);
};

const signup = catchAsync(async (req, res, next) => {
    const { fullname, email, password } = req.body;

    const user = await User.create({ fullname, email, password });

    res.status(201).json({ message: "User registered!" });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        return next(new AppError("Credentials is not correct!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid) {
        return next(new AppError("Credentials is not correct!", 400));
    }

    createSendToken(user, 200, res);
});

const logout = catchAsync(async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send();
});

module.exports = { signup, login, logout };