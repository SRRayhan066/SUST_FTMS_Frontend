const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const formPopup = document.querySelector(".form-popup");

loginSignupLink.forEach(link => {
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    })
});
