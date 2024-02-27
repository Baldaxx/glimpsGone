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
  const formData = new FormData(
    document.getElementById("formulaireProposerid")
  );
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  fetch("/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  })
    .then((response) => response.json()) // Supposons que le serveur renvoie du JSON
    .then((data) => {
      alert(data.message); // Message de succès
      window.location.href = "/galerie"; // Redirection vers la galerie
    })
    .catch((error) => {
      console.error("Erreur lors de la soumission du formulaire:", error);
      alert("Erreur lors de la soumission du formulaire. Veuillez réessayer.");
    });
}

