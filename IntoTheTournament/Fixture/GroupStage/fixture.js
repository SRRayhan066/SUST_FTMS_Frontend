const tableContainer = document.getElementById("tableContainer");
const matchForm = document.getElementById("matchForm");

const matchForm2 = document.getElementById("matchForm2");
const matchForm3 = document.getElementById("matchForm3");

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

