const departmentHeading = document.getElementById("departmentNameHeading");
const departmentName = localStorage.getItem("departmentName");
departmentHeading.innerHTML = departmentName;

const editOptions = document.getElementById("editOptions");
const editOption = document.querySelectorAll(".editOption");

const logOutButton = document.getElementById("logOut");

const addPlayerButton = document.getElementById("addPlayer");

const playerForm = document.getElementById("playerForm");

const tableContainer = document.getElementById("tableContainer");

const search = document.getElementById("searchInput");
const tableRows = document.getElementsByTagName("tr");

const pPlayerList = document.getElementById("pPlayerList");

const porichoy = document.getElementById("porichoy");

const onPageLoading = () =>{
    const value = localStorage.getItem("admin");
    const organizer = localStorage.getItem("organizer");
    const manager = localStorage.getItem("manager");
    const player = localStorage.getItem("player");

    pPlayerList.style.width = "80px";
    pPlayerList.style.fontSize = "16px";

    if(organizer == "true"){
        addPlayerButton.style.display = "none";
        editOptions.style.display = "none";
        editOption.forEach(function(element) {
            element.style.display = "none";
        });
    }else if(manager == "true"){

    }else if(player == "true"){

    }else{
        addPlayerButton.style.display = "none";
        editOptions.style.display = "none";
        logOutButton.style.display = "none";
        porichoy.innerHTML = "General";
        editOption.forEach(function(element) {
            element.style.display = "none";
        });
    }
}

function toTeamList(){
    window.location.href = "../TeamList/teamList.html";
}

function toRefree(){
    window.location.href = "../Refree/refree.html";
}

function toFixture(){
    window.location.href = "../Fixture/GroupStage/fixture.html";
}

function openForm(){
    playerForm.classList.add("open-eventForm");
}

function closeForm(){
    playerForm.classList.remove("open-eventForm")
}

function moveInput(event,ownID,prevID,nextID){
    if(event.key === "Enter"){
        if(nextID != "null"){
            event.preventDefault();
            document.getElementById(nextID).focus();
        }
    }else if(event.key == "Shift"){
        if(prevID != "null"){
            event.preventDefault();
            document.getElementById(prevID).focus();
        }
    }
}

tableContainer.addEventListener("click",function(event){
    const target = event.target;
    if(target.classList.contains("deleteAction")){
        var row = target.closest("tr");
        var eventName = row.cells[3].textContent;
        alert("Delete clicked for: " + eventName);
    }
});

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