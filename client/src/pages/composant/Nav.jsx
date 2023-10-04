// Menu de navigation
export default function Nav(props) {
    let menuContent = [
      {name: "Accueil", link: "/"},
      {name: "Panier", link: "/panier"},
      // {name: "Piano", link: "/piano"},
    ];
  
    return(
    <nav>
      <ul>
        {menuContent.map(item => <NavElement link={item.link} name={item.name}/>)}
      </ul>
    </nav>
    );
}

//element du menu
function NavElement(props) {
    return (
      <li>
        <a href={props.link}>{props.name}</a>
      </li>
    );
  
}

