const tableContainer = document.getElementById("tableContainer");
const matchForm = document.getElementById("matchForm");

function toNext(){
    window.location.href = "../SemiFinal/fixture.html";
}

function toPrevious(){
    window.location.href = "../GroupStage/fixture.html";
}

function toTeamList(){
    window.location.href = "../../TeamList/teamList.html";
}

function toFixture(){
    window.location.href = "../GroupStage/fixture.html";
}

function toRefree(){
    window.location.href = "../../Refree/refree.html";
}

function openForm(){
    matchForm.classList.add("open-eventForm");
}

function closeForm(){
    matchForm.classList.remove("open-eventForm");
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