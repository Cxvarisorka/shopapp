const AppError = require("../utils/appError");

const allowedTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError("You dont have permission!", 401))
        }

        next();
    }
}

module.exports = allowedTo;