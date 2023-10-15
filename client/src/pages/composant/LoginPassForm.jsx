export default function LoginPassForm({ formMethods, onSubmit, buttonText }) {
    return (
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
            <div className="mb-3">
                {/*prettier-ignore*/}
                <label className="form-label" htmlFor="password">Mot de passe : </label>
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
                value={buttonText}
            />
        </form>
    );
}
