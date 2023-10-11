const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const formPopup = document.querySelector(".form-popup");



loginSignupLink.forEach(link => {
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    })
});

function toTournament(){
    localStorage.setItem("admin","true");
    window.location.href = "../Tournament/tournament.html";
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

const postData = (email,password) => {
    alert("Dhukse");
    fetch('http://localhost:5000/api/operator/login', {
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
                alert("Succesfully Logged in");
            }else{
                alert("Login Failed");
            }
        })
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

postData("ambia@sust.edu","123456");