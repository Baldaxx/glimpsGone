Projet de Galerie d'Art en Ligne
================================
Ce projet implémente une API et une interface web pour une galerie d'art en ligne permettant de gérer des artistes et leurs œuvres. L'API est construite avec Node.js et SQLite pour la gestion des données. Elle offre des fonctionnalités pour ajouter, récupérer, mettre à jour, et supprimer des artistes et des œuvres d'art.

Fonctionnalités
---------------
Gestion de la base de données SQLite pour les artistes et leurs œuvres.
API REST pour interagir avec les données des artistes et des œuvres (ajout, récupération, mise à jour, suppression).
Compteurs de "j'aime" et de "j'aime pas" pour chaque œuvre.
Interface utilisateur simple pour interagir avec l'API.
Validation de formulaire côté client avec Parsley.
Effets d'animation sur l'interface utilisateur.

Installation
------------
Assurez-vous d'avoir Node.js installé sur votre machine. Ensuite, suivez ces étapes pour configurer le projet :
git clone 

Lancez le serveur 
-----------------
node server/server.js
Vous pouvez accéder à l'interface utilisateur en ouvrant <http://localhost:3000> dans votre navigateur.

Utilisation de l'API
--------------------
L'API expose plusieurs routes pour interagir avec les données des artistes et des œuvres :

GET /api/oeuvres : récupère toutes les œuvres.  

POST /api/oeuvres : ajoute une nouvelle œuvre.  

POST /api/oeuvres/:id/jaime : incrémente le compteur de "j'aime" pour une œuvre.  

POST /api/oeuvres/:id/jaimeplus : décrémente le compteur de "j'aime" pour une œuvre.  

POST /api/oeuvres/:id/jaimepas : incrémente le compteur de "j'aime pas" pour une œuvre.  

POST /api/oeuvres/:id/jaimepasplus : décrémente le compteur de "j'aime pas" pour une œuvre.  

DELETE /api/artistes/:id : supprime un artiste et ses œuvres associées.
Contribuer  

Nous accueillons les contributions ! Si vous avez des suggestions d'amélioration ou des corrections, n'hésitez pas à virginie.bm13@icloud.com

Liens
=====

Pour comprendre les commit:
vers le Trello => <https://trello.com/b/Lw47hmlG/ecf>  

vers le figma => <https://www.figma.com/file/F07Ghcazd2HIpGqRicBDML/Untitled?type=design&node-id=114-2&mode=design&t=piQYKvGwzffy1Abz-0>
