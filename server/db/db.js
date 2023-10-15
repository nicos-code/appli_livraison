const mongoose = require("mongoose");

const dbHost = process.env.DATABASE_HOST || "127.0.0.1";

async function connect() {
    await mongoose.connect("mongodb://" + dbHost + "/appli_livraison", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

connect();
