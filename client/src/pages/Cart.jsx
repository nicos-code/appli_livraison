import { useState, useEffect } from "react";
import _ from "lodash";

import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";
import { getJson, postJson } from "../common/functions";
import CartProduct from "./composant/CartProduct";
import { useNavigate } from "react-router-dom";

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

// function sumCart() {
//     /* Il faut calculer le prix total de la commande en faisant la somme des "prix_total_[id]" et en l'inscrivant dans "prix_commande" */

//     /* Pour chaque produit du panier, on récupère le prix total et on l'additionne à la somme totale */

//     /* On récupère tous les éléments de classe "cart_product" */
//     const products = document.getElementsByClassName("cart_product_total");

//     /* On initialise la somme totale à 0 */
//     let sum = 0;

//     /* On parcourt tous les éléments de classe "cart_product" */
//     for (let i = 0; i < products.length; i++) {
//         /* On récupère le prix total du produit */
//         const price = products[i].children[4].innerText.split(" ")[3];

//         /* On l'additionne à la somme totale */
//         sum += parseFloat(price);
//         console.log("prix : " + price + ", somme : " + sum);
//     }

//     /* On l'inscrit dans le span "prix_commande" */
//     document.getElementById("prix_commande").innerText = sum + " €";

//     /* On peut aussi utiliser la fonction reduce() */
//     // const products = document.getElementsByClassName("cart_product");
//     // const sum = Array.from(products).reduce((acc, product) => acc + parseFloat(product.children[4].innerText.split(" ")[3]), 0);
//     // document.getElementById("prix_commande").innerText = sum + " €";
// }

function ListCart() {
    // Une fois connecté au back
    const [cart, setData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        refreshList(setData);
    }, []);

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
                    postJson("/cart/", () => {
                        console.log("Commande validée");
                        navigate("/order");
                    })
                }
            >
                Valider la commande
            </button>
        </div>
    );
}

function refreshList(setData) {
    getJson("/cart", setData);
    // sumCart();
}
