### Glimps Gone
### L'extravagante galerie d'art des oeuvres invisibles

### Introduction
Je vous présente "Glimps Gone" ou l'extravagante galerie d'art des oeuvres invisibles ! La galerie
a été conçu pour mon projet ECF 2024, c' est aussi le résultat de ma passion profonde pour l'art ainsi
que de mon désir de fusionner ces intérêts avec ma formation.
En tant que créatrice de l'application, j'ai visé à construire un espace numérique proposant une
expérience utilisateur à la fois immersive et interactive
---
### Développement

- **Design** : Photoshop, Dafont
- **Front-end** : HTML, CSS, JavaScript
- **Sécurité contre les injections SQL** : Requête paramétrée
- **Back-end** : Node.js Express.js
- **Envoi d'e-mails** : SMTPJS
- **Base de données** : SQLite 3
- **Intégration de l'API Facebook** pour le partage
- **Verification du formulaire** : Parsley.js

---
### Conception et Développement

#### Phase de conception

Outils de Design : Suite à des recherches sur des sites de galerie d'art afin d'inspirer mon design, j'ai commencé par dessiner ceux-ci sur Photoshop, validant mon logo. En ce qui concerne ma palette couleur, je les ai validées sur Coolors.com. Mes polices d'écriture quant à elles ont été validées et téléchargées dans mon dossier font sur Dafont.com. Pour le maquettage de l'interface et l'expérience utilisateur, j'ai utilisé Figma ce qui a permis de visualiser et de partager facilement le design de l'application ainsi que la réflexion sur l'expérience utilisateur. J'ai donc pu commencer mes user stories suite à la finalité de ma maquette.

#### Planification et Gestion de Projet

Trello a servi à organiser et suivre l'avancement du projet, facilitant ainsi la gestion des tâches découlant de mes user stories et en structurant les différentes phases de développement de la conception à la réalisation.

Cette approche m'a permis de visualiser clairement les exigences du projet et de les organiser de manière logique tout en offrant une vue d'ensemble du processus. De plus, la numérotation des tâches en fonction des user stories et des commits GitHub facilite la traçabilité pour la relecture d'une tierce personne.

Présentation du projet : J'utilise actuellement Prezi pour vous présenter mon projet de façon interactive.

#### Développement Front-End

Technologies Utilisées : Pour le front-end, j'ai choisi HTML, CSS, et JavaScript pour créer une interface simple et fluide de navigation entre les différentes œuvres d'art. J'ai choisi d'utiliser le framework BootStrap pour rendre mes pages responsive.

Évidemment, j'ai également dû utiliser des media queries pour rendre le site complètement responsive.

#### Développement Back-End

Serveur et API : J'ai utilisé Node.js et Express.js pour interagir simplement avec le serveur et concevoir ma propre API.

Cela m'a permis d'ajuster précisément les fonctionnalités de la galerie, d'améliorer l'efficacité et surtout d'enrichir mes compétences techniques.

J'ai décidé de découpler mon code dans deux fichiers différents, server.js pour le serveur, l'API et la logique métier, et repository.js pour la logique d'accès aux données, aidant à organiser mon projet de façon claire et rendant le projet plus facile à modifier en distinguant bien les fonctions du serveur de celles liées aux données.

Si je décide de changer de système de base de données, par exemple MySQL, je n'aurai qu'à ne pas toucher au server.js !

J'ai opté pour l'utilisation de la syntaxe async/await dans mon code pour simplifier la gestion des opérations asynchrones, rendant ainsi mon code plus lisible et facile à maintenir.

"**Await**" met en pause l'exécution de la fonction async jusqu'à ce que la promesse soit résolue, puis retourne le résultat de cette promesse. Cela permet de gérer de manière synchrone des opérations asynchrones dans du code JavaScript.

En ce qui concerne mes routes API :

- Route GET pour récupérer toutes les œuvres d'art. `app.get("/api/oeuvres")`
- Route POST pour ajouter une nouvelle œuvre. `app.post("/api/oeuvres")`
- Route POST pour augmenter le compteur de "j'aime" d'une œuvre spécifique. `app.post("/api/oeuvres/:id/jaime")`
- Route POST similaire pour les "j'aime pas". `app.post("/api/oeuvres/:id/jaimepas")`

### Interaction avec la Base de Données

Gestion des Données : J'ai choisi de coder entièrement ma base de données pour mon projet en utilisant SQLite plutôt que d'utiliser MySQL Workbench pour plusieurs raisons avantageuses.

- La simplicité d'intégration et de déploiement de SQLite est exceptionnelle, étant donné qu'elle ne nécessite pas de serveur de base de données séparé.
- Cette décision a encouragé une meilleure maîtrise des compétences en matière de bases de données.

### Sécurité

- **Prévention des Injections SQL** : Utilisation systématique de requêtes préparées pour toutes les interactions avec la base de données.
- **Validation des Formulaires** : Intégration de la librairie Parsley.js pour une validation côté front.

### Présentation des pages de la galerie

- **Page d'accueil** : Présentation et explication du concept de la galerie d'art.
- **Page galerie** : Présente toutes les œuvres d'art publiées par les artistes.
- **Navigation et Interactions** : Permet de naviguer entre les œuvres et d'exprimer leur appréciation via des boutons "J'aime" et "Je n'aime pas".

### Les améliorations à mettre en place

- Passage de SQLite à MySQL pour accueillir plus de visiteurs.
- HTTP à HTTPS
- Retravailler les fonctionnalités des compteurs "J'aime" et "Je n'aime pas".
- Modération des œuvres ajoutées par les artistes avec une page administrateur.
- Ajout d'une fonctionnalité permettant aux artistes de s'inscrire et de disposer de leur propre page dédiée.

### Conclusion

Ce projet représente ma maîtrise en développement web et en design graphique à l'instant T et en 10 jours. Je suis ouverte à la collaboration virginie.bm13@icloud.com

---

## Installation

Assurez-vous d'avoir Node.js installé sur votre machine. Ensuite, suivez ces étapes pour configurer le projet :

```bash
git clone https://github.com/Baldaxx/glimpsGone
cd glimpsGone
npm install
node server/server.js
Vous pouvez accéder à l'interface utilisateur en ouvrant http://localhost:3000 dans votre navigateur.
