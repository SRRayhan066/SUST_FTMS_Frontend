const tournamentHeading = document.getElementById("tournamentHeading");
const tournamentName = localStorage.getItem("tournamentName");
tournamentHeading.innerHTML = tournamentName;

const tableContainer = document.getElementById("tableContainer");

const refreeForm = document.getElementById("refreeForm");
const refreeFormHeading = document.getElementById("refreeFormHeading");

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