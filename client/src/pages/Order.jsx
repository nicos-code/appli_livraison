import { useState, useEffect } from "react";
import _ from "lodash";

import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";
import { getJson } from "../common/functions";
import CartProduct from "./composant/CartProduct";
import { useNavigate } from "react-router-dom";

// Page du panier
export default function Order() {
    return (
        <>
            <Header />
            <Nav />
            <div className="list_cart container">
                <h2>Historique des commandes</h2>
                <History />
            </div>
            <Footer />
        </>
    );
}

function History() {
    const [orders, setOrders] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getJson("/order", navigate, setOrders);
    }, [navigate]);

    if (orders == null) {
        return <p>Chargement des commandes...</p>;
    }

    if (_.isEmpty(orders)) {
        return <p>Aucune commande effectuée.</p>;
    }

    let count = 1;
    let history = [];
    for (let order of orders) {
        order.totalArticle = 0;
        let products = [];
        for (let productId in order.qteProduit) {
            order.totalArticle += order.qteProduit[productId];
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
                <h3>Commande {count}</h3>
                <table className="table">
                    <tbody>{products}</tbody>
                </table>
                <div className="mb-3">
                    <strong>
                        {order.totalArticle} articles :{" "}
                        <span className="text-danger">{order.prixTotal}</span> €
                    </strong>
                </div>
            </div>
        );
        count++;
    }

    return history;
}
