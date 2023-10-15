import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { postJson } from "../common/functions";
import { toast } from "react-toastify";

// Page d'accueil
export default function Logout(props) {
    const navigate = useNavigate();

    useEffect(() => {
        postJson("/auth/logout", navigate, () => {
            toast.success("Déconnexion réussie !");
            navigate("/home");
        });
    }, [navigate]);

    return (
        <>
            <Header />
            <div className="container">
                <h2>Déconnexion en cours...</h2>
            </div>
            <Footer />
        </>
    );
}
