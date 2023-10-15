import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { postJson } from "../common/functions";
import LoginPassForm from "./composant/LoginPassForm";

// Page d'accueil
export default function SignUp() {
    const formMethods = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        postJson("/auth/signup", navigate, () => navigate("/home"), data);
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
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/")}
                >
                    Se connecter
                </button>
            </div>
            <Footer />
        </>
    );
}
