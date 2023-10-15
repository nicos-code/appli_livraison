import { useState, useEffect } from "react";
import _ from "lodash";

import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";
import { getJson, postJson } from "../common/functions";
import CartProduct from "./composant/CartProduct";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Page du panier
export default function Cart() {
    return (
        <>
            <Header />
            <Nav />

            <div className="container">
                <h2>Panier</h2>

                {/* appel à l'api : /api */}

                <ListCart />
            </div>
            <Footer />
        </>
    );
}

function ListCart() {
    // Une fois connecté au back
    const [cart, setCart] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getJson("/cart", navigate, setCart);
    }, [navigate]);

    if (cart == null || cart.qteProduit == null) {
        return <p>Chargement des produits...</p>;
    }

    if (_.isEmpty(cart.qteProduit)) {
        return <p>Le panier est vide.</p>;
    }

    let products = [];
    cart.totalArticle = 0;
    for (let productId in cart.qteProduit) {
        cart.totalArticle += cart.qteProduit[productId];
        products.push(
            <CartProduct
                key={productId}
                productId={productId}
                qte={cart.qteProduit[productId]}
            />
        );
    }

    return (
        <div className="list_cart">
            <table className="table">
                <tbody>{products}</tbody>
            </table>
            <div className="mb-3">
                <strong>
                    {cart.totalArticle} articles.
                    <br />
                    {/*prettier-ignore*/}
                    Prix total de la commande :{" "}
                    <span className="text-danger">{cart.prixTotal}</span> €
                </strong>
            </div>

            <button
                className="col-2 btn btn-primary"
                onClick={() =>
                    postJson("/cart/", navigate, () => {
                        toast.success("Commande validée !");
                        navigate("/order");
                    })
                }
            >
                Valider la commande
            </button>
        </div>
    );
}
