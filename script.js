// Variable names and code for on click and keydown function

let enterBtn = document.getElementById("enterBtn");
let userName = document.getElementById("userName");
let title = document.getElementById("title");

// On click get name from user input and use it to update the title
enterBtn.addEventListener("click", () => {
    if (userName.value.length > 1) {
        title.textContent = userName.value + "'s Animals";
        userName.value = "";
    }

})

//On keydown/key press of enter button, get user input and use it to update the title
userName.addEventListener("keydown", (event) => {
    if (userName.value.length > 1 && event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("13");
        title.textContent = userName.value + "'s Animals";
        userName.value = "";
        
    } else{
        console.log("Nope");
    }

})

//Variables for color input and gradient container
let color1Btn = document.getElementById("color1");
let color2Btn = document.getElementById("color2");
let gradientBox = document.getElementById("gradientBox");

let randomClr = document.getElementById("randomClr");

//On window load, set color gradient for background and both color inputs
window.onload =  () => {
    gradientBox.style.background = "linear-gradient(" + color1Btn.value + "," + color2Btn.value + ")";
    
}

//Updates the gradient container to display whatever color input by user.
const gradientCtrl = () => {
    gradientBox.style.background = "linear-gradient(" + color1Btn.value + "," + color2Btn.value + ")";
}


//Function that produces a random hex color code
const getRandomColor = () => {
const letters = "0123456789ABCDEF";
    const color = "#";
    const color2 = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[(Math.floor(Math.random() * 16))];   
    } 
    return color;
}

//Function that gets two random colors for the gradient and updates the gradient container
const colorRandomizer = () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    
    color1Btn.value = color1;
    color2Btn.value = color2;

    gradientBox.style.background = "linear-gradient(" + color1 + "," + color2 + ")";
}

//Function that starts the process
const getRandomColors = ()=> {
    colorRandomizer();
}

color1Btn.addEventListener("input", gradientCtrl);
color2Btn.addEventListener("input", gradientCtrl);
randomClr.addEventListener("click", getRandomColors);

const addAniEmojiCont = () => {
    const node = document.createElement()
}