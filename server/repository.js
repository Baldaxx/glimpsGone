// Importe la configuration de la base de données depuis le fichier 'databse.js'.
const { db } = require("./database");

/**
 * Exécute une requête SQL asynchrone et gère le résultat avec une promesse.
 * @param {string} sql La requête SQL à exécuter.
 * @param {Array} params Les paramètres à injecter dans la requête SQL.
 * @returns {Promise} Une promesse qui résout avec le résultat de la requête.
 */
const executerRequete = (sql, params = []) =>
  new Promise((resolve, reject) => {
    // Définit une fonction de rappel pour traiter le résultat de la requête.
    const callback = (err, result) => {
      if (err) reject(err); // En cas d'erreur, rejette la promesse.
      else resolve(result); // En cas de succès, résout la promesse avec le résultat.
    };

    // Détecte et exécute les requêtes SELECT pour récupérer plusieurs lignes.
    if (sql.trim().startsWith("SELECT")) {
      db.all(sql, params, callback);
    }
    // Détecte et exécute les requêtes INSERT, puis retourne l'ID de l'élément inséré.
    else if (sql.trim().startsWith("INSERT")) {
      db.run(sql, params, function () {
        resolve(this.lastID);
      });
    }
    // Pour toutes les autres requêtes, exécute la requête et utilise le callback standard.
    else {
      db.run(sql, params, callback);
    }
  });

// Fonctions d'interaction avec la base de données :

// Récupère toutes les œuvres et leurs artistes associés.
const recupererOeuvres = () =>
  executerRequete(
    "SELECT oeuvre.*, artiste.nom AS artiste FROM oeuvre LEFT JOIN artiste ON oeuvre.artiste_id = artiste.id"
  );

// Ajoute une nouvelle œuvre dans la base de données.
const ajouterOeuvre = (artiste_id, titre, description) =>
  executerRequete(
    "INSERT INTO oeuvre (artiste_id, titre, description, date_de_creation, compteur_jaime, compteur_jaime_pas) VALUES (?, ?, ?, strftime('%s', 'now'), 0, 0)",
    [artiste_id, titre, description]
  );

// Incrémente le compteur de "j'aime" pour une œuvre spécifique.
const augmenterJaimes = (id) =>
  executerRequete(
    "UPDATE oeuvre SET compteur_jaime = compteur_jaime + 1 WHERE id = ?",
    [id]
  );

// Incrémente le compteur de "j'aime pas" pour une œuvre spécifique.
const augmenterJaimesPas = (id) =>
  executerRequete(
    "UPDATE oeuvre SET compteur_jaime_pas = compteur_jaime_pas + 1 WHERE id = ?",
    [id]
  );

// Crée un nouvel artiste dans la base de données.
const creerArtiste = (nom, email, telephone) =>
  executerRequete(
    "INSERT INTO artiste (nom, email, telephone) VALUES (?, ?, ?)",
    [nom, email, telephone]
  );

// Exporte les fonctions pour les rendre accessibles à d'autres parties de l'application.
module.exports = {
  recupererOeuvres,
  ajouterOeuvre,
  augmenterJaimes,
  augmenterJaimesPas,
  creerArtiste,
};
