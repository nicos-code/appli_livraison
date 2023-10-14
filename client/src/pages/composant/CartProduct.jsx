import { useEffect, useState } from "react";
import { getJson } from "../../common/functions";

export default function CartProduct({ productId, qte }) {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        getJson("/product/id/" + productId, setProduct);
    }, [productId]);

    if (product == null) {
        return <p>Chargement du produit...</p>;
    }

    return (
        <p className="cart_product" id={"product_" + productId}>
            {/* Afficher les caractéristiques */}
            <strong>{product.nom}</strong>
            <br />
            <span>Prix : {product.prix} €</span>
            <br />
            <span>Quantité : {qte}</span>
            <br />
            <span>Stock Total : {product.stock}</span>
            <br />
            <span>
                Prix Total :{" "}
                <span className="cart_product_total">
                    {product.prix * qte} €
                </span>
            </span>
        </p>
    );
}
