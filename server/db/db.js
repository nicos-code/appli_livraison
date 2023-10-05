const mongoose = require("mongoose");

async function connect() {
    await mongoose.connect("mongodb://127.0.0.1/appli_livraison", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

connect();
