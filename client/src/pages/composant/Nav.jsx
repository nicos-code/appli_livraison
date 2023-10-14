import { useEffect, useState } from "react";
import { getJson } from "../../common/functions";

// Menu de navigation
export default function Nav() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        refreshSession(setSession);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <PagesMenu session={session} />
                <AuthMenu session={session} />
            </div>
        </nav>
    );
}

function refreshSession(setUser) {
    getJson("/auth/session", setUser);
}

function PagesMenu({ session }) {
    const menuContent = [
        { name: "Accueil", link: "/home" },
        { name: "Panier", link: "/cart" },
        { name: "Commandes", link: "/order" },
    ];

    return (
        <ul className="navbar-nav ml-auto">
            {menuContent.map((item) => (
                <NavElement
                    key={item.link}
                    link={item.link}
                    name={item.name}
                    className="nav-link"
                />
            ))}
        </ul>
    );
}

function AuthMenu({ session }) {
    if (
        session == null ||
        session.userId == null ||
        session.userEmail == null
    ) {
        return (
            <ul className="navbar-nav">
                <NavElement
                    className="btn btn-outline-secondary"
                    name="Connexion"
                    link="/"
                />
                <NavElement
                    className="btn btn-outline-primary"
                    name="Créer un compte"
                    link="/signup"
                />
            </ul>
        );
    } else {
        return (
            <ul className="navbar-nav">
                <NavElement
                    className="nav-brand"
                    name={session.userEmail}
                    link="#"
                />
                <NavElement
                    className="btn btn-outline-secondary"
                    name="Déconnexion"
                    link="/"
                />
            </ul>
        );
    }
}

//element du menu
function NavElement({ name, link, className }) {
    return (
        <li className="nav-item">
            <a className={className} href={link}>
                {name}
            </a>
        </li>
    );
}
