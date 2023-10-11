
function toLoginPage(){
    window.location.href = "../Authentication/signInSignUp.html";
}

function toTournament(){
    localStorage.setItem("admin","false");
    window.location.href = "../Tournament/tournament.html";
}
