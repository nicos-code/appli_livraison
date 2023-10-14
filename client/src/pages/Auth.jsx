import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { postJson } from "../common/functions";

// Page d'accueil
export default function Auth(props) {
    const formMethods = useForm();

    const navigate = useNavigate();

    const handleResponse = (response) => {
        if (response.status === 200) {
            navigate("/home");
        } else {
            toast.error("Erreur d'authentification: " + response);
        }
    };

    const onSubmit = (data) => {
        postJson("/auth/login", handleResponse, data);
    };
    return (
        <>
            <Header />
            <div className="container">
                <h2>Authentification</h2>
                <form
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                    className="container mb-3"
                >
                    <div className="mb-3">
                        <label htmlFor="email">Email : </label>
                        <input
                            className="form-control"
                            id="email"
                            {...formMethods.register("email", {
                                required: true,
                            })}
                            placeholder="Email"
                            type="email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Mot de passe : </label>
                        <input
                            className="form-control"
                            id="password"
                            {...formMethods.register("password", {
                                required: true,
                            })}
                            placeholder="Mot de passe"
                            type="password"
                        />
                    </div>

                    {/* errors will return when field validation fails  */
                    /* {errors.exampleRequired && <span>This field is required</span>} */}
                    <input
                        type="submit"
                        className="btn btn-primary mb-3"
                        value="Se connecter"
                    />
                </form>
            </div>
            <Footer />
        </>
    );
}
