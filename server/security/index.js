const crypto = require("crypto");
const session = require("express-session");
const fs = require("fs");
// const MongoStore = require("connect-mongo");
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 31;

function getSession() {
    return session({
        name: "sessionId",
        secret: getOrCreateSecret(),
        cookie: { maxAge: COOKIE_MAX_AGE },
        resave: false,
        saveUninitialized: false,
        // store: MongoStore.create({
        //     mongoUrl: 'mongodb://localhost/'
        // })
    });
}

function getOrCreateSecret() {
    if (fs.existsSync("./token.json")) {
        console.log("Token file found. Reading session secret.");
        const data = JSON.parse(
            fs.readFileSync("./token.json", {
                encoding: "utf-8",
                flag: "r",
            })
        );
        return data.sessionSecret;
    }

    console.log("Token file not found. Generating new session secret.");
    const secret = { sessionSecret: crypto.randomBytes(64).toString("hex") };
    fs.writeFileSync("./token.json", JSON.stringify(secret), {
        encoding: "utf-8",
        flag: "w",
    });
    return secret.sessionSecret;
}

module.exports = { getSession };
