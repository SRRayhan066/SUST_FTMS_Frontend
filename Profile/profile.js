const pProfile = document.getElementById("pProfile");

const onPageLoading = () =>{
    const organizer = localStorage.getItem("organizer");
    const manager = localStorage.getItem("manager");
    const player = localStorage.getItem("player");

    pProfile.style.width = "80px";
    pProfile.style.fontSize = "16px";

    if(organizer == "true"){
        
    }else if(manager == "true"){

    }else if(player == "true"){

    }else{
        porichoy.innerHTML = "General";
        logOut.style.display = "none";
    }
}

onPageLoading();