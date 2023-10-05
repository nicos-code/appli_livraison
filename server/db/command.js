const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const commandSchema = new Schema({
    user: {
        type: ObjectID,
        ref: "User",
    },
    listeProduit: {
        type: [ObjectID],
        ref: "Product",
    },
    valide: {
        type: Boolean,
    },
});

const commandModel = mongoose.model("Command", commandSchema);

module.exports = commandModel;
