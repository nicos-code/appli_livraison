import { useEffect, useState } from "react";
import { deleteJson, getJson } from "../../common/functions";
import { useNavigate } from "react-router-dom";

export default function CartProduct({
    productId,
    qte,
    isInCart,
    refreshCallback,
}) {
    const [product, setProduct] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getJson("/product/id/" + productId, navigate, setProduct);
    }, [productId, navigate]);

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

            {isInCart && (
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() =>
                            deleteJson(
                                "/product/id/" + productId,
                                navigate,
                                refreshCallback
                            )
                        }
                    >
                        Supprimer
                    </button>
                </td>
            )}
        </tr>
    );
}
