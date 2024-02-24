const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  "./mydb.sqlite3",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Erreur lors de l'ouverture de la base de données", err);
    } else {
      console.log("Connecté à la base de données SQLite.");
    }
  }
);

function createDb () {
  db.serialize(function () {
    db.run(`DROP TABLE IF EXISTS artiste`);
    db.run(`DROP TABLE IF EXISTS oeuvre`);
    db.run(`
      CREATE TABLE oeuvre (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        artiste_id INTEGER, 
        titre TEXT, 
        description TEXT, 
        date_de_creation INTEGER,
        compteur_jaime INTEGER,
        compteur_jaime_pas INTEGER,
        CONSTRAINT fk_artiste
          FOREIGN KEY(artiste_id) 
          REFERENCES artiste(id)
          ON DELETE CASCADE
      )`);

    db.run(`
      CREATE TABLE artiste (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nom TEXT, 
        email TEXT, 
        telephone TEXT 
      )`);
  });

db.serialize(function () {
  db.run(`INSERT INTO artiste (id, nom, email, telephone) VALUES (?, ?, ?, ?)`, [
    1,
    "Jerome Floyd",
    "VZlT3@example.com",
    "0645125596"
  ])
    db.run(
      `INSERT INTO oeuvre (artiste_id, titre, description, date_de_creation, compteur_jaime, compteur_jaime_pas) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        1,
        "Le Rêveur des Prairies",
        `Au cœur de cette vaste toile étendue, intitulée "Le Rêveur des Prairies", trône majestueusement un âne, dont la présence discrète évoque à la fois votre curiosité insatiable et votre aspiration indomptable à l'aventure.
        Son regard, empreint de malice et de sagesse, semble scruter l'horizon lointain, où se dessinent les contours de l'inconnu. Autour de lui, la prairie s'étend à perte de vue, tel un océan de verdure infinie, vibrant de vie et de mystère.
        Chaque brin d'herbe, chaque pétale de fleur semble participer à un ballet harmonieux, offrant à vous, cher spectateur, un tableau vivant de diversité et de beauté. Les couleurs se mêlent dans une symphonie enchanteresse, tandis que les rayons du soleil, émergeant timidement à l'horizon, caressent la scène d'une lumière dorée, promettant un nouveau jour empli d'aventures et de découvertes.
        Dans cet univers foisonnant de détails et de sensations, chaque élément semble avoir une histoire à raconter, un secret à révéler. Vous imaginez sans doute les doux murmures du vent dans les hautes herbes, les parfums enivrants des fleurs sauvages, le frisson de l'herbe sous les sabots de l'âne avide d'exploration.
        Et puis, il y a cet âne, fier et déterminé, prêt à partir à l'aventure. Il incarne à lui seul le voyageur qui sommeille en chacun de nous, rappelant avec force que les plus grandes explorations débutent souvent par un simple pas dans l'inconnu. Son attitude résolue vous invite au dépassement de soi, à l'audace de franchir les frontières du connu pour plonger tête baissée dans l'océan de l'inconnu.
        En contemplant cette scène empreinte de magie et de poésie, vous vous trouvez transporté dans un autre monde, où le temps semble suspendu et où les rêves prennent vie.
        Car au-delà de la simple représentation artistique, "Le Rêveur des Prairies" éveille en chacun de vous cette soif d'aventure et cette fascination pour l'inconnu qui font battre le cœur de l'humanité depuis la nuit des temps.`,
        1708775455,
        0,
        0
      ]
    );
});
}

module.exports = {
  db, createDb
};
