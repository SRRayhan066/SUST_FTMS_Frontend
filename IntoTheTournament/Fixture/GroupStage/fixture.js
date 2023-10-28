const tableContainer = document.getElementById("tableContainer");
const matchForm = document.getElementById("matchForm");

const matchForm2 = document.getElementById("matchForm2");
const matchForm3 = document.getElementById("matchForm3");

const search = document.getElementById("searchInput");
const tableRows = document.getElementsByTagName("tr");

function toNext(){
    window.location.href = "../RoundOf16/fixture.html";
}

function toTeamList(){
    window.location.href = "../../TeamList/teamList.html";
}

function toRefree(){
    window.location.href = "../../Refree/refree.html";
}

tableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editActionA")) {
        var row = target.closest("tr");
        let matchName = row.cells[1].textContent;
        openForm();
        alert("Edit clicked for: " + matchName);
    }else if(target.classList.contains("editActionB")){
        var row = target.closest("tr");
        let matchName = row.cells[2].textContent;
        openForm();
        alert("Edit clicked for: " + matchName);
    }else if(target.classList.contains("groupA")){
        var row = target.closest("tr");
        let matchName = row.cells[1].textContent;
        localStorage.setItem("matchName",matchName);
        window.location.href = "../../Result/TotalResult/result.html";
    }else if(target.classList.contains("groupB")){
        var row = target.closest("tr");
        let matchName = row.cells[2].textContent;
        localStorage.setItem("matchName",matchName);
        window.location.href = "../../Result/TotalResult/result.html";
    }
});


function moveInput(event,ownID,prevID,nextID){
    if(event.key === "Enter"){
        if(nextID != "null"){
            event.preventDefault();
            document.getElementById(nextID).focus();
        }
    }else if(event.key === "Shift"){
        if(prevID != "null"){
            event.preventDefault();
            document.getElementById(prevID).focus();
        }
    }
}

function openForm(){
    matchForm.classList.add("open-eventForm");
}

function closeForm(){
    matchForm.classList.remove("open-eventForm");
}

function openForm2(){
    closeForm();
    matchForm2.classList.add("open-eventForm");
}

function closeForm2(){
    matchForm2.classList.remove("open-eventForm");
}

function openForm3(){
    closeForm2();
    matchForm3.classList.add("open-eventForm");
}

function closeForm3(){
    matchForm3.classList.remove("open-eventForm");
}

function toMatchForm1(){
    closeForm2();
    openForm();
}

function toMatchForm2(){
    closeForm3();
    openForm2();
}

function printPage(){
    window.print();
}

search.addEventListener('input',searchTable);

function searchTable(){
    for(let i=1;i<tableRows.length;i++){
        let row = tableRows[i].getElementsByTagName("td");
        let groupANames = row[1].textContent.toLowerCase();
        let groupBNames = row[2].textContent.toLowerCase();
        let searchData = search.value.toLowerCase();

        // if(groupANames.indexOf(searchData) < 0 && groupBNames.indexOf(searchData) < 0){
        //     tableRows[i].classList.toggle('hide',true);
        // }
        tableRows[i].classList.toggle('hide',groupANames.indexOf(searchData) < 0 && groupBNames.indexOf(searchData) < 0);
        //tableRows[i].classList.toggle('hide',groupBNames.indexOf(searchData) < 0);
        tableRows[i].style.setProperty(`--delay`,i/10 + 's');
    }

    document.querySelectorAll('tbody tr:not(.hide)').forEach((row,i)=>{
        console.log("Hey");
        row.style.backgroundColor = (i%2 == 0) ? '#0000000b' : 'transparent'; 
    });
}
