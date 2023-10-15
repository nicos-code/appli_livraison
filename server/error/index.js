const errorMiddleware = (error, _req, res, _next) => {
    if (!error) {
        error = new Error("Unknown error");
        error.status = 500;
    } else if (!error.status) {
        error.status = 400;
    }
    res.status(error.status);
    res.json({
        name: error.name,
        message: error.message,
        status: error.status,
        stacktrace: error.stack,
        raw: error,
    });
};

module.exports = errorMiddleware;
