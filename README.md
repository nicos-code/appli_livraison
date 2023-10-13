# appli_livraison

## Partie serveur

### Installation de MongoDB

-   Installer mongodb: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-debian/

### Commandes Utiles

-   `sudo systemctl start mongod`: permet de lancer le service MongoDB.
-   `npm start`: permet de lancer le projet.
-   `npm run initdb`: permet d'initialiser la base de données avec des données de test.
-   `npm run removedb`: permet de supprimer la base de données (supprimer la bdd "appli_livraison")
-   `npm run resetdb`: permet de réinitialiser la base de données (correspond à faire removedb puis initdb).

### Endpoints `/api`

-   `/product`
    -   **GET** `/` - Get all products.
    -   **GET** `/:id` - Get product info.
    -   **POST** `/:id` - Grab product in cart.
        -   Only if: logged in and product not out of stock.
    -   **DELETE** `/:id` - Drop product from cart.
        -   Only if: logged in and cart not empty.
-   `/user`
    -   **GET** `/` - Get all users.
        -   Only if: admin.
    -   **GET** `/:id` - Get specific user.
        -   Only if: admin or the user id is already stored in session.
    -   **POST** `/:id` - Edit user with body parameters.
        -   Only if: admin or the user id is already stored in session.
-   `/cart`
    -   **GET** `/` - Get all carts.
        -   Only if: admin
    -   **GET** `/:id` - Get the cart of a specific user.
        -   Only if: admin or the user id is already stored in session.
    -   **POST** `/:id` - Validate cart: empty cart and put the order in the "order" table.
        -   Only if: admin or the user id is already stored in session.
-   `/order`
    -   **GET** `/` - Get all orders (admin).
        -   Only if: admin.
    -   **GET** `/:id` - Get order from a specific user.
        -   Only if: admin or the user id is already stored in session.
