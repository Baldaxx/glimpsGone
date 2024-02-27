
  document.getElementById("boutonValiderProposer").onclick = function () {
    window.location.href = "proposerMerci.html";
  };
  $(".formulaireProposer").on("submit", function (e) {
    e.preventDefault();
    if ($(this).parsley().isValid()) {
      window.location.href = "proposerMerci.html";
    }
  });
