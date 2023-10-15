const errorBuilder = (msg, name, status) => {
    let error = new Error(msg);
    error.name = name;
    error.status = status;

    return error;
};

module.exports = { errorBuilder };
