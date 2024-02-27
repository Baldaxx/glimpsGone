document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulaireProposer");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    // Vérification de la validation du formulaire
    if ($(form).parsley().isValid()) {
      const fname = document.getElementById("inputPrenom").value;
      const lname = document.getElementById("inputNom").value;
      const email = document.getElementById("inputEmail").value;
      const phone = document.getElementById("inputTelephone").value;
      const message = document.getElementById("inputCommentaire").value;

      let ebody = `
<b>Name: </b>${fname} ${lname}
<br>
<b>Email: </b>${email}
<br>
<b>Phone: </b>${phone}
<br>
<b>Message: </b>${message}
`;

      Email.send({
        SecureToken: "c8e9eed4-71f6-4903-b98e-194f06173484",
        To: "virginie.baldacchino.menut@gmail.com",
        From: "virginie.baldacchino.menut@gmail.com",
        Subject: "Vous avez reçu un email de " + email,
        Body: ebody,
      }).then((message) => {
        if (message === "OK") {
          console.log("L'email est parti !");
          form.reset(); 
          window.location.href = "infoMerci.html"; 
        } else {
          console.error("L'email n'est pas parti !", message);
        }
      });
    } else {
      $(form).parsley().validate(); 
    }
  });
});
