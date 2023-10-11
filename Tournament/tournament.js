
const addTournamentButton = document.getElementById("addTournament");
const logOutButton = document.getElementById("logOut");

const editOptions = document.getElementById("editOptions");
const editOption = document.querySelectorAll(".editOption");

const eventForm = document.getElementById("eventForm");

const tableContainer = document.getElementById("tableContainer");

const newTournamentName = document.getElementById("newTournamentName");
const tournamentStartTime = document.getElementById("startTime");
const tournamentEndTime = document.getElementById("endTime");

var trElements = document.querySelectorAll("#tableContainer");
var targetIndex = 6;
const editTournament = document.getElementById("editTournament");

let formHeading = document.getElementById("formHeading");

const onPageLoading = () => {
    const value = localStorage.getItem("admin");
    if(value == "false"){
        addTournamentButton.style.display = "none";
        logOutButton.style.display = "none";
        editOptions.style.display = "none";
        editOption.forEach(function(element) {
            element.style.display = "none";
        });
    }
}

trElements.forEach(function(tr) {
    var tdElements = tr.querySelectorAll("td");

    tdElements.forEach(function(td, index) {
      if (index === targetIndex) {
        editTournament.addEventListener("click", function() {
            
        //   var clickedData = td.textContent;
        //   localStorage.setItem("matchName",clickedData);
        //   window.location.href = "../../Result/TotalResult/result.html";
        });
      }
    });
});

tableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editAction")) {

        var row = target.closest("tr");
        let eventName = row.cells[3].textContent;
        var formHeadingValue = formHeading.innerHTML;
        openForm(eventName);
        alert("Edit clicked for: " + formHeadingValue);
    }
    else if(target.classList.contains("deleteAction")){
        var row = target.closest("tr");
        var eventName = row.cells[3].textContent;
        alert("Delete clicked for: " + eventName);
    }
    else if (target.tagName === "TD") {
        const row = target.parentNode;

        const serialNo = row.cells[0].textContent;
        const eventId = row.cells[2].textContent;
        const eventName = row.cells[3].textContent;
        const startingDate = row.cells[4].textContent;
        const status = row.cells[5].textContent;

        localStorage.setItem("tournamentName",eventName);
        window.location.href = "../IntoTheTournament/TeamList/teamList.html";
    }
});

function openForm(heading){
    formHeading.innerHTML = heading;
    eventForm.classList.add("open-eventForm");
}

function closeForm(){
    eventForm.classList.remove("open-eventForm");
}

function moveInput(event,ownId,prevId,nextId){
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

function addTournament(){
    const date1 = tournamentStartTime.value;
    const date2 = tournamentEndTime.value;
    const tournamentName = newTournamentName.value;

    if(date1=="" || date2=="" || tournamentName==""){
        alert("Please fill all the required data");
    }

    const Date1 = new Date(date1);
    const Date2 = new Date(date2);

    if(Date1>Date2){
        alert("Date1 can't be bigger than Date2");
    }else if(Date1.getTime() === Date2.getTime()){
        alert("Both date can't be same");
    }
}

onPageLoading();