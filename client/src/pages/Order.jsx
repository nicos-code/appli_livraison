import { useState, useEffect } from "react";
import _ from "lodash";

import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";
import { getJson } from "../common/functions";
import CartProduct from "./composant/CartProduct";

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

function refreshList(setData) {
    getJson("/order", setData);
}
