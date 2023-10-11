const scoreForm = document.getElementById("scoreForm");

const main11TableContainer = document.getElementById("main11TableContainer");
const extraPlayerTableContainer = document.getElementById("extraPlayerTableContainer");

const insteadOfDiv = document.getElementById("insteadOfDiv");

function toNext(){
    window.location.href = "../Team2Result/result.html";
}

function toPrevious(){
    window.location.href = "../TotalResult/result.html";
}

main11TableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editAction")) {
        var row = target.closest("tr");
        let playerName = row.cells[3].textContent;
        openForm("false");
        alert("Edit clicked for: " + playerName);
    }
});

extraPlayerTableContainer.addEventListener("click",function(event){
    const target = event.target;
    if (target.classList.contains("editAction")) {
        var row = target.closest("tr");
        let playerName = row.cells[3].textContent;
        openForm("true");
        alert("Edit clicked for: " + playerName);
    }
});

function openForm(check){
    if(check === "false"){
        insteadOfDiv.style.height = "0px";
        insteadOfDiv.style.visibility = "hidden";
    }else{
        insteadOfDiv.style.height = "50px";
        insteadOfDiv.style.visibility = "visible";
    }
    scoreForm.classList.add("open-eventForm");
}

function closeForm(){
    scoreForm.classList.remove("open-eventForm");
}