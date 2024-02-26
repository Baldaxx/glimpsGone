// menu burger
function toggleMenu() {
  var menu = document.getElementById("menuBurgerDesign");
  menu.classList.toggle("menuShown");
}

// librairie Parsley pour validation de formulaire
$(document).ready(function () {
  $(".formulaireProposer").parsley();
  Parsley.addMessages("fr", {
    defaultMessage: "Ce champ est obligatoire.",
  });
  Parsley.setLocale("fr");

  $(".formulaireProposer").on("submit", function (e) {
    e.preventDefault();
    if ($(this).parsley().isValid()) {
      window.location.href = "proposerMerci.html";
    }
  });
});

// Animation sur le titre
function applyGlitchEffect() {
  const title = document.querySelector(".titre");
  title.classList.add("glitch");

  setTimeout(() => {
    title.classList.remove("glitch");
  }, 1000);
}

function randomGlitchEffect() {
  const minTime = 10000;
  const maxTime = 2000;
  const randomTime = Math.random() * (maxTime - minTime) + minTime;

  setTimeout(() => {
    applyGlitchEffect();
    randomGlitchEffect();
  }, randomTime);
}
document.addEventListener("DOMContentLoaded", randomGlitchEffect);

function afficheOeuvre(oeuvre) {
  //titre
  const titreOeuvreElement = document.getElementById("titreOeuvre");
  const titreOeuvre = `${oeuvre["titre"]}<br><span>${oeuvre["artiste"]} ${oeuvre["date_de_creation"]}</span>`;
  titreOeuvreElement.innerHTML = titreOeuvre;
  titreOeuvreElement.style = "display:block";

  //description
  const descriptionOeuvreElement = document.getElementById("descriptionOeuvre");
  const descriptionOeuvre = `${oeuvre["description"]}`;
  descriptionOeuvreElement.innerHTML = descriptionOeuvre;
  descriptionOeuvreElement.style = "display:block";

  //jaime
  const jaimeOeuvreElement = document.getElementById("jaimeOeuvre");
  const jaimeOeuvre = `${oeuvre["compteur_jaime"]}`;
  jaimeOeuvreElement.innerHTML = jaimeOeuvre;

  //jaime pas
  const jaimePasOeuvreElement = document.getElementById("jaimePasOeuvre");
  const jaimePasOeuvre = `${oeuvre["compteur_jaime_pas"]}`;
  jaimePasOeuvreElement.innerHTML = jaimePasOeuvre;
  const compteurJJElement = document.getElementById("compteurJJ");
  compteurJJElement.style = "display:block";
}

document.addEventListener("DOMContentLoaded", () => {
  afficheOeuvre({
    titre: "Le Rêveur des Prairies",
    description: `Au cœur de cette vaste toile étendue, intitulée "Le Rêveur des Prairies", trône majestueusement un âne, dont la présence discrète évoque à la fois votre curiosité insatiable et votre aspiration indomptable à l'aventure. <br>Son regard, empreint de malice et de sagesse, semble scruter l'horizon lointain, où se dessinent les contours de l'inconnu. Autour de lui, la prairie s'étend à perte de vue, tel un océan de verdure infinie, vibrant de vie et de mystère.Chaque brin d'herbe, chaque pétale de fleur semble participer à un ballet harmonieux, offrant à vous, cher spectateur, un tableau vivant de diversité et de beauté. Les couleurs se mêlent dans une symphonie enchanteresse, tandis que les rayons du soleil, émergeant timidement à l'horizon, caressent la scène d'une lumière dorée, promettant un nouveau jour empli d'aventures et de découvertes.<br>
    Dans cet univers foisonnant de détails et de sensations, chaque élément semble avoir une histoire à raconter, un secret à révéler. Vous imaginez sans doute les doux murmures du vent dans les hautes herbes, les parfums enivrants des fleurs sauvages, le frisson de l'herbe sous les sabots de l'âne avide d'exploration.<br>
    Et puis, il y a cet âne, fier et déterminé, prêt à partir à l'aventure. Il incarne à lui seul le voyageur qui sommeille en chacun de nous, rappelant avec force que les plus grandes explorations débutent souvent par un simple pas dans l'inconnu. Son attitude résolue vous invite au dépassement de soi, à l'audace de franchir les frontières du connu pour plonger tête baissée dans l'océan de l'inconnu.<br>
    En contemplant cette scène empreinte de magie et de poésie, vous vous trouvez transporté dans un autre monde, où le temps semble suspendu et où les rêves prennent vie. <br>Car au-delà de la simple représentation artistique, "Le Rêveur des Prairies" éveille en chacun de vous cette soif d'aventure et cette fascination pour l'inconnu qui font battre le cœur de l'humanité depuis la nuit des temps.`,
    artiste: "Jerome Floyd",
    date_de_creation: "2024",
    compteur_jaime: 0,
    compteur_jaime_pas: 0,
  });
});

//SMTPJS
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulaireProposer");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

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
      To: 'virginie.baldacchino.menut@gmail.com',
      From: "virginie.baldacchino.menut@gmail.com",
      Subject: "Vous avez reçu un email de " + email,
      Body: ebody,
    }).then((message) => {
      if (message === "OK") {
        console.log("L'email est partit !");
        form.reset();
      } else {
        console.error("L'email n'est pas partit !", message);
      }
    });
  });
});

//Lien pour les boutons de formulaire 
 document.getElementById("boutonValiderInfos").onclick = function () {
   window.location.href = "infoMerci.html";
 };

  document.getElementById("boutonValiderProposer").onclick = function () {
    window.location.href = "proposerMerci.html";
  };

  