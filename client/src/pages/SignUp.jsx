import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { postJson } from "../common/functions";
import LoginPassForm from "./composant/LoginPassForm";

// Page d'accueil
export default function SignUp() {
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
        postJson("/auth/signup", handleResponse, data);
    };
    return (
        <>
            <Header />
            <div className="container">
                <h2>Créer un nouveau compte</h2>
                <LoginPassForm
                    formMethods={formMethods}
                    onSubmit={onSubmit}
                    buttonText="Créer le compte"
                />

                <h2>Vous avez déjà un compte ?</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                >
                    Se connecter
                </button>
            </div>
            <Footer />
        </>
    );
}
