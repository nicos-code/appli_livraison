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

    return (
        <>
            <Header />
            <Nav />
            <div className="container">
                <h2>Liste des utilisateurs</h2>
                <UsersForm users={users} />
            </div>
            <Footer />
        </>
    );
}

function UsersForm({ users }) {
    return (
        <form className="container mb-3">
            {users.map((user) => (
                <div key={user.email}>
                    <h3>{user.email}</h3>

                    <UserFieldList user={user} />

                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            id="isRoot"
                            type="checkbox"
                            checked={user["isRoot"]}
                            disabled
                        />
                        <label className="form-check-label" htmlFor={"isRoot"}>
                            Est administrateur
                        </label>
                    </div>
                </div>
            ))}
        </form>
    );
}

function UserFieldList({ user }) {
    const fields = [
        { name: "_id", type: "text", label: "Id" },
        { name: "email", type: "email", label: "Email" },
        { name: "password", type: "text", label: "Mot de passe" },
        { name: "firstName", type: "text", label: "Prénom" },
        { name: "secondName", type: "text", label: "Nom" },
        { name: "adresseNumero", type: "number", label: "Numéro" },
        { name: "adresseRue", type: "text", label: "Rue" },
        { name: "ville", type: "text", label: "Ville" },
        { name: "codePostal", type: "text", label: "Code postal" },
    ];

    return fields.map((field) => (
        <div className="mb-3" key={field.name}>
            {/*prettier-ignore*/}
            <label className="form-label" htmlFor={field.name}>{field.label} : </label>
            <input
                className="form-control"
                id={field.name}
                defaultValue={user[field.name]}
                type={field.type}
                disabled
            />
        </div>
    ));
}
