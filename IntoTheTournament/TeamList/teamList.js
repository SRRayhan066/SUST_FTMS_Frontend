const tournamentHeading = document.getElementById("tournamentHeading");

const tournamentName = localStorage.getItem("tournamentName");

tournamentHeading.innerHTML = tournamentName;


const addTeamButton = document.getElementById("addTeam");
const logOutButton = document.getElementById("logOut");

const editOptions = document.getElementById("editOptions");
const editOption = document.querySelectorAll(".editOption");

const eventForm = document.getElementById("eventForm");
const eventForm2 = document.getElementById("eventForm2");

const editForm = document.getElementById("editForm");

const tableContainer = document.getElementById("tableContainer");

function toNext(){
    closeForm();
    eventForm2.classList.add("open-eventForm");
}

function toPrevious(){
    eventForm2.classList.remove("open-eventForm");
    openForm();
}

function toPlayerList(){
    window.location.href = "../PlayerList/playerList.html";
}

function toRefree(){
    window.location.href = "../Refree/refree.html";
}

function toFixture(){
    window.location.href = "../Fixture/GroupStage/fixture.html";
}

function moveInput(event, ownId, prevId, nextId){
    if(event.key === "Enter"){
        if(nextId != "null"){
            event.preventDefault();
            document.getElementById(nextId).focus();
        }
    }else if(event.key === "Shift"){
        if(prevId != "null"){
            event.preventDefault();
            document.getElementById(prevId).focus();
        }
    }
}

const onPageLoading = () => {
    const organizer = localStorage.getItem("organizer");
    const manager = localStorage.getItem("manager");
    
    if(organizer == "true"){
        addTeamButton.style.display = "none";
        editOptions.style.display = "none";
        editOption.forEach(function(element) {
            element.style.display = "none";
        });
    }else if(manager == "true"){

    }else{
        addTeamButton.style.display = "none";
        logOutButton.style.display = "none";
        editOptions.style.display = "none";
        editOption.forEach(function(element) {
            element.style.display = "none";
        });
    }
}

tableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editAction")) {

        var row = target.closest("tr");
        let teamName = row.cells[2].textContent;
        // var formHeadingValue = formHeading.innerHTML;
        // openForm(eventName);
        openEditForm(teamName);
        alert("Edit clicked for: " + teamName);
    }
    else if(target.classList.contains("deleteAction")){
        var row = target.closest("tr");
        var teamName = row.cells[2].textContent;
        alert("Delete clicked for: " + teamName);
    }
    if (target.tagName === "TD") {
        const row = target.parentNode;

        const serialNo = row.cells[0].textContent;
        const departmentCode = row.cells[1].textContent;
        const departmentName = row.cells[2].textContent;
        const submissionDate = row.cells[3].textContent;
        const teamManager = row.cells[4].textContent;

        localStorage.setItem("departmentName",departmentName);
        window.location.href = "../PlayerList/playerList.html";
    }
});

function openForm(){
    eventForm.classList.add("open-eventForm");
}

function closeForm(){
    eventForm.classList.remove("open-eventForm");
}

function closeForm2(){
    eventForm2.classList.remove("open-eventForm");
}

function openEditForm(teamName){
    document.getElementById("teamName").textContent = teamName;
    editForm.classList.add("open-eventForm");
}

function closeEditForm(){
    editForm.classList.remove("open-eventForm");
}

onPageLoading();