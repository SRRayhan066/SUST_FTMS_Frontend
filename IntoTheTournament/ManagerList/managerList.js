const tournamentHeading = document.getElementById("tournamentHeading");
const tournamentName = localStorage.getItem("tournamentName");
tournamentHeading.innerHTML = tournamentName;

const tableContainer = document.getElementById("tableContainer");

const refreeForm = document.getElementById("refreeForm");
const refreeFormHeading = document.getElementById("refreeFormHeading");

const search = document.getElementById("searchInput");
const tableRows = document.getElementsByTagName("tr");

const addManager = document.getElementById("addManager");

const managerMail = document.getElementById("managerMail");
const managerName = document.getElementById("managerName");
const managerDepartment = document.getElementById("managerDepartment");

const tableBody = document.getElementById("tableBody");

const department = {
    deptCode: undefined,
    deptName: undefined
}

const departments = [department];

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
        let email = row.cells[1].textContent;
        deleteTournament(tournamentName,email);
    }
});

function openForm(value){
    refreeFormHeading.innerHTML = value;
    refreeForm.classList.add("open-eventForm");
}

function closeForm(){
    managerDepartment.selectedIndex = 0;
    clearMails();
    refreeForm.classList.remove("open-eventForm");
}

function printPage(){
    window.print();
}

search.addEventListener('input',searchTable);

function searchTable(){
    for(let i=1;i<tableRows.length;i++){
        let row = tableRows[i].getElementsByTagName("td");
        let managerName = row[2].textContent.toLowerCase();
        let departmentName = row[3].textContent.toLowerCase();
        let searchData = search.value.toLowerCase();

        tableRows[i].classList.toggle('hide',managerName.indexOf(searchData) < 0 && departmentName.indexOf(searchData) < 0);
        tableRows[i].style.setProperty(`--delay`,i/10 + 's');
    }

    document.querySelectorAll('tbody tr:not(.hide)').forEach((row,i)=>{
        console.log("Hey");
        row.style.backgroundColor = (i%2 == 0) ? '#0000000b' : 'transparent'; 
    });
}

addManager.addEventListener("click",function(){
     let email = managerMail.options[managerMail.selectedIndex].text;
     postManager(email,tournamentName);
    // let name = managerName.value;
    // let department = managerDepartment.value;

});

const postManager = (email,tournamentId) => {
    fetch('http://localhost:5050/api/teammanager', {
        method: 'POST',
        body: JSON.stringify({
            email : email,
            tournamentId : tournamentId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            closeForm();
            location.reload();
            alert("Manager Sucessfully Added");
        })
        .catch(error => console.log(error));
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
                
                let newOption = document.createElement('option');
                newOption.value = item.deptCode;
                newOption.text = item.deptName;
                managerDepartment.add(newOption);

                departments.push({deptCode:item.deptCode, deptName:item.deptName});
                

            });
        })
        .catch(error => console.log(error));
}


getAllDepartment();

function clearMails() {
    while (managerMail.options.length > 1) {
      managerMail.remove(managerMail.options.length - 1);
    }
}

managerDepartment.addEventListener("click",function(){
    clearMails();
    const selectedIndex = managerDepartment.selectedIndex;
    const selectedOption = managerDepartment.options[selectedIndex];
    if(selectedIndex != 0){
        const deptCode = selectedOption.value;
        getAllTeacherMail(deptCode);
    }
});

const getAllTeacherMail = (deptCode) => {
    
    fetch('http://localhost:5050/api/teachers/'+deptCode)
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(dataArray => {
            //console.log(dataArray);
            dataArray.forEach(function(item,index){
                let newOption = document.createElement('option');

                newOption.value = item.name;
                newOption.text = item.email;

                //console.log(newOption.value);
                //console.log(newOption.text);
                //console.log(newOption.text);

                managerMail.add(newOption);

            });
        })
        .catch(error => console.log(error));
}

managerMail.addEventListener("click",function(){
    const selectedIndex = managerMail.selectedIndex;
    const selectedOption = managerMail.options[selectedIndex];
    if(selectedIndex != 0){
        //console.log(selectedOption.value);
        //console.log(selectedOption.text);
        managerName.value = selectedOption.value;
        managerName.disabled = true;
        document.getElementById("managerNameLabel").style.display = "none";
        
    }
});


const getAllManager = () => {
    fetch('http://localhost:5050/api/teammanagers/'+tournamentName)
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(dataArray => {
            //console.log(dataArray);
            dataArray.forEach(function(item,index){
                let newRow = document.createElement("tr");

                var cell1 = document.createElement("td");
                cell1.textContent = index+1;
                newRow.append(cell1);

                var cell2 = document.createElement("td");
                cell2.textContent = item.email;
                newRow.append(cell2);

                var cell3 = document.createElement("td");
                var cell4 = document.createElement("td");

                getATeacher(item.email,cell3,cell4);

                newRow.append(cell3);
                newRow.append(cell4);

                const check = localStorage.getItem("upcoming");
                console.log(check);

                if(localStorage.getItem("upcoming") == "true"){
                    var cell5 = document.createElement("td");
                    cell5.className = "editOption";
                    var i1 = document.createElement("i");
                    i1.className = "fa-solid fa-trash-can deleteAction";
                    cell5.appendChild(i1);
                    newRow.append(cell5);
                }

                tableBody.append(newRow);

            });
        })
        .catch(error => console.log(error));
}

getAllManager();

const getATeacher = (email,cell3,cell4) => {
    fetch('http://localhost:5050/api/teacher/'+email)
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            cell3.textContent = data.name;
            for(let i=0;i<departments.length;i++){
                if(departments[i].deptCode == data.deptCode){
                    cell4.textContent = departments[i].deptName;
                    break;
                }
            }
            
            
        })
        .catch(error => console.log(error));
}

const deleteTournament = (tournamentId,teamManagerEmail) => {
    fetch('http://localhost:5050/api/tournament/teammanager/'+tournamentId+'/'+teamManagerEmail, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            location.reload();
            console.log(data);
        })
        .catch(error => console.log(error));
}