
const addTournamentButton = document.getElementById("addTournament");
const logOutButton = document.getElementById("logOut");

const editOptions = document.getElementById("editOptions");


const eventForm = document.getElementById("eventForm");

const tableContainer = document.getElementById("tableContainer");

const newTournamentName = document.getElementById("newTournamentName");
const tournamentStartTime = document.getElementById("startTime");
const tournamentEndTime = document.getElementById("endTime");

var trElements = document.querySelectorAll("#tableContainer");
var targetIndex = 6;
const editTournament = document.getElementById("editTournament");

let formHeading = document.getElementById("formHeading");

const tableBody = document.getElementById("tableBody");

const finishedTournamentImage = "../Images/FootballFinished.png";
const upcomingTournamentImage = "../Images/FootballUpcoming.png";
const runningTournamentImage = "../Images/FootballRunning.png";

const onPageLoading = () => {
    // getAllTournaments();
    const editOption = document.querySelectorAll(".editOption");
    const value = localStorage.getItem("admin");
    if(value == "false"){
        addTournamentButton.style.display = "none";
        logOutButton.style.display = "none";
        editOptions.style.display = "none";
        editOption.forEach(function(element) {
            element.style.display = "none";
        });
    }
    //getAllTournaments();
}



tableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editAction")) {

        var row = target.closest("tr");
        let eventName = row.cells[2].textContent;
        var formHeadingValue = formHeading.innerHTML;
        openForm(eventName);
        alert("Edit clicked for: " + formHeadingValue);
    }
    else if(target.classList.contains("deleteAction")){
        var row = target.closest("tr");
        var eventName = row.cells[2].textContent;
        alert("Delete clicked for: " + eventName);
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
    closeForm();
    if(date1=="" || date2=="" || tournamentName==""){
        alert("Please fill all the required data");
    }

    const Date1 = new Date(date1);
    const Date2 = new Date(date2);

    if(Date1>Date2){
        alert("Date1 can't be bigger than Date2");
    }else if(Date1.getTime() === Date2.getTime()){
        alert("Both date can't be same");
    }else{
        postTournamentData(tournamentName,date1,date2);
    }
    
}




const postTournamentData = (tournamentName,startingDate,endingDate) => {
    fetch('http://localhost:5050/api/tournament', {
        method: 'POST',
        body: JSON.stringify({
            tournamentId : tournamentName + startingDate,
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
            // if(response.status == 200){
            //     alert("Succesfully Event Created");
            // }
        })
        .then(data => {
            closeForm();
            showAtList(data);
        })
        .catch(error => console.log(error));
}

function showAtList(data){
    let newRow = document.createElement("tr");

    var cell1 = document.createElement("td");
    cell1.textContent = tableContainer.rows.length;
    newRow.append(cell1);

    var currentDate = new Date();
    var startingDate = new Date(data.startingDate);
    var endingDate = new Date(data.endingDate);
    // console.log(currentDate);
    var cell2 = document.createElement("td");
    var image = document.createElement("img");
    var p = document.createElement("p");
    p.className = "status";
    if(currentDate>endingDate){
        image.src = finishedTournamentImage;
        p.classList.add("finished");
        p.innerHTML = `Finished`;
    }else if(currentDate<startingDate){
        image.src = upcomingTournamentImage;
        p.classList.add("upcoming");
        p.innerHTML = `Upcoming`;
    }else if(currentDate>=startingDate && currentDate<=endingDate){
        image.src = runningTournamentImage;
        p.classList.add("running");
        p.innerHTML = `Running`;
    }

    cell2.append(image);
    newRow.append(cell2);

    var cell3 = document.createElement("td");
    cell3.textContent = data.tournamentName;
    newRow.append(cell3);

    var cell4 = document.createElement("td");
    cell4.textContent = data.startingDate;
    newRow.append(cell4);

    var cell5 = document.createElement("td");
    cell5.append(p);
    newRow.append(cell5);

    var cell6 = document.createElement("td");
    //cell6.className = "editOption";
    if(localStorage.getItem("admin") === "true"){
        if(currentDate<startingDate){
            var i1 = document.createElement("i");
            i1.className = "fa-regular fa-pen-to-square editAction";
            // i1.classList.add("fa-pen-to-square","editAction");
            var i2 = document.createElement("i");
            i2.className = "fa-solid fa-trash-can deleteAction";
            cell6.appendChild(i1);
            cell6.appendChild(i2);
            }else{
                var i1 = document.createElement("i");
                i1.className = "fa-solid fa-lock";
                cell6.appendChild(i1);
            }
            newRow.append(cell6);
                    
        }
                
    tableBody.append(newRow);

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
                    p.classList.add("finished");
                    p.innerHTML = `Finished`;
                }else if(currentDate<startingDate){
                    image.src = upcomingTournamentImage;
                    p.classList.add("upcoming");
                    p.innerHTML = `Upcoming`;
                }else{
                    image.src = runningTournamentImage;
                    p.classList.add("running");
                    p.innerHTML = `Running`;
                }

                cell2.append(image);
                newRow.append(cell2);

                var cell3 = document.createElement("td");
                cell3.textContent = item.tournamentName;
                newRow.append(cell3);

                var cell4 = document.createElement("td");
                cell4.textContent = item.startingDate;
                newRow.append(cell4);

                var cell5 = document.createElement("td");
                cell5.append(p);
                newRow.append(cell5);

                var cell6 = document.createElement("td");
                //cell6.className = "editOption";
                if(localStorage.getItem("admin") === "true"){
                    if(currentDate<startingDate){
                        var i1 = document.createElement("i");
                        i1.className = "fa-regular fa-pen-to-square editAction";
                // i1.classList.add("fa-pen-to-square","editAction");
                        var i2 = document.createElement("i");
                        i2.className = "fa-solid fa-trash-can deleteAction";
                        cell6.appendChild(i1);
                        cell6.appendChild(i2);
                    }else{
                        var i1 = document.createElement("i");
                        i1.className = "fa-solid fa-lock";
                        cell6.appendChild(i1);
                    }
                    newRow.append(cell6);
                    
                }
                

                tableBody.append(newRow);
            });
        })
        .catch(error => console.log(error));
}

getAllTournaments();
onPageLoading();