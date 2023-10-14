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
    -   **GET** `/id/:id` - Get product info.
    -   **POST** `/id/:id` - Put product in the cart of the current user.
        -   Only if: logged in and product not out of stock.
    -   **DELETE** `/id/:id` - Drop product from the cart of the current user.
        -   Only if: logged in and cart not empty.
    -   **GET** `/all` - Get all products.
-   `/user`
    -   **GET** `/` - Get current user.
        -   Only if: logged in.
    -   **POST** `/` - Edit current user with body parameters.
        -   Only if: logged in.
    -   **GET** `/id/:id` - Get specified user.
        -   Only if: admin or the user id is already stored in session.
    -   **POST** `/id/:id` - Edit specified user with body parameters.
        -   Only if: admin or the user id is already stored in session.
    -   **GET** `/all` - Get all users.
        -   Only if: admin.
-   `/cart`
    -   **GET** `/` - Get cart of the current user.
        -   Only if: logged in.
    -   **POST** `/` - Validate cart of the current user: empty cart and put the order in the "order" table.
        -   Only if: logged in and product not out of stock.
    -   **GET** `/:id` - Get the cart of a specified user.
        -   Only if: admin or the user id is already stored in session.
    -   **POST** `/:id` - Validate cart of a specified user: empty cart and put the order in the "order" table.
        -   Only if: admin or the user id is already stored in session.
    -   **GET** `/all` - Get all carts.
        -   Only if: admin
-   `/order`
    -   **GET** `/` - Get order from the current user.
        -   Only if: logged in.
    -   **GET** `/:id` - Get order from a specified user.
        -   Only if: admin or the user id is already stored in session.
    -   **GET** `/all` - Get all orders (admin).
        -   Only if: admin.
