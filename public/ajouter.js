
  document.getElementById("boutonValiderProposer").onclick = function () {
    window.location.href = "ajouterMerci.html";
  };
  $(".formulaireProposer").on("submit", function (e) {
    e.preventDefault();
    if ($(this).parsley().isValid()) {
      window.location.href = "ajouterMerci.html";
    }
  });
