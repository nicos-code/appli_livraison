const checkIfLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        return [
            false,
            res.status(401).json({
                status: 401,
                error: "Unauthorized: sessionId is not set",
            }),
        ];
    }
    return [true, null];
};

module.exports = { checkIfLoggedIn };
