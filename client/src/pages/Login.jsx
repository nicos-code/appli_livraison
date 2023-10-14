import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { postJson } from "../common/functions";
import LoginPassForm from "./composant/LoginPassForm";

// Page d'accueil
export default function Auth(props) {
    const formMethods = useForm();

    const navigate = useNavigate();

    const handleResponse = (response) => {
        if (response.status === 200) {
            navigate("/home");
        } else {
            toast.error("Erreur d'authentification: " + response);
        }
    };

    const onSubmit = (data) => {
        postJson("/auth/login", handleResponse, data);
    };
    return (
        <>
            <Header />
            <div className="container">
                <h2>Connexion</h2>
                <LoginPassForm
                    formMethods={formMethods}
                    onSubmit={onSubmit}
                    buttonText="Se connecter"
                />

                <h2>Vous n'avez pas de compte ?</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/signup")}
                >
                    Créer un compte
                </button>
            </div>

            <Footer />
        </>
    );
}
