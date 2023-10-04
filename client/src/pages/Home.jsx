import Header from './composant/Header';
import Nav from './composant/Nav';
import Footer from './composant/Footer';

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


            <Footer />
        </>
    );
  }  
