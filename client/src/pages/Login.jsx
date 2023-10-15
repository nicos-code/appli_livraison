import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { postJson } from "../common/functions";
import LoginPassForm from "./composant/LoginPassForm";
import Nav from "./composant/Nav";

// Page d'accueil
export default function Login() {
    const formMethods = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        postJson("/auth/login", navigate, () => navigate("/home"), data);
    };
    return (
        <>
            <Header />
            <Nav />
            <div className="container">
                <h2>Connexion</h2>
                <LoginPassForm
                    formMethods={formMethods}
                    onSubmit={onSubmit}
                    buttonText="Se connecter"
                />

                <h2>Vous n'avez pas de compte ?</h2>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/signup")}
                >
                    Créer un compte
                </button>
            </div>

            <Footer />
        </>
    );
}
