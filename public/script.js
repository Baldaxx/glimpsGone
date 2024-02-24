// menu burger
function toggleMenu() {
    var menu = document.getElementById("menuBurgerDesign");
    menu.classList.toggle("menuShown");
}

// librairie Parsley pour validation de formulaire
$(document).ready(function() {
    $('.formulaireProposer').parsley();
    Parsley.addMessages('fr', {
        defaultMessage: "Ce champ est obligatoire.",
    });
    Parsley.setLocale('fr');

    $('.formulaireProposer').on('submit', function(e) {
        e.preventDefault();
        if($(this).parsley().isValid()) {
            window.location.href = 'proposerMerci.html'; // 
        }
    });
});

// Animation sur le titre 
  function applyGlitchEffect() {
    const title = document.querySelector('.titre');
    title.classList.add('glitch');

    setTimeout(() => {
      title.classList.remove('glitch');
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
  document.addEventListener('DOMContentLoaded', randomGlitchEffect);

  function afficheOeuvre(titre, description, artiste, date, compteurJaime, compteurJaimePas){
    //titre
    const titreOeuvreElement = document.getElementById('titreOeuvre');
    const titreOeuvre = `${titre}<br><span>${artiste} ${date}</span>`;
    titreOeuvreElement.innerHTML = titreOeuvre;
    titreOeuvreElement.style = "display:block";

    //description
    const descriptionOeuvreElement = document.getElementById('descriptionOeuvre');
    const descriptionOeuvre = `${description}`;
    descriptionOeuvreElement.innerHTML = descriptionOeuvre;
    descriptionOeuvreElement.style = "display:block";

    //jaime
    const jaimeOeuvreElement = document.getElementById('jaimeOeuvre');
    const jaimeOeuvre = `${compteurJaime}`;
    jaimeOeuvreElement.innerHTML = jaimeOeuvre;

    //jaime pas
    const jaimePasOeuvreElement = document.getElementById ('jaimePasOeuvre');
    const jaimePasOeuvre = `${compteurJaimePas}`;
    jaimePasOeuvreElement.innerHTML = jaimePasOeuvre;
    const compteurJJElement = document.getElementById ('compteurJJ');
    compteurJJElement.style = "display:block";
  }

 document.addEventListener('DOMContentLoaded', ()=> {
    afficheOeuvre(
      "Le Rêveur des Prairies",
      `Au cœur de cette vaste toile étendue, intitulée "Le Rêveur des Prairies", trône majestueusement un âne, dont la présence discrète évoque à la fois votre curiosité insatiable et votre aspiration indomptable à l'aventure. <br>Son regard, empreint de malice et de sagesse, semble scruter l'horizon lointain, où se dessinent les contours de l'inconnu. Autour de lui, la prairie s'étend à perte de vue, tel un océan de verdure infinie, vibrant de vie et de mystère.`,
      "Jerome Floyd",
      "2024",
      0,
      0
    );
 });
