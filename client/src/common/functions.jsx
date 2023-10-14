import axios from "axios";
import { toast } from "react-toastify";

export function getJson(url, callback) {
    // Fetch
    // const data = null
    // fetch('http://localhost:3001/api/product', {mode: 'cors'})
    // .then((data) => data.json())
    // .then((data) => Object.values(data))
    // .then((data) => setData(data))

    // Axios
    // axios.get('http://localhost:3001/api/product')
    // .then((response) => setData(response.data))
    // .catch((error) => console.error("AXIOS "+error))

    axios
        .get("http://localhost:3001/api" + url, { withCredentials: true })
        .then((response) => callback(response.data))
        .catch((error) => toast.error("Axios: " + error.response.data.error));
}

export function postJson(url, callback = () => {}, json = undefined) {
    axios
        .post("http://localhost:3001/api" + url, json, {
            withCredentials: true,
        })
        .then((reponse) => callback(reponse))
        .catch((error) => toast.error("Axios: " + error.response.data.error));
}
