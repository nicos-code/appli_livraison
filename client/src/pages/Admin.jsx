import Header from "./composant/Header";
import Nav from "./composant/Nav";
import Footer from "./composant/Footer";
import { Link } from "react-router-dom";

// Page d'accueil
export default function Home() {
    return (
        <>
            <Header />
            <Nav />
            <div className="container">
                <h2>Page d'administration</h2>

                <Link className="btn btn-outline-danger mb-3" to="/logas">
                    Connexion à un autre utilisateur
                </Link>
                <br />

                <Link className="btn btn-outline-danger mb-3" to="/users">
                    Liste de tous les utilisateurs
                </Link>
                <br />
            </div>

            <Footer />
        </>
    );
}
