const mongoose = require("mongoose");
const productModel = require("./product");
const cartModel = require("./cart");
const userModel = require("./user");

const dbHost = process.env.DATABASE_HOST || "127.0.0.1";

async function initDb() {
    await mongoose.connect("mongodb://" + dbHost + "/appli_livraison", {
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

    const admin = await new userModel({
        email: "admin@admin.com",
        // This is "admin" hashed by bcrypt
        password:
            "$2b$11$7lucTtu23uWBQ/DVqK1RuOjkfezoaDYIkWKNC2ZbcD2XECb6vbsYe",
        firstName: "Ad",
        secondName: "Min",
        adresseNumero: 1,
        adresseRue: "rue des admins",
        ville: "Adminville",
        codePostal: "00000",
        isRoot: true,
    }).save();

    await new cartModel({
        _id: admin._id,
    }).save();

    const test = await new userModel({
        email: "test@test.com",
        // This is "test" hashed by bcrypt
        password:
            "$2b$11$iJLpofnfZOjl5y0ZcrLNa.i82ADH4en2HjGhEC2Kx2D8qmI0ZAq4C",
        firstName: "Te",
        secondName: "St",
        adresseNumero: 3,
        adresseRue: "rue des tests",
        ville: "Testville",
        codePostal: "11111",
        isRoot: false,
    }).save();

    await new cartModel({
        _id: test._id,
    }).save();

    await mongoose.connection.close();
}

initDb();
