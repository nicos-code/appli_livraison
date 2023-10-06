// const dotenv = require("dotenv");
const crypto = require("crypto");
const session = require("express-session");
// const MongoStore = require("connect-mongo");
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 31;

const SESSION_SECRET =
    "7ac2b200a047becdc0e19085c0c18cb5af6b21c4fde846faee3c6a877386ce91cdda3d65ca87efd513161edf1f9151e81841ac480f3d3b13d1b2bc594bd8d2f7";

function getSession() {
    return session({
        name: "sessionId",
        secret: getOrCreateSecret(),
        cookie: { secure: true, maxAge: COOKIE_MAX_AGE },
        resave: false,
        saveUninitialized: false,
        // store: MongoStore.create({
        //     mongoUrl: 'mongodb://localhost/'
        // })
    });
}

function getOrCreateSecret() {
    let secret = SESSION_SECRET; // Will be change to access a file/an env variable
    if (secret === undefined) {
        secret = crypto.randomBytes(64).toString("hex");
    }
    console.log("secret: ", secret);
    return secret;
}

module.exports = { getSession };
