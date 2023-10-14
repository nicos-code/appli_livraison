import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { postJson } from "../common/functions";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
            <div class="container">
                <h2>Authentification</h2>
                <form
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                    class="container mb-3"
                >
                    <div class="mb-3">
                        <label htmlFor="email">Email : </label>
                        <input
                            class="form-control"
                            id="email"
                            {...formMethods.register("email", {
                                required: true,
                            })}
                            placeholder="Email"
                            type="email"
                        />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="password">Mot de passe : </label>
                        <input
                            class="form-control"
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
                        class="btn btn-primary mb-3"
                        value="Se connecter"
                    />
                </form>
            </div>
            <Footer />
        </>
    );
}
