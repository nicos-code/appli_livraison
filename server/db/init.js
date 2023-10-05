const mongoose = require("mongoose");
const productModel = require("./product");
const commandModel = require("./command");
const userModel = require("./user");

async function initDb() {
    await mongoose.connect("mongodb://127.0.0.1/appli_livraison", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await new productModel({
        nom: "Vélo de route",
        description: "",
        prix: 10000,
        stock: 2,
    }).save();
    await new productModel({
        nom: "Vélo tout terrain",
        description: "",
        prix: 6000,
        stock: 4,
    }).save();
    await new productModel({
        nom: "Vélo Gravel",
        description: "",
        prix: 3000,
        stock: 9,
    }).save();
    await new productModel({
        nom: "BMX",
        description: "",
        prix: 1200,
        stock: 15,
    }).save();

    await new userModel({
        email: "admin@admin.com",
        password: "admin",
        firstName: "Ad",
        secondName: "Min",
        adresseNumero: 1,
        adresseRue: "rue des admins",
        ville: "Adminville",
        codePostal: "00000",
        isRoot: true,
    }).save();

    await new userModel({
        email: "test@test.com",
        password: "test",
        firstName: "Te",
        secondName: "St",
        adresseNumero: 3,
        adresseRue: "rue des tests",
        ville: "Testville",
        codePostal: "11111",
        isRoot: false,
    }).save();

    await mongoose.connection.close();
}

initDb();
