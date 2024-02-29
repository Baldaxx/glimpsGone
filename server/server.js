const express = require("express");
const { createDb } = require("./databse"); 
const {
  recupererOeuvres,
  ajouterOeuvre,
  augmenterJaimes,
  augmenterJaimesPas,
  trouverArtiste,
  creerArtiste,
  soumettreOeuvre,
} = require("./repository");

const app = express();
const port = 3000;

createDb(); // Initialise la base de données au démarrage du serveur

app.use(express.static("public")); // Sert les fichiers statiques du dossier 'public'
app.use(express.json()); // Permet au serveur de traiter le JSON dans le corps des requêtes

// Fonction pour simplifier la gestion des promesses dans les routes
const gestionAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Route pour récupérer toutes les œuvres d'art
app.get(
  "/api/oeuvres",
  gestionAsync(async (req, res) => {
    const oeuvres = await recupererOeuvres();
    res.json(oeuvres);
  })
);

// Route pour ajouter une nouvelle œuvre
app.post(
  "/api/oeuvres",
  gestionAsync(async (req, res) => {
    const id = await ajouterOeuvre(req.body);
    res.json({ message: "Succès", donnee: req.body, id });
  })
);

// Route pour augmenter le compteur de "j'aime" d'une œuvre spécifique
app.post(
  "/api/oeuvres/:id/jaime",
  gestionAsync(async (req, res) => {
    await augmenterJaimes(req.params.id);
    res.json({ message: "J'aime mis à jour" });
  })
);

// Route similaire pour les "j'aime pas"
app.post(
  "/api/oeuvres/:id/jaimepas",
  gestionAsync(async (req, res) => {
    await augmenterJaimesPas(req.params.id);
    res.json({ message: "J'aime pas mis à jour" });
  })
);

// Recherche d'artiste par nom, email, et téléphone
app.get(
  "/api/artistes/rechercher",
  gestionAsync(async (req, res) => {
    const { nom, email, telephone } = req.query;
    const artistes = await trouverArtiste({ nom, email, telephone });
    res.json(artistes);
  })
);

// Création d'un nouvel artiste
app.post(
  "/api/artistes",
  gestionAsync(async (req, res) => {
    const { nom, email, telephone } = req.body;
    const id = await creerArtiste({ nom, email, telephone });
    res.json({ message: "Artiste créé avec succès", id });
  })
);

// Soumission d'une nouvelle œuvre par un artiste
app.post(
  "/api/oeuvres/soumettre",
  gestionAsync(async (req, res) => {
    const id = await soumettreOeuvre(req.body);
    res.json({ message: "Œuvre soumise avec succès", id });
  })
);

// Gestionnaire d'erreurs centralisé pour capturer toutes les erreurs non gérées
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erreur: "Une erreur est survenue" });
});

app.listen(port, () => console.log(`Serveur en écoute sur le port ${port}`));
