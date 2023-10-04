import Header from './composant/Header';
import Nav from './composant/Nav';
import Footer from './composant/Footer';
import { useState, useEffect } from 'react';

// Page d'accueil
export default function Home(props) {
    return (
        <>
            <Header />
            <Nav />
            <p>
            <a href='/panier'> Voir le panier</a>
            </p>
            <p>
                Présentation de nos différents produits :
            </p>
{/* appel à l'api : /api 
    produits : /api/product[/:id]

    Permet de récupérer les produits de la base de données
*/}
            <div className='list_product'>
                {getProduct()}
            </div>


            <Footer />
        </>
    );
  }  

  function Product(props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Vous avez cliqué ${count} fois`;
    });

    return (
        <>
           {/* Donner comme id la valeur du champ 
           props.id */}
            {/* idée à ajuster: */}
            <p className='offered_product' id="product_{props._id}" >
                {/* afficher les caractéristiques */}
                <strong>{props.name}</strong><br/>
                <em>{props.description}</em><br/>
                <span>Prix : {props.price} €</span><br/>
                <span>Stock : {props.stock}</span><br/>

                {/* ajouter le bouton "ajouter au panier"
                cela va appeler l'api pour ajouter le produit au panier
                */}

                <button onClick={() => setCount(count + 1)}>Ajouter au panier</button>
            </p>
        </>
    );
}


function getProduct()
{
    console.log("getProduct");
    // Une fois connecté au back
    // const response = fetch("/api/product");
    // const data = response.json();

    // En attendant, on utilise une string qui est une liste de produits 
    //simuler la réponse de l'api avec une string
    const data = "[{\"_id\" : 1, \"name\" : \"Banane\", \"description\" : \"Fruit jaune\", \"price\" : 1.2, \"stock\" : 5}, {\"_id\" : 2, \"name\" : \"Pomme\", \"description\" : \"Fruit rouge\", \"price\" : 1.5, \"stock\" : 5}, {\"_id\" : 3, \"name\" : \"Poire\", \"description\" : \"Fruit vert\", \"price\" : 1.8, \"stock\" : 5}]";

    //Convertir la string en objet
    const obj = JSON.parse(data);

    const product = obj.map(item => Product(item));

    //produit de test
    // const product = <Product name="Banane" description="Fruit jaune" price="1.2" stock="5" />;

    return product;
}



//   async function getData(url)
//   {
//       const response = await fetch(url);
//       const data = await response.json();
  
//       const items = Object.values(data.data);
  
//       const names = items.map(item => item.name);
  
//       // return names;
//       return names.filter(name => name.startsWith('B'));
//   }
