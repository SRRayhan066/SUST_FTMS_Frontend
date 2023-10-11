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