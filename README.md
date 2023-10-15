# appli_livraison

## Fonctionnement

Le site web proposé permet à un utilisateur de créer un compte, de se connecter et de pouvoir commander des vélos. Il a ainsi un panier qui lui est associé et il peut également consulter l'ensemble des commandes qu'il a passées.

Un compte admistrateur existe également et permet notamment de consulter la liste des utilisateurs, leur panier et leurs commandes.

## Utilisation avec Docker
Après avoir installé Docker :
- `docker compose up -d` : créer les conteneurs

Une fois les conteneurs créés, vous pourrez y accéder aux ports suivants :
- 3000 pour le frontend
- 3001 pour le backend
- 27017 pour mongodb.

Pour vous connectez directement à l'application, vous pouvez généralement utiliser l'url suivante (en fonction de la configuration de Docker) : `http://localhost:3000/`

## Installation manuelle des outils utilisés

### Installation de Node.js

-   Installer Node.js : https://nodejs.org/fr/download

### Installation de MongoDB

-   Installer MongoDB : https://www.mongodb.com/docs/manual/tutorial/

## Commandes Utiles

### Client / Frontend

Dans le dossier `/client` :

-   `npm ci`: installe les packages nécessaires pour lancer le projet.

-   `npm start`: permet de lancer le projet frontend. Page web accessible à l'adresse `http://localhost:3000`

### Serveur / Backend

-   `sudo systemctl start mongod`: (Linux) permet de lancer le service MongoDB. (Remarque : sous Windows, ce service est lancé dès que MongoDB est installé)

Dans le dossier `/server` :

-   `npm ci`: installe les packages nécessaires pour lancer le projet.
-   `npm run initdb`: permet d'initialiser la base de données avec des données de test.
-   `npm run removedb`: permet de supprimer la base de données (supprimer la bdd "appli_livraison")
-   `npm run resetdb`: permet de réinitialiser la base de données (correspond à faire removedb puis initdb).
-   `npm start`: permet de lancer le projet backend. Il se lance sur le port `3001`.

## Documentation interne (en anglais)

### Backend Endpoints `/api`

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
-   `/auth`
    -   **POST** `/login` - Login with body parameters (email & password).
    -   **POST** `/register` - Register with body parameters (email & password).
    -   **POST** `/logout` - Logout.
    -   **POST** `/logas/:id` - Log as a specified user.
        -   Only if: admin
