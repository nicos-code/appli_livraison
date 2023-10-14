import Header from "./composant/Header";
import Footer from "./composant/Footer";
import { postJson } from "../common/functions";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Page d'accueil
export default function Auth(props) {
    const formMethods = useForm();

    const navigate = useNavigate();

    const handleResponse = (response) => {
        if (response.status === 200) {
            navigate("/home");
        }
    };

    const onSubmit = (data) => {
        postJson("/auth/login", handleResponse, data);
    };
    return (
        <>
            <Header />
            <h2>Authentification</h2>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                <label htmlFor="email">Email : </label>
                <input
                    id="email"
                    {...formMethods.register("email", { required: true })}
                    placeholder="Email"
                    type="email"
                />
                <br />
                <label htmlFor="password">Mot de passe : </label>
                <input
                    id="password"
                    {...formMethods.register("password", { required: true })}
                    placeholder="Mot de passe"
                    type="password"
                />

                {/* errors will return when field validation fails  */
                /* {errors.exampleRequired && <span>This field is required</span>} */}
                <br />
                <input type="submit" />
            </form>
            <br />
            <br />
            <Footer />
        </>
    );
}
