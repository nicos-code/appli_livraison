import axios from 'axios';

export function getJson(url, callback)
{
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

    axios.get("http://localhost:3001/api"+url)
    .then((response) => callback(response.data))
    .catch((error) => console.error("AXIOS "+error))
}

export function postJson(url, callback=() => {}, json=undefined)
{
    axios.post("http://localhost:3001/api"+url, json)
    .then((reponse) => callback(reponse))
}