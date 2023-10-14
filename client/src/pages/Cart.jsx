import { useState, useEffect } from "react";
import _ from "lodash";

import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";
import { getJson, postJson } from "../common/functions";

// Page du panier
export default function Cart() {
    return (
        <>
            <Header />
            <Nav />
            <p>
                <a href="/"> Retour à l'accueil</a>
            </p>
            <p>Voici le panier :</p>

            {/* appel à l'api : /api */}
            <div className="list_cart">
                <ListCart />
            </div>

            <p>
                <strong>
                    Prix total de la commande :{" "}
                    <span id="prix_commande">R U R' U' (sexy move)</span>
                </strong>

                <button
                    onClick={() =>
                        postJson("/cart/", () =>
                            console.log("Commande validée")
                        )
                    }
                >
                    Valider la commande
                </button>
            </p>

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

function refreshList(setData) {
    getJson("/cart", setData);
    // sumCart();
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
            {/* Donner comme id la valeur du champ
        props.id */}
            {/* afficher les caractéristiques */}
            <strong>{product.nom}</strong>
            <br />
            <span>Prix : {product.prix} €</span>
            <br />
            <span>Quantité : {props.qte}</span>
            <br />
            <span>Stock Total : {product.stock}</span>
            <br />
            {/* <span id={"prix_total_" + props._id}>Prix Total : {props.price * props.quantity} €</span> */}
            <span>
                Prix Total :{" "}
                <span className="cart_product_total">
                    {product.prix * props.qte} €
                </span>
            </span>
        </p>
    );
}

function ListCart() {
    // Une fois connecté au back
    const [cart, setData] = useState(null);

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
    for (let productId in cart.qteProduit) {
        products.push(
            <CartProduct
                key={productId}
                productId={productId}
                qte={cart.qteProduit[productId]}
            />
        );
    }

    // const response = fetch("/api/cart");
    // const data = response.json();

    // En attendant, on utilise une string qui est une liste de produits
    //simuler la réponse de l'api avec une string
    //v1 : toutes les infos sont dans la string
    // const dataCart = "[{\"_id\" : 1, \"name\" : \"Banane\", \"price\" : 1.2, \"quantity\" : 5, \"stock\" : 5}, {\"_id\" : 2, \"name\" : \"Pomme\", \"price\" : 1.5, \"quantity\" : 3, \"stock\" : 6}, {\"_id\" : 3, \"name\" : \"Poire\", \"price\" : 1.8, \"quantity\" : 2, \"stock\" : 10}]";

    //v2 : les infos sont dans un objet
    // const dataCart = {
    //     _id: "65200f05865325fb43a20744",
    //     mapProduit: {
    //         "65200f04865325fb43a20738": 14,
    //         "65200f05865325fb43a2073d": 3,
    //     },
    //     valide: false,
    //     __v: 0,
    // };

    // const dataa = "{\"_id\": \"65200f05865325fb43a20744\",\"qteProduit\": {\"65200f04865325fb43a20738\": 14,\"65200f05865325fb43a2073d\": 3}, \"valide\": false, \"__v\": 0}";

    // Convertir la string en objet
    // const obj = JSON.parse(dataCart);

    // const product = obj.map(item => <CartProduct {...item}/>);

    return products;

    // return <PanierProduct _id="1" name="Banane" price="1.2" quantity="5" stock="5" />;
}
