// Importe le module Express pour créer et gérer un serveur HTTP.
const express = require("express");
// Importe les fonctions de manipulation de la base de données depuis le fichier 'repository.js'.
const {
  recupererOeuvres,
  ajouterOeuvre,
  augmenterJaimes,
  augmenterJaimesPas,
  creerArtiste,
} = require("./repository");

// Crée une instance d'application Express.
const app = express();
// Définit le port sur lequel le serveur va écouter.
const port = 3000;
// Importe les configurations de la base de données et la fonction pour la créer.
const { db, createDb } = require("./databse");

// Exécute la fonction pour initialiser la base de données au démarrage du serveur.
createDb();

// Configure le serveur pour servir les fichiers statiques du dossier 'public'.
app.use(express.static("public"));
// Active le middleware pour analyser les corps de requête JSON.
app.use(express.json());

// Définit une fonction pour simplifier la gestion des promesses dans les routes Express.
const gestionAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Définit une route GET pour récupérer toutes les œuvres d'art.
app.get(
  "/api/oeuvres",
  gestionAsync(async (req, res) => {
    // Appelle la fonction pour récupérer les œuvres et envoie le résultat en JSON.
    const oeuvres = await recupererOeuvres();
    res.json(oeuvres);
  })
);

// Définit une route POST pour ajouter une nouvelle œuvre.
app.post(
  "/api/oeuvres",
  gestionAsync(async (req, res) => {
    // Crée un nouvel artiste et ajoute une œuvre avec les données reçues dans le corps de la requête.
    const artistId = await creerArtiste(
      req.body.artiste,
      req.body.email,
      req.body.telephone
    );
    const id = await ajouterOeuvre(
      artistId,
      req.body.titre,
      req.body.description
    );
    // Envoie une réponse JSON pour confirmer l'ajout de l'œuvre.
    res.json({ message: "Succès", donnee: req.body, id });
  })
);

// Définit une route POST pour augmenter le compteur de "j'aime" d'une œuvre spécifique.
app.post(
  "/api/oeuvres/:id/jaime",
  gestionAsync(async (req, res) => {
    await augmenterJaimes(req.params.id);
    res.json({ message: "J'aime mis à jour" });
  })
);

// Définit une route POST similaire pour les "j'aime pas".
app.post(
  "/api/oeuvres/:id/jaimepas",
  gestionAsync(async (req, res) => {
    await augmenterJaimesPas(req.params.id);
    res.json({ message: "J'aime pas mis à jour" });
  })
);

// Définit une route POST pour créer un nouvel artiste avec les données reçues.
app.post(
  "/api/artistes",
  gestionAsync(async (req, res) => {
    const { nom, email, telephone } = req.body;
    const id = await creerArtiste(nom, email, telephone);
    res.json({ message: "Artiste créé avec succès", id });
  })
);

// Configure un gestionnaire d'erreurs pour capturer et traiter toutes les erreurs non gérées.
app.use((err, req, res, next) => {
  console.error(err); // Affiche l'erreur dans la console du serveur.
  res.status(500).json({ erreur: "Une erreur est survenue" }); // Envoie une réponse d'erreur au client.
});

// Lance le serveur pour écouter sur le port spécifié.
app.listen(port, () => console.log(`Serveur en écoute sur le port ${port}`));
