// const tournamentHeading = document.getElementById("tournamentHeading");
const tournamentName = localStorage.getItem("tournamentName");
// tournamentHeading.innerHTML = tournamentName;

const tableContainer = document.getElementById("tableContainer");

const refreeForm = document.getElementById("refreeForm");
const refreeFormHeading = document.getElementById("refreeFormHeading");

const porichoy = document.getElementById("porichoy");
const pScore = document.getElementById("pScore");
const logOut = document.getElementById("logOut");

var allEditOption = document.getElementsByClassName('editOption');
var allDeleteOption = document.getElementsByClassName('deleteOption');

const editOptions = document.getElementById("editOptions");
const deleteOptions = document.getElementById("deleteOptions");

const pRefree = document.getElementById("pRefree");

const addRefree = document.getElementById("addRefree");

const onPageLoading = () =>{
    const organizer = localStorage.getItem("organizer");
    const manager = localStorage.getItem("manager");
    const player = localStorage.getItem("player");

    pRefree.style.width = "80px";
    pRefree.style.fontSize = "16px";

    if(organizer == "true"){
        
    }else if(manager == "true"){

    }else if(player == "true"){

    }else{
        porichoy.innerHTML = "General";
        for (var i = 0; i < allEditOption.length; i++) {
            allEditOption[i].style.display = 'none';
            allDeleteOption[i].style.display = 'none';
        }
        logOut.style.display = "none";
        editOptions.style.display = "none";
        deleteOptions.style.display = "none";
        addRefree.style.display = "none";
    }
}

onPageLoading();

function toTeamList(){
    window.location.href = "../TeamList/teamList.html";
}

function toFixture(){
    window.location.href = "../Fixture/GroupStage/fixture.html";
}

tableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editAction")) {

        var row = target.closest("tr");
        let refreeName = row.cells[2].textContent;
        openForm(refreeName);
        alert("Edit clicked for: " + refreeName);
    }
    else if(target.classList.contains("deleteAction")){
        var row = target.closest("tr");
        let refreeName = row.cells[2].textContent;
        alert("Delete clicked for: " + refreeName);
    }
});

function openForm(value){
    refreeFormHeading.innerHTML = value;
    refreeForm.classList.add("open-eventForm");
}

function closeForm(){
    refreeForm.classList.remove("open-eventForm");
}