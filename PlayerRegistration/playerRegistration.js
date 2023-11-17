const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const formPopup = document.querySelector(".form-popup");

const loginLink = document.getElementById("login-link");

const registrationButton = document.getElementById("registerPlayer");

const studentFullName = document.getElementById("studentFullName");
const studentEmail = document.getElementById("studentEmail");
const departmentList = document.getElementById("departmentList");
const studentRegistrationNo = document.getElementById("studentRegistrationNo");
const studentPassword = document.getElementById("studentPassword");
const studentConfirmPassword = document.getElementById("studentConfirmPassword");

const email = document.getElementById("email");
const password = document.getElementById("password");


const department = {
    deptCode: undefined,
    deptName: undefined
}

const departments = [department];

loginSignupLink.forEach(link => {
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    })
});


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
                departmentList.add(newOption);

                departments.push({deptCode:item.deptCode, deptName:item.deptName});
                

            });
        })
        .catch(error => console.log(error));
}

getAllDepartment();


const playerRegistration = (registrationNo,playerName,deptCode,playerEmail,playerPassword,playerImage) => {
    fetch('http://localhost:5050/api/player', {
        method: 'POST',
        body: JSON.stringify({
            playerRegNo: registrationNo,
            playerName: playerName,
            playerDeptCode: deptCode,
            playerEmail: playerEmail,
            playerPassword: playerPassword,
            playerImage: playerImage
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
            loginLink.click();
            alert("Player Registration Successfull");
        })
        .catch(error => console.log(error));
}

function submission(){
    var registrationNo = parseInt(studentRegistrationNo.value);
    var playerName = studentFullName.value;

    var deptCode;
    const selectedIndex = departmentList.selectedIndex;
    const selectedOption = departmentList.options[selectedIndex];
    if(selectedIndex == 0){
        alert("Select a department first");
    }else{
        deptCode = parseInt(selectedOption.value);
    }

    var playerEmail = studentEmail.value;
    var playerPassword = studentPassword.value;
    var playerConfirmPassword = studentConfirmPassword.value;
    var playerImage = "";

    if(!playerEmail.includes("@student.sust.edu")){
        alert("Use your edu-mail");
    }else if(playerPassword != playerConfirmPassword){
        alert("Password doesn't matches");
    }else{
        playerRegistration(registrationNo,playerName,deptCode,playerEmail,playerPassword,playerImage);
    }
}

function toTournament(){
    window.location.href = "../Tournament/tournament.html";
}

const loginStudent = (email,password) => {
    fetch('http://localhost:5050/api/player/login', {
        method: 'POST',
        body: JSON.stringify({
            playerEmail : email,
            playerPassword : password
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
            toTournament();
            alert("Login Successful");
        })
        .catch(error => console.log(error));
}

function loginFunction(){
    var userEmail = email.value;
    var userPassword = password.value;
    loginStudent(userEmail,userPassword);
}