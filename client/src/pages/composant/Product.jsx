import { useNavigate } from "react-router-dom";
import { postJson } from "../../common/functions";

export default function Product({
    _id,
    nom,
    description,
    prix,
    stock,
    refreshCallback,
}) {
    const navigate = useNavigate();

    return (
        <p className="offered_product" id={"product_" + _id}>
            {/* Afficher les caractéristiques */}
            <strong>{nom}</strong>
            <br />
            <em>{description}</em>
            <br />
            <span>Prix : {prix} €</span>
            <br />
            <span>Stock : {stock}</span>
            <br />

            {/* ajouter le bouton "ajouter au panier"
                cela va appeler l'api pour ajouter le produit au panier
                post : id et /product/:id
            */}
            <button
                className="btn btn-primary"
                onClick={() =>
                    postJson("/product/id/" + _id, navigate, refreshCallback)
                }
            >
                Ajouter au panier
            </button>
        </p>
    );
}
