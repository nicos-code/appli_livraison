import Header from './composant/Header';
import Nav from './composant/Nav';
import Footer from './composant/Footer';

// Page du panier
export default function Panier(props) {
    return (
        <>
            <Header />
            <Nav />
            <p>
            <a href='/'> Retour à l'accueil</a>
            </p>
            <p>
                Voici le panier :
            </p>

            {/* appel à l'api : /api */}
            <div className='list_panier'>
                {getPanier()}
            </div>

            <p>
                <strong>Prix total de la commande : <span id="prix_commande">R U R' U' (sexy move)</span></strong>
            </p>

            <Footer />
        </>
    );
}  

function PanierProduct(props) {
    // const [count, setCount] = useState(0);

    // useEffect(() => {
    //     document.title = `Vous avez cliqué ${count} fois`;
    // });

    return (
        <>
           {/* Donner comme id la valeur du champ 
           props.id */}
            <p className='panier_product' id={"product_" + props._id} >
                {/* afficher les caractéristiques */}
                <strong>{props.name}</strong><br/>
                <span>Prix : {props.price} €</span><br/>
                <span>Quantité : {props.quantity}</span><br/>
                <span>Stock Total : {props.stock}</span><br/>
                <span id={"prix_total_" + props._id}>Prix Total : {props.price * props.quantity} €</span>

            </p>
        </>
    );
}

function getPanier()
{
    console.log("getPanier");
    // Une fois connecté au back
    // const response = fetch("/api/panier");
    // const data = response.json();

    // En attendant, on utilise une string qui est une liste de produits 
    //simuler la réponse de l'api avec une string
    const data = "[{\"_id\" : 1, \"name\" : \"Banane\", \"price\" : 1.2, \"quantity\" : 5, \"stock\" : 5}, {\"_id\" : 2, \"name\" : \"Pomme\", \"price\" : 1.5, \"quantity\" : 3, \"stock\" : 6}, {\"_id\" : 3, \"name\" : \"Poire\", \"price\" : 1.8, \"quantity\" : 2, \"stock\" : 10}]";

    //Convertir la string en objet
    const obj = JSON.parse(data);

    const product = obj.map(item => PanierProduct(item));

    return product;

    // return <PanierProduct _id="1" name="Banane" price="1.2" quantity="5" stock="5" />;
}
