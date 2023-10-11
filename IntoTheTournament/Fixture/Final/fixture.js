const tableContainer = document.getElementById("tableContainer");
const matchForm = document.getElementById("matchForm");

function toPrevious(){
    window.location.href = "../SemiFinal/fixture.html";
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

tableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editAction")) {
        var row = target.closest("tr");
        let matchName = row.cells[0].textContent;
        openForm();
        alert("Edit clicked for: " + matchName);
    }else if(target.classList.contains("group")){
        var row = target.closest("tr");
        let matchName = row.cells[0].textContent;
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