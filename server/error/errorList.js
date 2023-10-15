const { errorBuilder: eb } = require("./errorBuilder");

// The parameters are in this order: errorBuilder(msg, name, status)

const hashError = (msg = "Erreur lors du hachage du mot de passe") =>
    eb(msg, "hashError", 500);

const credentialError = (msg = "Email et/ou mot de passe incorrect(s)") =>
    eb(msg, "credentialError", 401);

const missingCredentialError = () =>
    credentialError("Aucun email et/ou aucun mot de passe n'a été donné");

const doesntExistError = (object = "object") =>
    eb(object + " n'exite pas", "doesntExistError", 401);

const alreadyExistsError = (object = "object") =>
    eb(object + " existe déjà", "alreadyExistsError", 401);

const notLoggedInError = () =>
    eb("L'utilisateur n'est pas connecté", "notLoggedInError", 401);

const notAdminError = () =>
    eb("L'utilisateur n'est pas un administrateur", "notAdminError", 403);

const sessionNotCorrespondingError = () =>
    eb(
        "Il n'est pas possible d'accéder aux ressources d'un autre utilisateur",
        "sessionNotCorrespondingError",
        403
    );

const stockError = (msg = "Stock épuisé") => eb(msg, "stockError", 403);

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
