const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const productSchema = new Schema({
    _id: ObjectID,
    nom: {
        type: String,
    },
    description: {
        type: String,
    },
    prix: {
        type: Number,
    },
    stock: {
        type: Number,
    },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
