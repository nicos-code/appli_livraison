// Menu de navigation
export default function Nav() {
    let menuContent = [
        { name: "Accueil", link: "/home" },
        { name: "Panier", link: "/cart" },
        { name: "Commandes", link: "/order" },
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav ml-auto">
                    {menuContent.map((item) => (
                        <NavElement
                            key={item.link}
                            link={item.link}
                            name={item.name}
                        />
                    ))}
                </ul>
                <ul className="navbar-nav">
                    <li>
                        <a className="nav-link" href="/">
                            Connexion
                        </a>
                    </li>
                </ul>
            </div>
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
