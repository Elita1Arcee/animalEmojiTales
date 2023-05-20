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


var color1Btn = document.getElementById("color1");
var color2Btn = document.getElementById("color2");
var gradientBox = document.getElementById("gradientBox");
var currentStyles = window.getComputedStyle(gradientBox, null);
var bgColor = currentStyles.getPropertyValue("background");

function intialLoad() {
    console.log(bgColor);
}

intialLoad();

function gradientCtrl() {
    gradientBox.style.background = "linear-gradient(" + color1Btn.value + "," + color2Btn.value + ")";
}

color1Btn.addEventListener("input", gradientCtrl);

color2Btn.addEventListener("input", gradientCtrl);
