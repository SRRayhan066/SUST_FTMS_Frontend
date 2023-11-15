
const addTournamentButton = document.getElementById("addTournament");
const tournamentButton = document.getElementById("tournament");
const logOutButton = document.getElementById("logOut");

const pTournament = document.getElementById("pTournament");

const editOptions = document.getElementById("editOptions");


const eventForm = document.getElementById("eventForm");

const tableContainer = document.getElementById("tableContainer");

const newTournamentName = document.getElementById("newTournamentName");
const tournamentStartTime = document.getElementById("startTime");
const tournamentEndTime = document.getElementById("endTime");
const tournamentNameLabel = document.getElementById("tournamentNameLabel");

var trElements = document.querySelectorAll("#tableContainer");
var targetIndex = 6;
const editTournament = document.getElementById("editTournament");

let formHeading = document.getElementById("formHeading");

const tableBody = document.getElementById("tableBody");

const finishedTournamentImage = "../Images/FootballFinished.png";
const upcomingTournamentImage = "../Images/FootballUpcoming.png";
const runningTournamentImage = "../Images/FootballRunning.png";

const addUpdateButton = document.getElementById("addUpdateButton");

var updatedTournamentId;

const search = document.getElementById("searchInput");
const tableRows = document.getElementsByTagName("tr");


class UpdatedTournamentInfo{
    constructor(){

    }
    setValue(tournamentId,tournamentName,tournamentStartTime,tournamentEndTime){
        this.tournamentId = tournamentId;
        this.tournamentName = tournamentName;
        this.tournamentStartTime = tournamentStartTime;
        this.tournamentEndTime = tournamentEndTime;
    }
}

let updatedTournamentInfo = new UpdatedTournamentInfo();

const onPageLoading = () => {
    // getAllTournaments();
    pTournament.style.width = "100px";
    pTournament.style.fontSize = "16px";

    const editOption = document.querySelectorAll(".editOption");
    const organizer = localStorage.getItem("organizer");
    const manager = localStorage.getItem("manager");
    if(manager == "true"){
        editOptions.style.display = "none";
        addTournamentButton.style.display = "none";
    }else if(organizer == "false" && manager == "false"){
        addTournamentButton.style.display = "none";
        logOutButton.style.display = "none";
        editOptions.style.display = "none";
        editOption.forEach(function(element) {
            element.style.display = "none";
        });
    }
    //getAllTournaments();
}

function isValidDate(dateString) {
    // Try creating a Date object from the input
    var dateObject = new Date(dateString);

    // Check if the created Date object is a valid date and not NaN
    return !isNaN(dateObject) && dateObject instanceof Date;
}



tableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editAction")) {
        addUpdateButton.innerHTML = "Update";
        var row = target.closest("tr");
        let serialNo = row.cells[0].textContent;
        let eventId = row.cells[1].textContent;
        let eventName = row.cells[2].textContent;
        let startingDate = row.cells[3].textContent;
        let endingDate = row.cells[4].textContent;

        getATournament(eventId);
        
        localStorage.setItem("isEdit","true");
        var formHeadingValue = formHeading.innerHTML;
        //openForm(updatedTournamentInfo.tournamentName,updatedTournamentInfo.tournamentStartTime,updatedTournamentInfo.tournamentEndTime);
    }
    else if(target.classList.contains("deleteAction")){
        var row = target.closest("tr");
        var eventName = row.cells[2].textContent;
        alert("Delete tournament enable");
        deleteTournament(eventName);
    }
    else if (target.tagName === "TD") {
        const row = target.parentNode;

        const serialNo = row.cells[0].textContent;
        const eventName = row.cells[2].textContent;
        const startingDate = row.cells[3].textContent;
        const status = row.cells[4].textContent;

        localStorage.setItem("tournamentName",eventName);
        window.location.href = "../IntoTheTournament/TeamList/teamList.html";
    }
});

addTournamentButton.addEventListener("click",function(){
    localStorage.setItem("isEdit","false");
    openForm("New Tournament","","","");
});

function openForm(heading,startingDate,endingDate){
    const isEdit = localStorage.getItem("isEdit");
    formHeading.innerHTML = heading;

    if(isEdit == "true"){
        newTournamentName.value = heading;
        tournamentNameLabel.style.display = "none";
        tournamentStartTime.value = startingDate;
        tournamentEndTime.value = endingDate;
        newTournamentName.disabled = true;
    }else{
        tournamentNameLabel.style.display = "block";
        newTournamentName.disabled = false;
        //tournamentNameLabel.style.fontSize = "0.95rem";
    }
    eventForm.classList.add("open-eventForm");
}

function closeForm(){
    tournamentStartTime.value = "";
    tournamentEndTime.value = "";
    newTournamentName.value = "";
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

const getATournament = (tournamentId) => {
    fetch('http://localhost:5050/api/tournament/'+tournamentId)
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            updatedTournamentInfo.setValue(data.tournamentId,data.tournamentName,data.tournamentStartTime,data.tournamentEndTime);
            openForm(data.tournamentName,data.startingDate,data.endingDate);
        })
        .catch(error => console.log(error));
}

function addTournament(){
    var date1 = tournamentStartTime.value;
    var date2 = tournamentEndTime.value;
    const tournamentName = newTournamentName.value;
    
    if(date1=="" || date2=="" || tournamentName==""){
        alert("Please fill all the required data");
    }

    if(!isValidDate(date2)){
        console.log(updatedTournamentInfo.tournamentEndTime);
        date2 = updatedTournamentInfo.tournamentEndTime;
    }

    const Date1 = new Date(date1);
    const Date2 = new Date(date2);

    if(Date1>Date2){
        alert("Date1 can't be bigger than Date2");
    }else if(Date1.getTime() === Date2.getTime()){
        alert("Both date can't be same");
    }else if(addUpdateButton.innerHTML == "Update"){
        //const tournamentId = tournamentName + startingDate;
        updateTournamentData(tournamentName,date1,date2,updatedTournamentInfo);
    }else{
        //closeForm();
        var tournamentId = generateRandomId();
        postTournamentData(tournamentId,tournamentName,date1,date2);
    }
    
}

function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
    }

    return randomId;
}

function addOnTable(item,index){
    let newRow = document.createElement("tr");

    var cell1 = document.createElement("td");
    cell1.textContent = index+1;
    newRow.append(cell1);

    var currentDate = new Date();
    var startingDate = new Date(item.startingDate);
    var endingDate = new Date(item.endingDate);
    // console.log(currentDate);
    var cell2 = document.createElement("td");
    var image = document.createElement("img");
    var p = document.createElement("p");
    p.className = "status";
    if(currentDate>endingDate){
        image.src = finishedTournamentImage;
        localStorage.setItem("upcoming","false");
        p.classList.add("finished");
        p.innerHTML = `Finished`;
    }else if(currentDate<startingDate){
        image.src = upcomingTournamentImage;
        localStorage.setItem("upcoming","true");
        p.classList.add("upcoming");
        p.innerHTML = `Upcoming`;
    }else{
        image.src = runningTournamentImage;
        p.classList.add("running");
        p.innerHTML = `Running`;
        localStorage.setItem("upcoming","false");
    }

    cell2.textContent = item.tournamentId;
    newRow.append(cell2);

    var cell3 = document.createElement("td");
    cell3.textContent = item.tournamentName;
    newRow.append(cell3);

    var cell4 = document.createElement("td");
    
    cell4.textContent = formatDate(startingDate);
    newRow.append(cell4);

    var cell5 = document.createElement("td");
    cell5.textContent = formatDate(endingDate);
    newRow.append(cell5);

    var cell6 = document.createElement("td");
    cell6.append(p);
    newRow.append(cell6);

    
    //cell7.className = "editOption";
    if(localStorage.getItem("organizer") == "true"){
        var cell7 = document.createElement("td");
        var cell8 = document.createElement("td");

        if(currentDate<startingDate){
            var i1 = document.createElement("i");
            i1.className = "fa-regular fa-pen-to-square editAction";
            var i2 = document.createElement("i");
            i2.className = "fa-solid fa-trash-can deleteAction";
            cell7.appendChild(i1);
            cell8.appendChild(i2);
        }else{
            var i1 = document.createElement("i");   
            i1.className = "fa-solid fa-lock lock";
            var i2 = document.createElement("i");   
            i2.className = "fa-solid fa-lock lock";
            cell7.appendChild(i1);
            cell8.appendChild(i2);
        }
        newRow.append(cell7);
        newRow.append(cell8);
    }
    

    tableBody.append(newRow);
}


const updateTournamentData = (tournamentName,startingDate,endingDate,updatedTournamentInfo) => {
    fetch('http://localhost:5050/api/tournament/'+updatedTournamentInfo.tournamentId, {
        method: 'PUT',
        body: JSON.stringify({
            tournamentId : updatedTournamentInfo.tournamentId,
            tournamentName : tournamentName,
            startingDate : startingDate,
            endingDate : endingDate
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            closeForm();
            console.log(data);
            location.reload();
        })
        .catch(error => console.log(error));
}

const postTournamentData = (tournamentId,tournamentName,startingDate,endingDate) => {
    // closeForm();
    fetch('http://localhost:5050/api/tournament', {
        method: 'POST',
        body: JSON.stringify({
            tournamentId : tournamentId,
            tournamentName : tournamentName,
            startingDate : startingDate,
            endingDate : endingDate
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            closeForm();
            addOnTable(data,tableBody.rows.length);
        })
        .catch(error => console.log(error));
}



const getAllTournaments = () => {
    fetch('http://localhost:5050/api/tournaments')
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(dataArray => {
            // console.log(dataArray);
            dataArray.forEach(function(item,index){
                // console.log(item);
               addOnTable(item,index);
            });
        })
        .catch(error => console.log(error));
}

const deleteTournament = (tournamentId) => {
    fetch('http://localhost:5050/api/tournament/'+tournamentId, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            location.reload();
            console.log(data);
        })
        .catch(error => console.log(error));
}

getAllTournaments();
onPageLoading();

search.addEventListener('input',searchTable);

function searchTable(){
    for(let i=1;i<tableRows.length;i++){
        let row = tableRows[i].getElementsByTagName("td");
        let tournamentNames = row[2].textContent.toLowerCase();
        let searchData = search.value.toLowerCase();

        tableRows[i].classList.toggle('hide',tournamentNames.indexOf(searchData) < 0);
        tableRows[i].style.setProperty(`--delay`,i/10 + 's');
    }

    document.querySelectorAll('tbody tr:not(.hide)').forEach((row,i)=>{
        console.log("Hey");
        row.style.backgroundColor = (i%2 == 0) ? '#0000000b' : 'transparent'; 
    });
}

function printPage(){
    window.print();
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    const dayWithSuffix = getDayWithSuffix(day);
  
    return `${dayWithSuffix} ${month} ${year}`;
}

function getDayWithSuffix(day) {
    if (day >= 11 && day <= 13) {
      return day + "th";
    }
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
}