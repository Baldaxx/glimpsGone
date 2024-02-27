const express = require("express");
const app = express();
const port = 3000;
const { db, createDb } = require("./databse");

createDb();

app.use(express.static("public"));
app.use(express.json());

app.get("/api/oeuvres", (req, res) => {
  db.all("SELECT * FROM oeuvre", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
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

app.post("/api/oeuvres/:id/jaimeplus", (req, res) => {
  db.run(
    `UPDATE oeuvre SET compteur_jaime = compteur_jaime - 1 WHERE id = ?`,
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

app.post("/api/oeuvres/:id/jaimepasplus", (req, res) => {
  db.run(
    `UPDATE oeuvre SET compteur_jaime_pas = compteur_jaime_pas - 1 WHERE id = ?`,
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
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

