const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const userSchema = new Schema({
    _id: ObjectID,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
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
});

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
