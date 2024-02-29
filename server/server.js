const express = require("express");
const app = express();
const port = 3000;
const { db, createDb } = require("./databse"); 

createDb();

app.use(express.static("public"));
app.use(express.json());


app.get("/api/oeuvres", (req, res) => {
  db.all(
    "SELECT oeuvre.*, artiste.nom AS artiste FROM oeuvre LEFT JOIN artiste ON oeuvre.artiste_id = artiste.id",
    [],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(rows);
      }
    }
  );
});

app.post("/api/oeuvres", (req, res) => {
  const {
    artiste_id,
    titre,
    description,
    date_de_creation,
    compteur_jaime,
    compteur_jaime_pas,
  } = req.body;
  const sql = `INSERT INTO oeuvre (artiste_id, titre, description, date_de_creation, compteur_jaime, compteur_jaime_pas) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    artiste_id,
    titre,
    description,
    date_de_creation,
    compteur_jaime,
    compteur_jaime_pas,
  ];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: req.body,
      id: this.lastID,
    });
  });
});

app.post("/api/oeuvres/:id/jaime", (req, res) => {
  db.run(
    `UPDATE oeuvre SET compteur_jaime = compteur_jaime + 1 WHERE id = ?`,
    req.params.id,
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "updated", changes: this.changes });
    }
  );
});

app.post("/api/oeuvres/:id/jaimepas", (req, res) => {
  db.run(
    `UPDATE oeuvre SET compteur_jaime_pas = compteur_jaime_pas + 1 WHERE id = ?`,
    req.params.id,
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "updated", changes: this.changes });
    }
  );
});

app.delete("/api/artistes/:id", (req, res) => {
  db.run(`DELETE FROM artiste WHERE id = ?`, req.params.id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});

// Route pour gérer la soumission du formulaire "Ajouter"
app.post("/submit-form", (req, res) => {
    const { prenom, nom, email, telephone, commentaire } = req.body;

    const querySearchArtiste = "SELECT * FROM artiste WHERE nom = ? AND email = ? AND telephone = ?";
    db.run(querySearchArtiste, [`${prenom} ${nom}`, email, telephone], (err, rows) => {
        if(err) {
            console.error(err.message);
            res.json({
                message: "Erreur lors de l'insertion dans la base de données",
            });
            return;
        }

        let artisteId;
        if(rows !== undefined) {
            artisteId = rows[0].id
            insertOeuvre(res, artisteId, prenom, nom, commentaire);
        } else {
            const queryAddArtiste = "INSERT INTO artiste (nom, email, telephone) VALUES (?, ?, ?)";
            db.run(queryAddArtiste, [`${prenom} ${nom}`, email, telephone], function(err) {
                if(err) {
                    console.error(err.message);
                    res.json({
                        message: "Erreur lors de l'insertion dans la base de données",
                    });
                    return;
                }
                artisteId = this.lastID;
                insertOeuvre(res, artisteId, prenom, nom, commentaire);
            });
        }
    });
});

function insertOeuvre(res, artisteId, prenom, nom, commentaire) {
    const dateDeCreation = Math.floor(Date.now() / 1000);
    const queryAddOeuvre = `INSERT INTO oeuvre
        (artiste_id, titre, description, date_de_creation, compteur_jaime, compteur_jaime_pas)
        VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(queryAddOeuvre, [artisteId, `Oeuvre de ${prenom} ${nom}`, commentaire, dateDeCreation, 0, 0], (err) => {
        if(err) {
            console.error(err.message);
            res.json({
                message: "Erreur lors de l'insertion dans la base de données",
            });
            return;
        }
        res.json({ message: "Votre œuvre a été soumise avec succès !" });
    });
}

app.get("/oeuvres", (req, res) => {
  db.all("SELECT * FROM SoumissionsOeuvre", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
