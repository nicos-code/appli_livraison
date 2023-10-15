import axios from "axios";
import { toast } from "react-toastify";

const backHost = process.env.BACK_HOST || "localhost";
const hostBaseUrl = "http://" + backHost + ":3001/api";

function standardErrorHandling({ name, message, status }, navigate) {
    toast.error(name + ": " + message);

    if (
        name === "notLoggedInError" ||
        name === "notAdminError" ||
        name === "sessionNotCorrespondingError"
    ) {
        navigate("/login");
    }
}

function axiosErrorHandling(error, navigate) {
    if (error.response == null) {
        toast.error("Axios: " + error);
        return;
    }
    if (error.response.data == null) {
        toast.error("Axios: " + error.response);
        return;
    }
    if (
        error.response.data.name != null &&
        error.response.data.message != null &&
        error.response.data.status != null
    ) {
        standardErrorHandling(error.response.data, navigate);
        return;
    }
    if (error.response.data.error != null) {
        toast.error("Axios: " + error.response.data.error);
        return;
    }

    toast.error("Axios: " + error.response.data.error);
}

export function getJson(url, navigate, callback) {
    axios
        .get(hostBaseUrl + url, { withCredentials: true })
        .then((response) => callback(response.data))
        .catch((error) => axiosErrorHandling(error, navigate));
}

export function postJson(url, navigate, callback, json) {
    axios
        .post(hostBaseUrl + url, json, {
            withCredentials: true,
        })
        .then((reponse) => callback(reponse.data))
        .catch((error) => axiosErrorHandling(error, navigate));
}
