function afficheOeuvre(oeuvre) {
  // Titre
  const titreOeuvreElement = document.getElementById("titreOeuvre");
  titreOeuvreElement.innerHTML = `${oeuvre.titre}<br><span>${oeuvre.artiste} ${oeuvre.date_de_creation}</span>`;
  titreOeuvreElement.style.display = "block";

  // Description
  const descriptionOeuvreElement = document.getElementById("descriptionOeuvre");
  descriptionOeuvreElement.innerHTML = oeuvre.description;
  descriptionOeuvreElement.style.display = "block";

  // J'aime
  const jaimeOeuvreElement = document.getElementById("jaimeOeuvre");
  jaimeOeuvreElement.innerHTML = oeuvre.compteur_jaime;

  // J'aime pas
  const jaimePasOeuvreElement = document.getElementById("jaimePasOeuvre");
  jaimePasOeuvreElement.innerHTML = oeuvre.compteur_jaime_pas;

  const compteurJJElement = document.getElementById("compteurJJ");
  compteurJJElement.style.display = "block";
}

let toutesLesOeuvres = [];
let identifiantOeuvreCourante = 0; // Indice de l'oeuvre courante

function initialisation() {
  fetch("http://localhost:3000/api/oeuvres")
    .then((response) => response.json())
    .then((data) => {
      toutesLesOeuvres = data;
      if (toutesLesOeuvres.length === 0) {
        window.location.href = "galerieDown.html";
      } else {
        afficheOeuvre(toutesLesOeuvres[identifiantOeuvreCourante]);
      }
    })
    .catch((error) => console.error("Erreur :", error));

  // Configuration bouton j'aime
  document.getElementById("btn_jaime").addEventListener("click", function () {
    fetch(
      `/api/oeuvres/${toutesLesOeuvres[identifiantOeuvreCourante].id}/jaime`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then(() => {
        afficheOeuvre(toutesLesOeuvres[identifiantOeuvreCourante]);
      });
  });

  // Configuration bouton j'aime pas
  document.getElementById("btn_jaime_pas").addEventListener("click", function () {
    fetch(
      `/api/oeuvres/${toutesLesOeuvres[identifiantOeuvreCourante].id}/jaimePas`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then(() => {
        afficheOeuvre(toutesLesOeuvres[identifiantOeuvreCourante]);
      });
  });

  // Configuration bouton suivant
  document.getElementById("btn_suivant").addEventListener("click", function () {
    if (identifiantOeuvreCourante + 1 < toutesLesOeuvres.length) {
      identifiantOeuvreCourante++;
      afficheOeuvre(toutesLesOeuvres[identifiantOeuvreCourante]);
    } else {
      alert("Il n'y a plus d'oeuvres à voir !");
    }
  });
}

document.addEventListener("DOMContentLoaded", initialisation);
