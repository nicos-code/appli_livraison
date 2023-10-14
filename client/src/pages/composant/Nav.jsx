// Menu de navigation
export default function Nav() {
    let menuContent = [
        { name: "Accueil", link: "/home" },
        { name: "Panier", link: "/cart" },
        { name: "Connexion", link: "/" },
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
                {menuContent.map((item) => (
                    <NavElement
                        key={item.link}
                        link={item.link}
                        name={item.name}
                    />
                ))}
            </ul>
        </nav>
    );
}

//element du menu
function NavElement(props) {
    return (
        <li className="nav-item">
            <a className="nav-link" href={props.link}>
                {props.name}
            </a>
        </li>
    );
}
