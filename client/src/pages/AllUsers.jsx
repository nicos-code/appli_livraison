import { useEffect, useState } from "react";

import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { getJson } from "../common/functions";
import Nav from "./composant/Nav";

// Page d'accueil
export default function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getJson("/user/all", (users) => setUsers(users));
    }, []);

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
                <h2>Liste des utilisateurs</h2>
                <form className="container mb-3">
                    {users.map((user) => (
                        <div key={user.email}>
                            <h3>{user.email}</h3>
                            {fields.map((field) => (
                                <div className="mb-3" key={field.name}>
                                    <label htmlFor={field.key}>
                                        {field.label} :{" "}
                                    </label>
                                    <input
                                        className="form-control"
                                        id={field.key}
                                        defaultValue={user[field.name]}
                                        placeholder={field.label}
                                        type={field.type}
                                        disabled
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </form>
            </div>
            <Footer />
        </>
    );
}
