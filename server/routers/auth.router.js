const express = require('express');

// Controllers for auth
const { signup, login, logout } = require('../controllers/auth.controller');
const protect = require('../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.post('/auto-login', protect, async (req, res, next) => {
    req.user.password = undefined;
    res.status(200).json(req.user);
});

module.exports = authRouter;