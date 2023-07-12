// ./middleware/auth.js

// Middleware to check if user is logged in
export const checkAuth = (req, res, next) => {
    if (!req.session.user) {
        req.isVerified = false;
    } else {
        req.isVerified = req.session.user.isVerified;
    }
    next();
};
