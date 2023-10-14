import { useState, useEffect } from "react";
import _ from "lodash";

import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";
import { getJson, postJson } from "../common/functions";

// Page du panier
export default function Order() {
    return (
        <>
            <Header />
            <Nav />
            <p>Voici les commandes :</p>
            <div className="list_cart">
                <History />
            </div>
            <Footer />
        </>
    );
}

function CartProduct(props) {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        getJson("/product/id/" + props.productId, setProduct);
    }, [props.productId]);

    if (product == null) {
        return <p>Chargement du produit...</p>;
    }

    return (
        <p className="cart_product" id={"product_" + props.productId}>
            <strong>{product.nom}</strong>
            <br />
            <span>Prix : {product.prix} €</span>
            <br />
            <span>Quantité : {props.qte}</span>
            <br />
            <span>Stock Total : {product.stock}</span>
            <br />
            <span>
                Prix Total :{" "}
                <span className="cart_product_total">
                    {product.prix * props.qte} €
                </span>
            </span>
        </p>
    );
}

function refreshList(setData) {
    getJson("/order", setData);
}

function History() {
    const [orders, setData] = useState(null);

    useEffect(() => {
        refreshList(setData);
    }, []);

    if (orders == null) {
        return <p>Chargement des commandes...</p>;
    }

    if (_.isEmpty(orders)) {
        return <p>Aucune commande effectuée.</p>;
    }

    let count = 0;
    let history = [];
    for (let order of orders) {
        let products = [];
        for (let productId in order.qteProduit) {
            products.push(
                <CartProduct
                    key={productId}
                    productId={productId}
                    qte={order.qteProduit[productId]}
                />
            );
        }
        history.push(
            <div>
                Commande {count} :{products}
            </div>
        );
        count++;
    }

    return history;
}
