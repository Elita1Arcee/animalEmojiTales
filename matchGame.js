class Memory {
    constructor(numOfCards, gameContainerElement) {
        this.numOfCards = numOfCards;
        this.gameContainerElement = gameContainerElement;
        this.cards = [];
        this.matches = 0;
        this.misses = 0;
        this.flippedCards = [];
    }
       initGame() {
        let memoryCompleteCards = [];
        const bgGradientColors = ["green", "red", "yellow", "blue", "purple", "brown"];
        const memoryAniEmojis =  ["🦒", "🐘", "🐨", "🐵", "🐶", "🐱", "🦊", "🐰", "🐸", "🦁", "🐯", "🐭", "🦄", "🐲", "🐷", "🐺", "🐼", "🐻"];
        const memoryAniEmojisNames = ["Giraffe", "Elephant", "Koala", "Monkey", "Dog", "Cat", "Fox", "Rabbit", "Frog", "Lion", "Tiger", "Mouse", "Unicorn", "Dragon", "Pig", "Wolf", "Panda", "Bear"];

        const memoryAniCards = memoryAniEmojis.map((card, i) =>{
        let memoryAnimalDiv = document.createElement("div");
        memoryAnimalDiv.setAttribute("id", memoryAniEmojisNames[i]);
        memoryAnimalDiv.classList.add("zone");
          let memoryAnimalAdd = document.createTextNode(memoryAniEmojis[i]);
        memoryAnimalDiv.appendChild(memoryAnimalAdd);
        memoryCompleteCards.push(memoryAnimalDiv);
       
    })
    let memGameBoard = document.getElementById("gameBoard");
    for (let index = 0; index < memoryCompleteCards.length; index++) {
        const bgGradientColorIndex = index % bgGradientColors.length;
        const bgColors = bgGradientColors[bgGradientColorIndex];
        console.log(bgColors);
        memoryCompleteCards[index].classList.add(bgColors);
    }
    console.log(memoryCompleteCards);
    memoryCompleteCards.map(memCards =>{
        memGameBoard.appendChild(memCards);
    })
    }
    
    }

    let test1 = new Memory;
    test1.initGame();