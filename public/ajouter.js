document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formulaireProposerid")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      var form = $(this);
      if (form.parsley().isValid()) {
        submitForm();
      }
    });
});

// Fonction pour soumettre le formulaire
function submitForm() {
    const inputPrenom = document.getElementById("inputPrenom");
    const inputNom = document.getElementById("inputNom");
    const inputEmail = document.getElementById("inputEmail");
    const inputTelephone = document.getElementById("inputTelephone");
    const inputCommentaire = document.getElementById("inputCommentaire");

    const formObject = {
        prenom: inputPrenom.value,
        nom: inputNom.value,
        email: inputEmail.value,
        telephone: inputTelephone.value,
        commentaire: inputCommentaire.value,
    };

    fetch("/submit-form", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
    })
        .then((response) => response.json()) 
        .then((data) => {
            // alert(data.message); // Message de succès
            window.location.href = "ajouterMerci.html"; 
        })
        .catch((error) => {
            console.error("Erreur lors de la soumission du formulaire:", error);
            alert("Erreur lors de la soumission du formulaire. Veuillez réessayer.");
        });
}

