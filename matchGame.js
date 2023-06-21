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
        this.makeMemCards();
        let memGameTable = document.getElementById("gameTable");
        const memGameBoard = document.getElementById("gameBoard");
        this.gameContainerElement = memGameBoard;
        const memTitleHolder = document.createElement('div');
        const memTitle = document.createTextNode("Select your number of cards to match")
        const memTitleh2 = document.createElement("h2");
        memTitleh2.appendChild(memTitle);
        memTitleHolder.appendChild(memTitleh2);
        memGameTable.appendChild(memTitleHolder);
        const threeCardGamebtn = document.createElement("button");
        const threeCardGame = document.createTextNode("Match 3 Cards");
        threeCardGamebtn.appendChild(threeCardGame);
        memGameTable.appendChild(threeCardGamebtn);
        threeCardGamebtn.addEventListener("click", () =>{
            console.log('beginner level');
            this.startThreeCardGame();
        })
        
        // memoryCompleteCards.map(memCards =>{
        //     memGameBoard.appendChild(memCards);
        // })
    }

    makeMemCards() {
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
    
    for (let index = 0; index < memoryCompleteCards.length; index++) {
        const bgGradientColorIndex = index % bgGradientColors.length;
        const bgColors = bgGradientColors[bgGradientColorIndex];
        memoryCompleteCards[index].classList.add(bgColors);
    }
    
    this.cards = memoryCompleteCards;
   
    }

    shuffleMemCards(array) {
        const mixedUpMemCards = [...this.cards];
        for (let index = mixedUpMemCards.length; index > 0; index--) {
            const element1 = Math.floor(Math.random() * (index + 1));
            [mixedUpMemCards[index], mixedUpMemCards[element1]] = [mixedUpMemCards[element1], mixedUpMemCards[index]]
        }
        return mixedUpMemCards;
    }

    startThreeCardGame(){
        let threeCards = []
        let mixer = this.shuffleMemCards(this.cards);
        for (let index = 0; index < 3; index++) {
            threeCards.push(mixer.pop())
        }
        console.log(threeCards);
        threeCards.map((card, index) =>{
            this.gameContainerElement.appendChild(threeCards[index]);
        })
        
    }
   
    }

    let test1 = new Memory;
    test1.initGame();