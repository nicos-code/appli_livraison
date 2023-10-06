const mongoose = require("mongoose");

async function resetDb() {
    await mongoose.connect("mongodb://127.0.0.1/appli_livraison", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await mongoose.connection.dropDatabase();

    await mongoose.connection.close();
}

resetDb();
