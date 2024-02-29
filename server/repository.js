const { db } = require("./databse");

// Exécute une requête SQL et retourne les résultats via une promesse
const executerRequete = (sql, params = []) =>
  new Promise((resolve, reject) => {
    const callback = (err, result) => {
      if (err) reject(err);
      else resolve(result);
    };
// Utilise 'db.all' pour les requêtes SELECT pour obtenir plusieurs lignes
    if (sql.trim().startsWith("SELECT")) {
      db.all(sql, params, callback);
    } else if (sql.trim().startsWith("INSERT")) {
// Pour les requêtes INSERT, retourner le dernier ID insérer
      db.run(sql, params, function() { resolve(this.lastID) });
    } else {
// Pour les autres requêtes, utilise 'db.run' pour exécuter et obtenir l'objet 'this'
      db.run(sql, params, callback);
    }
  });
// Fonctions pour interagir avec la base de données, utilisant 'executerRequete'
const recupererOeuvres = () => executerRequete
("SELECT oeuvre.*, artiste.nom AS artiste FROM oeuvre LEFT JOIN artiste ON oeuvre.artiste_id = artiste.id");

const ajouterOeuvre = (artiste_id, titre, description) => executerRequete
("INSERT INTO oeuvre (artiste_id, titre, description, date_de_creation, compteur_jaime, compteur_jaime_pas) VALUES (?, ?, ?, strftime('%s', 'now'), ?, ?)", [artiste_id, titre, description, 0, 0]);

const augmenterJaimes = (id) => executerRequete
("UPDATE oeuvre SET compteur_jaime = compteur_jaime + 1 WHERE id = ?", [id]);

const augmenterJaimesPas = (id) => executerRequete
("UPDATE oeuvre SET compteur_jaime_pas = compteur_jaime_pas + 1 WHERE id = ?", [id]);

const trouverArtiste = (critere) => executerRequete
("SELECT * FROM artiste WHERE nom = ? AND email = ? AND telephone = ?", Object.values(critere));

const creerArtiste = (nom, email, telephone) => executerRequete
("INSERT INTO artiste (nom, email, telephone) VALUES (?, ?, ?)", [nom, email, telephone]);

const soumettreOeuvre = (oeuvre) => ajouterOeuvre(oeuvre);

module.exports = {
  recupererOeuvres,
  ajouterOeuvre,
  augmenterJaimes,
  augmenterJaimesPas,
  trouverArtiste,
  creerArtiste,
  soumettreOeuvre
};
