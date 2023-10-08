const productModel = require("../db/product");
const cartModel = require("../db/cart");

const getAllProducts = (req, res, next) => {
    productModel
        .find({})
        .then((products) => {
            res.json(products);
        })
        .catch((error) => {
            return next(error);
        });
};

const getProduct = (req, res, next) => {
    productModel
        .findById(req.params.id)
        .then((product) => {
            res.json(product);
        })
        .catch((error) => {
            return next(error);
        });
};

// Ajout au panier
const grabProduct = async (req, res, next) => {
    // TODO: catch + check if stock > 0
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const product = await productModel.findByIdAndUpdate(
        req.params.id,
        { $inc: { stock: -1 } },
        { new: true }
    );

    const cart = await cartModel.findById(req.session.userId);

    console.log("cart: ", cart);
    qteProduit = cart.qteProduit;
    console.log("qteProduit: ", qteProduit);

    //prettier-ignore
    qteProduit.set(
        product._id,
        qteProduit.has(product._id.toString()) ? qteProduit.get(product.id.toString()) + 1 : 1
    );

    await cart.save();

    res.json(cart);
};

module.exports = { getAllProducts, getProduct, grabProduct };
