// Attend que le DOM soit entièrement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", function () {
  // Attache un gestionnaire d'événement à la soumission du formulaire
  document
    .getElementById("formulaireProposerid")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Empêche le comportement par défaut du formulaire

      // Vérifie si le formulaire est valide avec Parsley.js
      var form = $(this);
      if (form.parsley().isValid()) {
        submitForm(); // Soumet le formulaire si valide
      }
    });
});

// Fonction pour soumettre le formulaire
function submitForm() {
  // Récupère les valeurs des champs du formulaire
  const inputPrenom = document.getElementById("inputPrenom").value;
  const inputNom = document.getElementById("inputNom").value;
  const inputEmail = document.getElementById("inputEmail").value;
  const inputTelephone = document.getElementById("inputTelephone").value;
  const inputCommentaire = document.getElementById("inputCommentaire").value;

  // Crée un objet contenant les données du formulaire
  const formObject = {
    artiste: inputPrenom,
    titre: inputNom,
    email: inputEmail,
    telephone: inputTelephone,
    description: inputCommentaire,
  };

  // Envoie les données du formulaire au serveur via une requête POST
  fetch("/api/oeuvres", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject), // Convertit l'objet en format JSON
  })
    .then((response) => {
      // Vérifie si la réponse est OK
      if (!response.ok) {
        throw new Error("La réponse du réseau n'était pas ok");
      }
      return response.json(); // Renvoie les données JSON de la réponse
    })
    .then((data) => {
      window.location.href = "ajouterMerci.html"; // Redirige vers une page de remerciement en cas de succès
    })
    .catch((error) => {
      console.error("Erreur lors de la soumission du formulaire:", error);
      alert("Erreur lors de la soumission du formulaire. Veuillez réessayer."); // Affiche une alerte en cas d'erreur
    });
}
