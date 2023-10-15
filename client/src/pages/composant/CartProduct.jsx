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
        <tr className="cart_product" id={"product_" + productId}>
            {/* Afficher les caractéristiques */}
            <td>
                <strong>{product.nom}</strong>
            </td>

            <td>
                <span>Prix : {product.prix} €</span>
            </td>

            <td>
                <span>Quantité : {qte}</span>
            </td>

            <td>
                <span>Stock Total : {product.stock}</span>
            </td>

            <td>
                <span>
                    Prix Total :{" "}
                    <span className="cart_product_total">
                        {product.prix * qte} €
                    </span>
                </span>
            </td>
        </tr>
    );
}
