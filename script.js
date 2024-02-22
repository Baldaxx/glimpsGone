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

