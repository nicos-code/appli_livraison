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
            <a href='/'> Retour à l'accueil</a>
            </p>
            <p>
                Voici le panier :
            </p>
            <Footer />
        </>
    );
  }  

