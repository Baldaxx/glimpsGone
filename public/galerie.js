// Fonction pour afficher une oeuvre dans la galerie
function afficheOeuvre(oeuvre) {
  // Vérifie si l'oeuvre est valide
  if (!oeuvre || oeuvre.date_de_creation === undefined) {
    console.error("Aucune oeuvre à afficher.");
    return;
  }

  // Récupère l'année de création de l'oeuvre
const anneeDeCreation = new Date(oeuvre.date_de_creation * 1000).getFullYear();

  // Affiche le titre de l'oeuvre
  const titreOeuvreElement = document.getElementById("titreOeuvre");
  titreOeuvreElement.innerHTML = `${oeuvre.titre}<br><span>${oeuvre.artiste} ${anneeDeCreation}</span>`;
  titreOeuvreElement.style.display = "block";

  // Affiche la description de l'oeuvre
  const descriptionOeuvreElement = document.getElementById("descriptionOeuvre");
  descriptionOeuvreElement.innerHTML = oeuvre.description;
  descriptionOeuvreElement.style.display = "block";

  // Affiche le nombre de 'J'aime' de l'oeuvre
  const jaimeOeuvreElement = document.getElementById("jaimeOeuvre");
  jaimeOeuvreElement.innerHTML = oeuvre.compteur_jaime;

  // Affiche le nombre de 'J'aime pas' de l'oeuvre
  const jaimePasOeuvreElement = document.getElementById("jaimePasOeuvre");
  jaimePasOeuvreElement.innerHTML = oeuvre.compteur_jaime_pas;

  // Affiche le compteur JJ de l'oeuvre
  const compteurJJElement = document.getElementById("compteurJJ");
  compteurJJElement.style.display = "block";
}

// Tableau contenant toutes les oeuvres
let toutesLesOeuvres = [];
// Identifiant de l'oeuvre courante dans le tableau
let identifiantOeuvreCourante = 0;

// Fonction pour récupérer et afficher une oeuvre
function recupererEtAfficherOeuvre() {
  // Effectue une requête GET pour récupérer les oeuvres depuis l'API
  fetch("/api/oeuvres")
    .then((response) => response.json())
    .then((data) => {
      toutesLesOeuvres = data; // Stocke les oeuvres récupérées dans le tableau
      console.log(toutesLesOeuvres);
      // Vérifie s'il y a des oeuvres à afficher
      if (toutesLesOeuvres.length === 0) {
        window.location.href = "galerieDown.html"; // Redirige vers une page spécifique s'il n'y a pas d'oeuvre
      } else {
        afficheOeuvre(toutesLesOeuvres[identifiantOeuvreCourante]); // Affiche la première oeuvre du tableau
      }
    })
    .catch((error) => console.error("Erreur :", error)); // Affiche une erreur en cas d'échec de la requête
}

// Fonction d'initialisation du script
function initialisation() {
  recupererEtAfficherOeuvre(); // Appelle la fonction pour récupérer et afficher une oeuvre

  // Configuration des boutons d'interaction avec les oeuvres

  // Bouton 'J'aime'
  document.getElementById("btn_jaime").addEventListener("click", function () {
    fetch(
      `/api/oeuvres/${toutesLesOeuvres[identifiantOeuvreCourante].id}/jaime`, // Effectue une requête POST pour incrémenter les 'J'aime' de l'oeuvre
      { method: "POST" }
    )
      .then((response) => response.json())
      .then(() => {
        recupererEtAfficherOeuvre(); // Réaffiche l'oeuvre après l'incrémentation
      });
  });

  // Bouton 'J'aime pas'
  document
    .getElementById("btn_jaime_pas")
    .addEventListener("click", function () {
      fetch(
        `/api/oeuvres/${toutesLesOeuvres[identifiantOeuvreCourante].id}/jaimePas`, // Effectue une requête POST pour incrémenter les 'J'aime pas' de l'oeuvre
        { method: "POST" }
      )
        .then((response) => response.json())
        .then(() => {
          recupererEtAfficherOeuvre(); // Réaffiche l'oeuvre après l'incrémentation
        });
    });

  // Bouton 'Suivant'
  document.getElementById("btn_suivant").addEventListener("click", function () {
    if (identifiantOeuvreCourante + 1 < toutesLesOeuvres.length) {
      identifiantOeuvreCourante++; // Incrémente l'identifiant de l'oeuvre courante
      afficheOeuvre(toutesLesOeuvres[identifiantOeuvreCourante]); // Affiche l'oeuvre suivante
    } else {
      window.location.href = "galerieFin.html"; // Redirige vers une page spécifique s'il n'y a plus d'oeuvre à afficher
    }
  });

  // Bouton 'Précédent'
  document
    .getElementById("btn_precedent")
    .addEventListener("click", function () {
      if (identifiantOeuvreCourante - 1 >= 0) {
        identifiantOeuvreCourante--; // Décrémente l'identifiant de l'oeuvre courante
        afficheOeuvre(toutesLesOeuvres[identifiantOeuvreCourante]); // Affiche l'oeuvre précédente
      } else {
    window.location.href = "galerieFin.html"; // Affiche une alerte s'il n'y a plus d'oeuvre à afficher
      }
    });
}

// Attache l'événement d'initialisation lorsque le DOM est entièrement chargé
document.addEventListener("DOMContentLoaded", initialisation);
