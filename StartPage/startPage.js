const organizerButton = document.getElementById("organizerButton");
const managerButton = document.getElementById("managerButton");
const playerButton = document.getElementById("playerButton");
const toTheTournamentButton = document.getElementById("toTheTournamentButton");


organizerButton.addEventListener("click",function(){
    localStorage.setItem("organizer","true");
    localStorage.setItem("manager","false");
    localStorage.setItem("player","false");
    toLoginPage();
});

managerButton.addEventListener("click",function(){
    localStorage.setItem("organizer","false");
    localStorage.setItem("player","false");
    localStorage.setItem("manager","true");
    toLoginPage();
});

playerButton.addEventListener("click",function(){
    localStorage.setItem("organizer","false");
    localStorage.setItem("player","true");
    localStorage.setItem("manager","false");
    toPlayerRegistration();
});


function toPlayerRegistration(){
    window.location.href = "../PlayerRegistration/playerRegistration.html";
}

function toLoginPage(){
    window.location.href = "../Authentication/signInSignUp.html";
}

function toTournament(){
    localStorage.setItem("organizer","false");
    localStorage.setItem("manager","false");
    window.location.href = "../Tournament/tournament.html";
}
