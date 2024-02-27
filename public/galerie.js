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

function recupererEtAfficherOeuvre() {
  fetch("/api/oeuvres")
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
}

function initialisation() {
    recupererEtAfficherOeuvre();

    // Configuration bouton j'aime
    document.getElementById("btn_jaime").addEventListener("click", function () {
        fetch(
            `/api/oeuvres/${toutesLesOeuvres[identifiantOeuvreCourante].id}/jaime`,
            { method: "POST" }
        )
            .then((response) => response.json())
            .then(() => {
                recupererEtAfficherOeuvre();
            });
    });

    // Configuration bouton j'aime pas
    document
        .getElementById("btn_jaime_pas")
        .addEventListener("click", function () {
            fetch(
                `/api/oeuvres/${toutesLesOeuvres[identifiantOeuvreCourante].id}/jaimePas`,
                { method: "POST" }
            )
                .then((response) => response.json())
                .then(() => {
                    recupererEtAfficherOeuvre();
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

    // Configuration bouton précédent
    document
        .getElementById("btn_precedent")
        .addEventListener("click", function () {
            if (identifiantOeuvreCourante - 1 >= 0) {
                identifiantOeuvreCourante--; 
                afficheOeuvre(toutesLesOeuvres[identifiantOeuvreCourante]);
            } else {
                alert("Il n'y a plus d'oeuvres à voir !");
            }
        });
}

window.onload = function () {
  fetch("/oeuvres")
    .then((response) => response.json())
    .then((data) => {
      const galerie = document.getElementById("galerie");
      data.forEach((oeuvre) => {
        const element = document.createElement("div");
        element.textContent = `${oeuvre.prenom} ${oeuvre.nom} - ${oeuvre.commentaire}`;
        galerie.appendChild(element);
      });
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des œuvres:", error)
    );
};

document.addEventListener("DOMContentLoaded", initialisation);
