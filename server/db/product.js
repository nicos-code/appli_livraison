const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const productSchema = new Schema({
    nom: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    prix: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
