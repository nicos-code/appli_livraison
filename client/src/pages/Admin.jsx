import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";

// Page d'accueil
export default function Home() {
    return (
        <>
            <Header />
            <Nav />
            <div className="container">
                <h2>Page d'administration</h2>

                <a className="btn btn-outline-danger mb-3" href="/logas">
                    Connexion à un autre utilisateur
                </a>
                <br />

                <a className="btn btn-outline-danger mb-3" href="/users">
                    Liste de tous les utilisateurs
                </a>
                <br />
            </div>

            <Footer />
        </>
    );
}
