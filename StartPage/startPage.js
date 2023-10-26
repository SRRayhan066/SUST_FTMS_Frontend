const organizerButton = document.getElementById("organizerButton");
const managerButton = document.getElementById("managerButton");
const toTheTournamentButton = document.getElementById("toTheTournamentButton");


organizerButton.addEventListener("click",function(){
    localStorage.setItem("organizer","true");
    localStorage.setItem("manager","false");
    toLoginPage();
});

managerButton.addEventListener("click",function(){
    localStorage.setItem("organizer","false");
    localStorage.setItem("manager","true");
    toLoginPage();
})

function toLoginPage(){
    window.location.href = "../Authentication/signInSignUp.html";
}

function toTournament(){
    localStorage.setItem("organizer","false");
    localStorage.setItem("manager","false");
    window.location.href = "../Tournament/tournament.html";
}
