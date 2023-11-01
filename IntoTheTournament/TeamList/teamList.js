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

var departmentCode;

// const player1 = document.getElementById("player1");
// const player2 = document.getElementById("player2");
// const player3 = document.getElementById("player3");
// const player4 = document.getElementById("player4");
// const player5 = document.getElementById("player5");
// const player6 = document.getElementById("player6");
// const player7 = document.getElementById("player7");
// const player8 = document.getElementById("player8");
// const player9 = document.getElementById("player9");
// const player10 = document.getElementById("player10");
// const player11 = document.getElementById("player11");
// const player12 = document.getElementById("player12");
// const player13 = document.getElementById("player13");
// const player14 = document.getElementById("player14");
// const player15 = document.getElementById("player15");
// const player16 = document.getElementById("player16");
// const player17 = document.getElementById("player17");
// const player18 = document.getElementById("player18");
// const player19 = document.getElementById("player19");
// const player20 = document.getElementById("player20");


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


const getATeacher = (email) => {
    fetch('http://localhost:5050/api/teacher/'+email)
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            //console.log(dataArray);
            const teacherName = data.name;
            departmentCode = data.deptCode;

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



addTeamButton.addEventListener("click",function(){
    openForm();
    getATeacher(managerMail);
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

    console.log(tournamentName);
    console.log(submissionDate);
    console.log(departmentCode);
    console.log(managerMail);
    console.log(captainReg);
    console.log(playersReg);
    console.log(isKnockedOut);

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