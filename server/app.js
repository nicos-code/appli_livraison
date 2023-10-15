const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const security = require("./security");

const PORT = 3001;

const CORS_OPTIONS = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
};

const app = express();

app.use(cors(CORS_OPTIONS));

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
app.use(security.getSession());

require("./db/db");

app.use(require("./routes"));

app.use(require("./error"));

app.listen(PORT);
console.log("Express.js server launched!");
