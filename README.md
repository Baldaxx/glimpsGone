# Projet de Galerie d'Art en Ligne

Ce projet implémente une API et une interface web pour une galerie d'art en ligne permettant aux artistes de publier leurs œuvres. L'API est construite avec Node.js et SQLite pour la gestion des données.

## Fonctionnalités

- Gestion de la base de données SQLite pour les artistes et leurs œuvres.
- API REST pour interagir avec les données des artistes et des œuvres (ajout, récupération, mise à jour, suppression).
- Compteurs de "j'aime" et de "j'aime pas" pour chaque œuvre.
- Interface utilisateur simple pour interagir avec l'API.
- Validation de formulaire côté client avec Parsley.
- Effets d'animation sur l'interface utilisateur.

## Installation

Assurez-vous d'avoir Node.js installé sur votre machine. Ensuite, suivez ces étapes pour configurer le projet :

```bash
git clone <https://github.com/Baldaxx/glimpsGone>
cd <glimpsGone>
npm install
Lancement du serveur
node server/server.js
Vous pouvez accéder à l'interface utilisateur en ouvrant http://localhost:3000 dans votre navigateur.

## Utilisation de l'API
L'API expose plusieurs routes pour interagir avec les données des artistes et des œuvres :

GET /api/oeuvres: Récupère toutes les œuvres d'art depuis la base de données.
POST /api/oeuvres: Ajoute une nouvelle œuvre d'art à la base de données.
POST /api/oeuvres/:id/jaime: Augmente le compteur de "j'aime" pour une œuvre spécifique.
POST /api/oeuvres/:id/jaimepas: Augmente le compteur de "j'aime pas" pour une œuvre spécifique.
GET /api/artistes/rechercher: Recherche un artiste dans la base de données en fonction de critères spécifiques.
POST /api/artistes: Crée un nouvel artiste dans la base de données.
POST /api/oeuvres/soumettre: Soumet une nouvelle œuvre d'art par un artiste.
Contributions
Nous accueillons les contributions ! Si vous avez des suggestions d'amélioration ou des corrections, n'hésitez pas à contacter l'équipe.

Liens
Trello pour suivre l'avancement du projet.
Figma pour visualiser le design de l'application.
