const matchName = document.getElementById("matchName");
const matchNameValue = localStorage.getItem("matchName");
// matchName.innerHTML = matchNameValue;

const submissionButton = document.getElementById("submissionButton");

const scoreForm = document.getElementById("scoreForm");


const tieBreaker1 = document.getElementById("tieBreakerDiv1");
const tieBreaker2 = document.getElementById("tieBreakerDiv2");

const formContent = document.getElementById("form-content");

const porichoy = document.getElementById("porichoy");
const pScore = document.getElementById("pScore");

const onPageLoading = () =>{
    const organizer = localStorage.getItem("organizer");
    const manager = localStorage.getItem("manager");
    const player = localStorage.getItem("player");

    pScore.style.width = "80px";
    pScore.style.fontSize = "16px";

    if(organizer == "true"){
        
    }else if(manager == "true"){

    }else if(player == "true"){

    }else{
        porichoy.innerHTML = "General";
        logOut.style.display = "none";
    }
}

onPageLoading();

function toNext(){
    window.location.href = "../Team1Result/result.html";
}

function submitData(){
    const team1Score = document.getElementById("team1Score").value;
    const team2Score = document.getElementById("team2Score").value;
    alert(team1Score + " " + team2Score);
    if(team1Score === team2Score){
        formContent.style.padding = "50px 30px"
        tieBreaker1.style.height = "50px";
        tieBreaker2.style.height = "50px";
        tieBreaker1.style.visibility = "visible";
        tieBreaker2.style.visibility = "visible";
    }
}

function openForm(){
    formContent.style.padding = "85px 30px"
    tieBreaker1.style.height = "0px";
    tieBreaker2.style.height = "0px";
    tieBreaker1.style.visibility = "hidden";
    tieBreaker2.style.visibility = "hidden";
    scoreForm.classList.add("open-eventForm");
}

function closeForm(){
    formContent.style.padding = "85px 30px"
    tieBreaker1.style.height = "0px";
    tieBreaker2.style.height = "0px";
    tieBreaker1.style.visibility = "hidden";
    tieBreaker2.style.visibility = "hidden";
    scoreForm.classList.remove("open-eventForm");
}