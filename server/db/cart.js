const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const cartSchema = new Schema({
    _id: {
        type: ObjectID,
        ref: "User",
    },
    listeProduit: {
        type: [ObjectID],
        ref: "Product",
        default: [],
    },
    valide: {
        type: Boolean,
        default: false,
    },
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
