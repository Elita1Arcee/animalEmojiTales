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
        memGameBoard.classList.add("memFlex");
        this.gameContainerElement = memGameBoard;
        const memTitleHolder = document.createElement('div');
        const memTitle = document.createTextNode("Select your number of cards to match")
        const memTitleh2 = document.createElement("h2");
        memTitleh2.appendChild(memTitle);
        memTitleHolder.appendChild(memTitleh2);
        memGameTable.appendChild(memTitleHolder);
        const threeCardGamebtn = document.createElement("button");
        const threeCardGame = document.createTextNode("Match 3 Cards");
        // const fiveCardGamebtn = document.createElement("button");
        // const fiveCardGame = document.createTextNode("Match 5 Cards");
        threeCardGamebtn.appendChild(threeCardGame);
        // fiveCardGamebtn.appendChild(fiveCardGame);
        memGameTable.appendChild(threeCardGamebtn);
        // memGameTable.appendChild(fiveCardGamebtn);
        threeCardGamebtn.addEventListener("click", () =>{
            console.log('beginner level');
            this.startThreeCardGame();
            memTitleh2.classList.add("hideMe");
            threeCardGamebtn.classList.add('hideMe');
        })
        // fiveCardGamebtn.addEventListener("click", () =>{
        //     this.startFiveCardGame();
        // })

    }

    makeMemCards() {
        let memoryCompleteCards = [];
        const bgGradientColors = ["green", "red", "yellow", "blue", "purple", "brown"];
        const memoryAniEmojis =  ["🦒", "🐘", "🐨", "🐵", "🐶", "🐱", "🦊", "🐰", "🐸", "🦁", "🐯", "🐭", "🦄", "🐲", "🐷", "🐺", "🐼", "🐻"];
        const memoryAniEmojisNames = ["Giraffe", "Elephant", "Koala", "Monkey", "Dog", "Cat", "Fox", "Rabbit", "Frog", "Lion", "Tiger", "Mouse", "Unicorn", "Dragon", "Pig", "Wolf", "Panda", "Bear"];

        const memoryAniCards = memoryAniEmojis.map((card, i) =>{
            const bgGradientColorIndex = i % bgGradientColors.length;
            const bgColors = bgGradientColors[bgGradientColorIndex];
            
            let frontC = document.createElement("div");
            let backC = document.createElement("div");
           
            frontC.classList.add("side", "back", "white");
            backC.classList.add("side", bgColors);
            console.log(backC);
            let memoryAnimalDivCW = document.createElement("div");
            
            let emojiTextNode = document.createTextNode(card);
            let namesBox = document.createElement('div');
            let names = document.createTextNode(memoryAniEmojisNames[i]);
            namesBox.classList.add('namesFont');
            namesBox.appendChild(names);
            
            backC.appendChild(emojiTextNode);
            backC.appendChild(namesBox);
           
            memoryAnimalDivCW.classList.add("zone");
            memoryAnimalDivCW.appendChild(backC);
            memoryAnimalDivCW.appendChild(frontC);
            

            memoryCompleteCards.push(memoryAnimalDivCW); 
    })
    
    
    this.cards = memoryCompleteCards;
    console.log(this.cards);
    }

    cloneDomElement(element) {
        return element.cloneNode(true);
      }

    shuffleMemCards(array) {
        let mixedUpMemCards = [...array]; // Create a copy of the input array
        for (let i = mixedUpMemCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mixedUpMemCards[i], mixedUpMemCards[j]] = [mixedUpMemCards[j], mixedUpMemCards[i]];
        }
        return mixedUpMemCards;
    }
    
    startThreeCardGame(){
        let threeCards = []
        let gameOfSix = [];
        let mixer = this.shuffleMemCards(this.cards);
        for (let index = 0; index < 3; index++) {
            threeCards.push(mixer.pop())
        }
        console.log(threeCards);

        let duplicateThree = threeCards.map(card => this.cloneDomElement(card));

        console.log(duplicateThree);

        gameOfSix = threeCards.concat(duplicateThree);

        console.log(gameOfSix);
        gameOfSix = this.shuffleMemCards(gameOfSix);
        console.log(gameOfSix);
        
        gameOfSix.map((gmSixCard, i) =>{
            gmSixCard.addEventListener("click", () =>{
                console.log("I was clicked");
                gmSixCard.classList.toggle("flip");
            });
        }); 
        
        gameOfSix.map((card, index) =>{
            this.gameContainerElement.appendChild(card);
        });


    }

    // startFiveCardGame(){
    //     let fiveCards = []
    //     let mixer = this.shuffleMemCards(this.cards);
    //     for (let index = 0; index < 5; index++) {
    //         fiveCards.push(mixer.pop())
    //     }
    //     let duplicateFive = [...fiveCards];
    //     fiveCards.map((card, index) =>{
    //         this.gameContainerElement.appendChild(fiveCards[index]);
    //     })
    // }

    isMatch(card1, card2) {
        if (card1 == card2) {
            this.scoreGameMatch();
        } else {
            this.scoreGameMiss();
      }
    
      scoreGameMatch() {
        // Listens for onclick for one card and flips it over
        // Listens for onclick of second card, flips it over
        // Checks if both cards that are flipped over match (using isMatch method)
        // If so, remove those two cards and update Matches by 1
        // If not, flip both cards back over, and update Misses by 1
      }
      scoreGameMiss(){

      }
   
    }

    let test1 = new Memory;
    test1.initGame();