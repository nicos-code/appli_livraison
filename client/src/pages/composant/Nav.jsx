// Menu de navigation
export default function Nav(props) {
    let menuContent = [
        { name: "Accueil", link: "/" },
        { name: "Panier", link: "/cart" },
    ];

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <ul class="navbar-nav">
                {menuContent.map((item) => (
                    <NavElement link={item.link} name={item.name} />
                ))}
            </ul>
        </nav>
    );
}

//element du menu
function NavElement(props) {
    return (
        <li class="nav-item">
            <a class="nav-link" href={props.link}>
                {props.name}
            </a>
        </li>
    );
}
