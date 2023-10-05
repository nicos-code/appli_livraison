const express = require("express");
const logger = require("morgan");
const security = require("./security");

const PORT = 3001;
// 31 days

const app = express();

app.use(logger("dev"));

require("dotenv").config();
app.use(security.getSession());

require("./db/db");

app.use(require("./routes"));

app.listen(PORT);
console.log("Express.js server launched!");
