const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const orderSchema = new Schema({
    user: {
        type: ObjectID,
        ref: "User",
    },
    qteProduit: {
        type: Map, // of objectid of ref product
        of: Number,
        default: {},
    },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
