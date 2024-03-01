Projet de Galerie d'Art en Ligne
================================

Ce projet est une application web de galerie d'art qui permet aux utilisateurs de visualiser, aimer, ne pas aimer des œuvres d'art et de naviguer entre elles. Les artistes peuvent soumettre leurs œuvres via un formulaire de contact intégré. Ils peuvent egalement me communiquer directement via un formulaire de contact. L'application utilise Express.js pour le backend, et des technologies front-end comme HTML, CSS, et JavaScript pour l'interface utilisateur.

---

1. # Développement

* Front-end: HTML, CSS, JavaScript
* Securité du formulaire: Parsley.js
* Back-end: Express.js
* Envoi d'email: SMTPJS
* Base de données: SQLite 3
* Api Facebook pour le partage

---

2. # Fonctionnalités

* Visualisation des œuvres: Les utilisateurs peuvent voir les œuvres d'art avec son titre, son artiste, l'année de sa création et sa description.
* Navigation: Les utilisateurs peuvent naviguer entre les différentes œuvres d'art grâce aux boutons "Suivant" et "Précédent".
* Interactions: Les utilisateurs peuvent exprimer leur appréciation des œuvres via des boutons "J'aime" et "J'aime pas".
* Partage sur Facebook.
* Soumission d'œuvres: Les artistes peuvent soumettre leurs œuvres d'art en remplissant un formulaire. 
* Contact : les artistes peuvent ecrire un message a la galerie d'art, les informations soumises sont envoyées via email à l'administrateur de la galerie.

---

3. # Utilisation de l'API

L'API expose plusieurs routes pour interagir avec les données des artistes et des œuvres :

* Route GET pour récupérer toutes les œuvres d'art. app.get("/api/oeuvres")
* Route POST pour ajouter une nouvelle œuvre. app.post("/api/oeuvres")
* Route POST pour augmenter le compteur de "j'aime" d'une œuvre spécifique. 
app.post("/api/oeuvres/:id/jaime")
* Route POST similaire pour les "j'aime pas". app.post("/api/oeuvres/:id/jaimepas")

---

## Liens

Trello pour suivre l'avancement du projet :<https://trello.com/b/Lw47hmlG/ecf>  

Figma pour visualiser le design de l'application : <https://www.figma.com/file/F07Ghcazd2HIpGqRicBDML/Untitled?type=design&node-id=0-1&mode=design&t=er3rzg6iYGjfVrQv-0>

Documentation de Parsley : https://parsleyjs.github.io/Parsley-1.x/documentation.html

---

4. # Les ameliorerations dans le turfu

* Retravailler les fonctionnalités des compteurs "J'aime" et "Je n'aime pas" pour éviter qu'ils ne soient incrémentés indéfiniment, et pour s'assurer que cliquer sur "J'aime" désactive automatiquement "Je n'aime pas", et vice-versa.
* Moderation des oeuvres ajouter par les artistes avec une page admin (creer = pageAdmin.html) avant leurs mises en ligne.
* L'ajout d'une fonctionnalité permettant aux artistes de s'inscrire et de disposer de leur propre page dédiée.
* Création et ce qui en decoule d'un "S'inscrire" et "Se connecter".
* La recherche d'oeuvre par artiste/par nom/année...
Je suis ouverte à la contribution, n'hesitez pas => virginie.bm13@icloud.com

---

## Installation

Assurez-vous d'avoir Node.js installé sur votre machine. Ensuite, suivez ces étapes pour configurer le projet :

```bash
git clone https://github.com/Baldaxx/glimpsGone
cd glimpsGone
npm install
node server/server.js
Vous pouvez accéder à l'interface utilisateur en ouvrant http://localhost:3000 dans votre navigateur.
