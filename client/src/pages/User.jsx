import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { getJson, postJson } from "../common/functions";
import Nav from "./composant/Nav";

// Page d'accueil
export default function User() {
    const formMethods = useForm();

    const navigate = useNavigate();

    const handleResponse = () => {
        navigate("/home");
    };

    const onSubmit = (data) => {
        postJson("/user", handleResponse, data);
    };

    useEffect(() => {
        getJson("/user", (user) => formMethods.reset(user));
    }, [formMethods]);

    const fields = [
        { name: "email", type: "email", label: "Email" },
        { name: "password", type: "password", label: "Mot de passe" },
        { name: "firstName", type: "text", label: "Prénom" },
        { name: "secondName", type: "text", label: "Nom" },
        { name: "adresseNumero", type: "number", label: "Numéro" },
        { name: "adresseRue", type: "text", label: "Rue" },
        { name: "ville", type: "text", label: "Ville" },
        { name: "codePostal", type: "text", label: "Code postal" },
    ];

    return (
        <>
            <Header />
            <Nav />
            <div className="container">
                <h2>Modifier vos informations</h2>
                <form
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                    className="container mb-3"
                >
                    {fields.map((field) => (
                        <div className="mb-3" key={field.name}>
                            <label htmlFor={field.key}>{field.label} : </label>
                            <input
                                className="form-control"
                                id={field.key}
                                {...formMethods.register(field.name)}
                                placeholder={field.label}
                                type={field.type}
                            />
                        </div>
                    ))}

                    {/* errors will return when field validation fails  */
                    /* {errors.exampleRequired && <span>This field is required</span>} */}
                    <input
                        type="submit"
                        className="btn btn-primary mb-3"
                        value="Enregistrer"
                    />
                </form>
            </div>
            <Footer />
        </>
    );
}
