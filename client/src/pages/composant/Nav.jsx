import { useEffect, useState } from "react";
import { getJson } from "../../common/functions";
import { useNavigate } from "react-router-dom";

// Menu de navigation
export default function Nav() {
    const [session, setSession] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getJson("/auth/session", navigate, setSession);
    }, [navigate]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <PagesMenu session={session} />
                <AuthMenu session={session} />
            </div>
        </nav>
    );
}

function PagesMenu({ session }) {
    let menuContent = [{ name: "Accueil", link: "/home" }];

    if (
        session != null &&
        session.userId != null &&
        session.userEmail != null
    ) {
        menuContent.push({ name: "Panier", link: "/cart" });
        menuContent.push({ name: "Commandes", link: "/order" });

        if (session.userIsRoot) {
            menuContent.push({
                name: "Administration",
                link: "/admin",
            });
        }
    }

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
    }

    return (
        <ul className="navbar-nav">
            <NavElement
                className="nav-brand"
                name={session.userEmail}
                link="/user"
            />
            <NavElement
                className="btn btn-outline-secondary"
                name="Déconnexion"
                link="/logout"
            />
        </ul>
    );
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
