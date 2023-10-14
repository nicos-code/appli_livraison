import { useState, useEffect } from "react";
import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";
import { getJson, postJson } from "../common/functions";

// Page d'accueil
export default function Home(props) {
    return (
        <>
            <Header />
            <Nav />
            <div className="container">
                <h2>Produits</h2>
                <p>Présentation de nos différents produits :</p>
                {/* appel à l'api : /api
        produits : /api/product[/:id]

        Permet de récupérer les produits de la base de données
    */}
                <div className="list_product">
                    <ListProduct />
                </div>
            </div>

            <Footer />
        </>
    );
}

function Product(props) {
    // const [count, setCount] = useState(0);

    // useEffect(() => {
    //     document.title = `Vous avez cliqué ${count} fois`;
    // });

    return (
        <p className="offered_product" id={"product_" + props._id}>
            {/* Donner comme id la valeur du champ props.id */}
            {/* afficher les caractéristiques */}
            <strong>{props.nom}</strong>
            <br />
            <em>{props.description}</em>
            <br />
            <span>Prix : {props.prix} €</span>
            <br />
            <span>Stock : {props.stock}</span>
            <br />

            {/* ajouter le bouton "ajouter au panier"
                cela va appeler l'api pour ajouter le produit au panier
                */}

            {/* post : id et /product/:id */}
            <button
                className="btn btn-primary"
                onClick={() =>
                    postJson("/product/id/" + props._id, () =>
                        refreshList(props.setProducts)
                    )
                }
            >
                Ajouter au panier
            </button>
        </p>
    );
}

function refreshList(setData) {
    getJson("/product/all", setData);
}

function ListProduct() {
    // Une fois connecté au back
    const [products, setProducts] = useState(null);

    useEffect(() => {
        refreshList(setProducts);
    }, []);

    if (products == null) {
        return <p>Chargement des produits...</p>;
    }

    // En attendant, on utilise une string qui est une liste de produits
    //simuler la réponse de l'api avec une string
    // nom des champs : _id, nom, description, prix, stock
    // const data = "[{\"_id\" : 1, \"nom\" : \"Banane\", \"description\" : \"Fruit jaune\", \"prix\" : 1.2, \"stock\" : 5}, {\"_id\" : 2, \"nom\" : \"Pomme\", \"description\" : \"Fruit rouge\", \"prix\" : 1.5, \"stock\" : 5}, {\"_id\" : 3, \"nom\" : \"Poire\", \"description\" : \"Fruit vert\", \"prix\" : 1.8, \"stock\" : 5}]";

    // const obj = JSON.parse(data);//Convertir la string en objet
    // const product = obj.map(item => Product(item));

    //produit de test
    // const product = <Product nom="Banane" description="Fruit jaune" prix="1.2" stock="5" />;

    return products.map((product) => (
        <Product key={product._id} {...product} setData={setProducts} />
    ));
}
