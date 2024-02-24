const express = require("express");
const app = express();
const port = 3000;
const {db, createDb} = require("./databse");

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


// app.post("/api/articles", (req, res) => {
//   const { title, content } = req.body;
//   if (!title || !content) {
//     return res.status(400).send("Le titre et le contenu sont requis.");
//   }

//   const stmt = db.prepare(
//     "INSERT INTO articles (title, content) VALUES (?, ?)"
//   );

//   stmt.run(title, content, function (err) {
//     if (err) {
//       res.status(500).send(err.message);
//     } else {
//       res.status(201).send({ id: this.lastID, title, content });
//     }
//   });
//   stmt.finalize();
// });

// app.delete("/api/articles/:articleId", (req, res) => {
//   const articleId = req.params.articleId;

//   db.run("DELETE FROM articles WHERE id = ?", [articleId], function (err) {
//     if (err) {
//       res.status(500).send(err.message);
//     } else {
//       res
//         .status(200)
//         .send(`Article avec l'ID ${articleId} supprimé avec succès.`);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
