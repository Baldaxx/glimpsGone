// menu burger
function toggleMenu() {
  var menu = document.getElementById("menuBurgerDesign");
  menu.classList.toggle("menuShown");
}

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



  