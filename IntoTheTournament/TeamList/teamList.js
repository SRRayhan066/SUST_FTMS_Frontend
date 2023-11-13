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

const search = document.getElementById("searchInput");
const tableRows = document.getElementsByTagName("tr");

const managerMail = localStorage.getItem("email");

const submitTeamButton = document.getElementById("submitTeamButton");

// Form input id
const teamName = document.getElementById("teamName");
const submissionTime = document.getElementById("submissionTime");
const teamManager = document.getElementById("teamManager");

const teamCaptain = document.getElementById("teamCaptain");

const tableBody = document.getElementById("tableBody");

var departmentCode;
let teacherName;
var departmentName;
var balerName;


const department = {
    deptCode: undefined,
    deptName: undefined
}

const departments = [department];


function toNext(){
    closeForm();
    eventForm2.classList.add("open-eventForm");
}

function toPrevious(){
    eventForm2.classList.remove("open-eventForm");
    openForm();
}

const getATeacher = (email) => {
    fetch('http://localhost:5050/api/teacher/'+email)
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            console.log("email "+ email);
            
            //console.log(dataArray);
            
            teacherName = data.name;
            
            console.log(data);
            
            departmentCode = data.deptCode;
            balerName = data.name;
            if(email != managerMail){
                return balerName;
            }
            console.log(departmentCode);

            for(let i=0;i<departments.length;i++){
                if(departments[i].deptCode == departmentCode){
                    teamName.value = departments[i].deptName;
                    teamName.disabled = true;
                    document.getElementById("teamNameLabel").style.display = "none";
                    break;
                }
            }

            submissionTime.value = currentDate();
            submissionTime.disabled = true;
            document.getElementById("submissionTimeLabel").style.display = "none";

            teamManager.value = teacherName;
            teamManager.disabled = true;
            document.getElementById("teamManagerLabel").style.display = "none";
            
        })
        .catch(error => console.log(error));
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

function toManager(){
    window.location.href = "../ManagerList/managerList.html";
}

const getAllDepartment = () => {
    fetch('http://localhost:5050/api/depts')
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(dataArray => {
            //console.log(dataArray);
            dataArray.forEach(function(item,index){
                departments.push({deptCode:item.deptCode, deptName:item.deptName});
            });
        })
        .catch(error => console.log(error));
}

getAllDepartment();






addTeamButton.addEventListener("click",function(){
    getATeacher(managerMail);
    openForm();
});

function currentDate(){
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; 
    var day = currentDate.getDate();

    var formattedDate = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;

    return formattedDate;
}

submitTeamButton.addEventListener("click",function(){
    const playersReg = new Array(20);
    for(let i=1;i<=20;i++){
        var inputId = "player" + i;
        var inputValue = document.getElementById(inputId).value;
        //console.log(inputValue);
        playersReg[i-1] = parseInt(inputValue,10);
        console.log(playersReg[i-1]);
    }
    const submissionDate = submissionTime.value;
    const isKnockedOut = 0;
    const captainReg = parseInt(teamCaptain.value,10);
    const teamDeptCode = parseInt(departmentCode,10);

    createTeam(tournamentName,submissionDate,teamDeptCode,managerMail,captainReg,playersReg,isKnockedOut);
});

const createTeam = (tournamentId,submissionDate,deptCode,managerMail,captainReg,playersReg,isKnockedOut) => {
    fetch('http://localhost:5050/api/team', {
        method: 'POST',
        body: JSON.stringify({
            "tournamentId": tournamentId,
            "teamSubmissionDate": submissionDate,
            "deptCode": deptCode,
            "teamManagerEmail": managerMail,
            "teamCaptainRegID": captainReg,
            "playerRegNo": playersReg,
            "isKnockedOut": isKnockedOut
          }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            //closeForm();
            //location.reload();
            alert("Team Sucessfully Added");
        })
        .catch(error => console.log(error));
}



const getAllTeam = (tournamentId) => {
    fetch('http://localhost:5050/api/tournament/teams/'+tournamentId)
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(dataArray => {
            console.log(dataArray);
            dataArray.forEach(function(item,index){
                let newRow = document.createElement("tr");

                var cell1 = document.createElement("td");
                cell1.textContent = index+1;
                newRow.append(cell1);

                var cell2 = document.createElement("td");
                cell2.textContent = item.deptCode;
                newRow.append(cell2);

                var cell3 = document.createElement("td");
                for(let i=0;i<departments.length;i++){
                    console.log(departments[i].deptCode);
                    console.log(departments[i].deptName);
                    if(departments[i].deptCode == item.deptCode){
                        cell3.textContent = departments[i].deptName;
                        break;
                    }
                }

                newRow.append(cell3);

                var cell4 = document.createElement("td");
                cell4.textContent = formatDate(new Date(item.teamSubmissionDate));
                newRow.append(cell4);

                var cell5 = document.createElement("td");
                console.log("item mail "+item.teamManagerEmail);
                //const balerName = 
                cell5.textContent = item.teamManagerEmail;
                newRow.append(cell5);

                tableBody.append(newRow);
            });
        })
        .catch(error => console.log(error));
}

getAllTeam(tournamentName);

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

