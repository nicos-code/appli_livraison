const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("<a href=\"lien\"> Hello world!</a>");
})

app.get('/lien', (req, res) => {
    res.send("<a href=\"..\">Lien </a>")
})

app.listen(3001);
console.log("Express.js server launched!")
