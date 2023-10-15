const { errorBuilder: eb } = require("./errorBuilder");

// The parameters are in this order: errorBuilder(msg, name, status)

const hashError = (msg = "Error when hashing password") =>
    eb(msg, "hashError", 500);

const credentialError = (msg = "Wrong email or password") =>
    eb(msg, "credentialError", 401);

const missingCredentialError = () =>
    credentialError("No email or no password provided");

const doesntExistError = (object = "object") =>
    eb(object + " doesn't exist", "doesntExistError", 401);

const alreadyExistsError = (object = "object") =>
    eb(object + " already exists", "alreadyExistsError", 401);

const notLoggedInError = () =>
    eb("User is not logged in", "notLoggedInError", 401);

const notAdminError = () => eb("User is not admin", "notAdminError", 403);

const sessionNotCorrespondingError = () =>
    eb(
        "Cannot access resources of other users (or not logged in)",
        "sessionNotCorrespondingError",
        403
    );

const stockError = (msg = "Out of stock") => eb(msg, "stockError", 403);

module.exports = {
    hashError,
    credentialError,
    missingCredentialError,
    doesntExistError,
    alreadyExistsError,
    notLoggedInError,
    notAdminError,
    sessionNotCorrespondingError,
    stockError,
};
