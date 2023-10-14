import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";
import { useState, useEffect } from "react";
import { getJson, postJson } from "../common/functions";

// Page d'accueil
export default function Home(props) {
    return (
        <>
            <Header />
            <Nav />
            <p>
                <a href="/cart"> Voir le panier</a>
            </p>
            <p>Présentation de nos différents produits :</p>
            {/* appel à l'api : /api
    produits : /api/product[/:id]

    Permet de récupérer les produits de la base de données
*/}
            <div className="list_product">
                <ListProduct />
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
                onClick={() => getJson("/product/id/" + props._id, console.log)}
            >
                Ajouter au panier
            </button>
        </p>
    );
}

function ListProduct() {
    // Une fois connecté au back
    const [data, setData] = useState(null);

    useEffect(() => {
        getJson("/product/all", setData);
    }, []);

    if (data == null) {
        return <p>Chargement des produits...</p>;
    }

    const product = data.map((item) => <Product {...item} />);

    // En attendant, on utilise une string qui est une liste de produits
    //simuler la réponse de l'api avec une string
    // nom des champs : _id, nom, description, prix, stock
    // const data = "[{\"_id\" : 1, \"nom\" : \"Banane\", \"description\" : \"Fruit jaune\", \"prix\" : 1.2, \"stock\" : 5}, {\"_id\" : 2, \"nom\" : \"Pomme\", \"description\" : \"Fruit rouge\", \"prix\" : 1.5, \"stock\" : 5}, {\"_id\" : 3, \"nom\" : \"Poire\", \"description\" : \"Fruit vert\", \"prix\" : 1.8, \"stock\" : 5}]";

    // const obj = JSON.parse(data);//Convertir la string en objet
    // const product = obj.map(item => Product(item));

    //produit de test
    // const product = <Product nom="Banane" description="Fruit jaune" prix="1.2" stock="5" />;

    return product;
}
