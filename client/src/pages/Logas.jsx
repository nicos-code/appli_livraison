import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { postJson } from "../common/functions";
import { toast } from "react-toastify";

// Page d'accueil
export default function Login(props) {
    const formMethods = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        postJson("/auth/logas/email/" + data.email, navigate, () => {
            toast.success("Connexion à un autre utilisateur réussie !");
            navigate("/home");
        });
    };
    return (
        <>
            <Header />
            <div className="container">
                <h2>Connexion en tant qu'un autre utilisateur</h2>
                <form
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                    className="container mb-3"
                >
                    <div className="mb-3">
                        {/*prettier-ignore*/}
                        <label className="form-label" htmlFor="email">Email : </label>
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

                    {/* errors will return when field validation fails  */
                    /* {errors.exampleRequired && <span>This field is required</span>} */}
                    <input
                        type="submit"
                        className="btn btn-danger mb-3"
                        value={"Se connecter en tant que cet utilisateur"}
                    />
                </form>
            </div>

            <Footer />
        </>
    );
}
