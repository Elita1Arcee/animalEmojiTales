var enterBtn = document.getElementById("enterBtn");
var userName = document.getElementById("userName");
var title = document.getElementById("title");

enterBtn.addEventListener("click", function(){
    if (userName.value.length > 1) {
        title.textContent = userName.value + "'s Animals";
        userName.value = "";
    }

})

userName.addEventListener("keydown", function(event) {
    if (userName.value.length > 1 && event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("13");
        title.textContent = userName.value + "'s Animals";
        userName.value = "";
        
    } else{
        console.log("Nope");
    }

})