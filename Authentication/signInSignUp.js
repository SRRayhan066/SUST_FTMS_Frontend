
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const formPopup = document.querySelector(".form-popup");

const email = document.getElementById("email");
const password = document.getElementById("password");

loginSignupLink.forEach(link => {
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    })
});

function toTournament(){
    
    window.location.href = "../Tournament/tournament.html";
    localStorage.setItem("admin","true");
}

function moveInput(event,ownId,nextInputId){
    if(event.key === "Enter"){
        if(ownId != "password"){
            event.preventDefault();
            document.getElementById(nextInputId).focus();
        }
    }else if(event.key === "Shift"){
        if(ownId != "email"){
            event.preventDefault();
            document.getElementById(nextInputId).focus();
        }
    }
}

function adminLogin(){
    postData(email.value , password.value);
    // if(email.value == "admin" && password.value == "admin"){
        
    //     window.location.href = "../Tournament/tournament.html";
    //     alert("Login Successfull");
    // }
}

const postData = (email,password) => {
    fetch('http://localhost:5050/api/operator/login', {
        method: 'POST',
        body: JSON.stringify({
            email : email,
            password : password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            // if (!response.ok) {
            //     throw new Error("ERROR: ${response.status}");
            // }
            // return response.json();
            if(response.status == 200){
                toTournament();
                alert("Login Successfull");
            }else{
                alert("Login Failed");
            }
        })
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

