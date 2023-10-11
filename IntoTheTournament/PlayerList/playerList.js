const departmentHeading = document.getElementById("departmentNameHeading");
const departmentName = localStorage.getItem("departmentName");
departmentHeading.innerHTML = departmentName;

const editOptions = document.getElementById("editOptions");
const editOption = document.querySelectorAll(".editOption");

const logOutButton = document.getElementById("logOut");

const addPlayerButton = document.getElementById("addPlayer");

const playerForm = document.getElementById("playerForm");

const tableContainer = document.getElementById("tableContainer");

const onPageLoading = () =>{
    const value = localStorage.getItem("admin");
    if(value == "false"){
        addPlayerButton.style.display = "none";
        editOptions.style.display = "none";
        logOutButton.style.display = "none";
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