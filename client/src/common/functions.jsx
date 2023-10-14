import axios from "axios";
import { toast } from "react-toastify";

function axiosErrorHandling(error) {
    if (error.response == null) {
        toast.error("Axios: " + error);
        return;
    }
    if (error.response.data == null) {
        toast.error("Axios: " + error.response);
        return;
    }
    if (error.response.data.error == null) {
        toast.error("Axios: " + error.response.data);
        return;
    }

    toast.error("Axios: " + error.response.data.error);
}

export function getJson(url, callback) {
    axios
        .get("http://localhost:3001/api" + url, { withCredentials: true })
        .then((response) => callback(response.data))
        .catch((error) => axiosErrorHandling(error));
}

export function postJson(url, callback = () => {}, json = undefined) {
    axios
        .post("http://localhost:3001/api" + url, json, {
            withCredentials: true,
        })
        .then((reponse) => callback(reponse.data))
        .catch((error) => axiosErrorHandling(error));
}
