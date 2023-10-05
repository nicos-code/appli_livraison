const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    secondName: {
        type: String,
    },
    adresseNumero: {
        type: Number,
    },
    adresseRue: {
        type: String,
    },
    ville: {
        type: String,
    },
    codePostal: {
        type: String,
    },
    isRoot: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
