const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const cartSchema = new Schema({
    _id: {
        type: ObjectID,
        ref: "User",
    },
    qteProduit: {
        type: Map, // of objectid of ref product
        of: Number,
        default: {},
    },
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
