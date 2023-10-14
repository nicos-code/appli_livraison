import { useState, useEffect } from "react";

import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";
import { getJson } from "../common/functions";
import Product from "./composant/Product";

// Page d'accueil
export default function Home() {
    return (
        <>
            <Header />
            <Nav />
            <div className="container">
                <h2>Produits</h2>
                <p>Présentation de nos différents produits :</p>

                <div className="list_product">
                    <ListProducts />
                </div>
            </div>

            <Footer />
        </>
    );
}

function ListProducts() {
    // Une fois connecté au back
    const [products, setProducts] = useState(null);

    useEffect(() => {
        refreshList(setProducts);
    }, []);

    if (products == null) {
        return <p>Chargement des produits...</p>;
    }

    return products.map((product) => (
        <Product
            key={product._id}
            {...product}
            refreshCallback={() => refreshList(setProducts)}
        />
    ));
}

function refreshList(setProducts) {
    getJson("/product/all", setProducts);
}
