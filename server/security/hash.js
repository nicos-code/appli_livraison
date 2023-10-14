const bcrypt = require("bcrypt");
const SALT_ROUNDS = 11;

const generateHash = async (password) => {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        return null;
    }
};

const compareHash = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        return false; //TODO: This may not be safe if the logging includes the password
    }
};

module.exports = { generateHash, compareHash };
