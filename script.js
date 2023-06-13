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
});

//On keydown/key press of enter button, get user input and use it to update the title
userName.addEventListener("keydown", (event) => {
  if (
    (userName.value.length > 1 && event.code === "Enter") ||
    event.code === "NumpadEnter"
  ) {
    console.log("13");
    title.textContent = userName.value + "'s Animals";
    userName.value = "";
  }
});

//Variables for color input and gradient container
let color1Btn = document.getElementById("color1");
let color2Btn = document.getElementById("color2");
let gradientBox = document.getElementById("gradientBox");

let randomClr = document.getElementById("randomClr");

//On window load, set color gradient for background and both color inputs
window.onload = () => {
  gradientBox.style.background =
    "linear-gradient(" + color1Btn.value + "," + color2Btn.value + ")";
  AniCard.makeAniCard();
};

//Updates the gradient container to display whatever color input by user.
const gradientCtrl = () => {
  gradientBox.style.background =
    "linear-gradient(" + color1Btn.value + "," + color2Btn.value + ")";
};

//Function that produces a random hex color code
const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

//Function that gets two random colors for the gradient and updates the gradient container
const colorRandomizer = () => {
  let color1 = getRandomColor();
  let color2 = getRandomColor();

  color1Btn.value = color1;
  color2Btn.value = color2;

  gradientBox.style.background =
    "linear-gradient(" + color1 + "," + color2 + ")";
};

//Function that starts the process
const getRandomColors = () => {
  colorRandomizer();
};

color1Btn.addEventListener("input", gradientCtrl);
color2Btn.addEventListener("input", gradientCtrl);
randomClr.addEventListener("click", getRandomColors);

const addAnimalBtn = document.getElementById("addAnimal");

// Object contains styling class names and extra emoji animals. makeAniCard makes the card and puts it into array.
// getCard returns one card from the array and appends it to the grid container.

const AniCard = {
  completeCard: [],
  bgGradientColors: ["green", "red", "yellow", "blue", "purple", "brown"],
  addOnEmojiAnimals: ["🦒", "🐘", "🐨", "🐵", "🐶", "🐱"],
  addOnAnimalNames: ["giraffe", "elephant", "koala", "monkey", "dog", "cat"],
  makeAniCard() {
    const { completeCard, bgGradientColors, addOnEmojiAnimals } = this;
    for (let i = 0; i < addOnEmojiAnimals.length; i++) {
      let animalDiv = document.createElement("div");
      animalDiv.setAttribute("id", this.addOnAnimalNames[i]);
      animalDiv.classList.add("zone", bgGradientColors[i]);
      let emojiAnimalAdd = document.createTextNode(addOnEmojiAnimals[i]);
      animalDiv.appendChild(emojiAnimalAdd);
      completeCard.push(animalDiv);
    }
  },
  //this function also attaches the card id and adds an event listener to each card
  getCard() {
    let newCard = this.completeCard.pop();
    let sayCard = [];
    sayCard.push(newCard);
    sayCard.forEach((card) => {
      let addOnAnimalName = card.id;
      card.addEventListener("click", this.getName.bind(addOnAnimalName));
    });
    for (let index = -1; index < this.completeCard.length; index++) {
      return document.getElementById("allAnimalCont").prepend(newCard);
    }
  },
  //this function displays the name of the optional add-on animals and removes them on click
  getName() {
    let name = this;
    let displayCont = document.getElementById("emojiAnimalInfoCont");
    let showName = document.getElementById("aniEmojiNameDisplay");
    if (showName.textContent != name) {
      showName.textContent = name;
    } else {
      showName.textContent = "";
    }
  },
};

addAnimalBtn.addEventListener("click", () => {
  AniCard.getCard();
});

class EmojiAnimalInfo {
  //this class initializes the instance of EmojiAnimalInfo. By binding 'this',
  //it ensures the correct response, for the current card, or instance of EmojiAnimalInfo
  constructor(animalName, animalData) {
    this.animalName = animalName;
    this.animalData = animalData;
    this.animalName.addEventListener("click", this.display.bind(this));
  }

  //attaches id name and classes for the design of card. IdName is also
  //used to get the correct animal data
  display() {
    let idName = this.animalName.id;
    let idPic = document.getElementById(idName);
    let displayCont = document.getElementById("emojiAnimalInfoCont");
    displayCont.classList.add("zone", "white");
    let showName = document.getElementById("aniEmojiNameDisplay");
    let showStory = document.getElementById("aniEmojiNameStory");
    let playVoiceBtn = document.createElement("button");
    playVoiceBtn.setAttribute("id", "hearVoiceBtn")
    playVoiceBtn.classList.add("playButton");
    playVoiceBtn.textContent = "Hear";

    if (showName.textContent != idName) {
      const animal = this.animalData[idName];
      
      if (animal) {
        showName.textContent =
          idName + "\n" + idPic.textContent + "\n";
          showStory.textContent = animal.story;
          showName.appendChild(playVoiceBtn);
          playVoiceBtn.addEventListener("click", () => this.hearInfo(animal))
      }
    } else {
      showName.textContent = "";
    }
  }

  hearInfo(animal) {
    let utterance = new SpeechSynthesisUtterance(animal.story);
    utterance.rate = 1.2;
    utterance.pitch = 1.5;
speechSynthesis.speak(utterance);
  }
}

// fetches the data from the .json file. after a good response the data is stored in an object.
// the processed data is passed as an argument to the EmmojiAnimalInfo constructor
fetch("animals.json")
  .then((res) => res.json())
  .then((data) => {
    const animalData = {};
    for (const animal of data.animals) {
      animalData[animal.name] = animal;
    }

    const animalElements = document.querySelectorAll(".zone");
    animalElements.forEach((animalElement) => {
      const animalEmoji = new EmojiAnimalInfo(animalElement, animalData);
    });
  })
  .catch((err) => {
    console.log("Error loading animal data:", err);
  });
