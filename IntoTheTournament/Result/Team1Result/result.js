const scoreForm = document.getElementById("scoreForm");

const main11TableContainer = document.getElementById("main11TableContainer");
const extraPlayerTableContainer = document.getElementById("extraPlayerTableContainer");

const insteadOfDiv = document.getElementById("insteadOfDiv");

const porichoy = document.getElementById("porichoy");
const logOut = document.getElementById("logOut");

const pScore = document.getElementById("pScore");
const editOptions = document.getElementsByClassName("editOptions");
const editAction = document.getElementsByClassName('fa-regular fa-pen-to-square editAction');

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
        for (var i = 0; i < editAction.length; i++) {
            editAction[i].style.display = "none";
            
        }
        for (var i = 0; i < editOptions.length; i++) {
            editOptions[i].style.display = "none";
        }
        
    }
}

onPageLoading();

function toNext(){
    window.location.href = "../Team2Result/result.html";
}

function toPrevious(){
    window.location.href = "../TotalResult/result.html";
}

main11TableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editAction")) {
        var row = target.closest("tr");
        let playerName = row.cells[3].textContent;
        openForm("false");
        alert("Edit clicked for: " + playerName);
    }
});

extraPlayerTableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editAction")) {
        var row = target.closest("tr");
        let playerName = row.cells[3].textContent;
        openForm("true");
        alert("Edit clicked for: " + playerName);
    }
});

function openForm(check){
    if(check === "false"){
        insteadOfDiv.style.height = "0px";
        insteadOfDiv.style.visibility = "hidden";
    }else{
        insteadOfDiv.style.height = "50px";
        insteadOfDiv.style.visibility = "visible";
    }
    scoreForm.classList.add("open-eventForm");
}

function closeForm(){
    scoreForm.classList.remove("open-eventForm");
}