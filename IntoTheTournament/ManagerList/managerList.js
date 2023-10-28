const tournamentHeading = document.getElementById("tournamentHeading");
const tournamentName = localStorage.getItem("tournamentName");
tournamentHeading.innerHTML = tournamentName;

const tableContainer = document.getElementById("tableContainer");

const refreeForm = document.getElementById("refreeForm");
const refreeFormHeading = document.getElementById("refreeFormHeading");

const search = document.getElementById("searchInput");
const tableRows = document.getElementsByTagName("tr");

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

function printPage(){
    window.print();
}

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