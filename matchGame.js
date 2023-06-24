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
        const memTitle = document.createTextNode("Select your number of cards to match");
        const memTitleh2 = document.createElement("h2");
        memTitleh2.appendChild(memTitle);
        memTitleHolder.appendChild(memTitleh2);
        memGameTable.appendChild(memTitleHolder);
        const gmBtnsHolder = document.createElement("div")
        const threeCardGamebtn = document.createElement("button");
        threeCardGamebtn.classList.add('btn', 'btn-success', 'mx-2');
        const threeCardGame = document.createTextNode("Easy- 3 Matches");
        const sixCardGamebtn = document.createElement("button");
        sixCardGamebtn.classList.add('btn', 'btn-warning', 'mx-2')
        const sixCardGame = document.createTextNode("Medium - 6 Matches");
        threeCardGamebtn.appendChild(threeCardGame);
        sixCardGamebtn.appendChild(sixCardGame);
        gmBtnsHolder.appendChild(threeCardGamebtn);
        gmBtnsHolder.appendChild(sixCardGamebtn);
        memGameTable.appendChild(gmBtnsHolder);
        
        threeCardGamebtn.addEventListener("click", () =>{
            console.log('beginner level');
            this.startThreeCardGame();
            memTitleh2.classList.add("hideMe");
            gmBtnsHolder.classList.add('hideMe');
        })
        sixCardGamebtn.addEventListener("click", () =>{
            this.startSixCardGame();
            memTitleh2.classList.add("hideMe");
            gmBtnsHolder.classList.add('hideMe');
        })

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
           
            frontC.classList.add("side", "white");
            backC.classList.add("side", "back", bgColors);
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
    
        let duplicateThree = threeCards.map(card => this.cloneDomElement(card));

        gameOfSix = threeCards.concat(duplicateThree);

        gameOfSix = this.shuffleMemCards(gameOfSix);
        
        gameOfSix.map((gmSixCard, i) =>{
            gmSixCard.addEventListener("click", () =>{
                gmSixCard.classList.toggle("flip");
                this.flippedCards.push(gmSixCard);
                if (this.flippedCards.length === 2) {
                       this.isMatchOrMiss(this.flippedCards[0], this.flippedCards[1]);
                }
                console.log(this.flippedCards);
                
            });
        }); 
        
        gameOfSix.map((card, index) =>{
            this.gameContainerElement.appendChild(card);
        });
    }

    startSixCardGame(){
        let sixCards = []
        let gameOfTwelve = [];
        let mixer = this.shuffleMemCards(this.cards);
        for (let index = 0; index < 6; index++) {
            sixCards.push(mixer.pop())
        }
    
        let duplicateSix = sixCards.map(card => this.cloneDomElement(card));

        gameOfTwelve = sixCards.concat(duplicateSix);

        gameOfTwelve = this.shuffleMemCards(gameOfTwelve);
        
        gameOfTwelve.map((gmTwelveCard, i) =>{
            gmTwelveCard.addEventListener("click", () =>{
                gmTwelveCard.classList.toggle("flip");
                this.flippedCards.push(gmTwelveCard);
                if (this.flippedCards.length === 2) {
                       this.isMatchOrMiss(this.flippedCards[0], this.flippedCards[1]);
                }
                console.log(this.flippedCards);
                
            });
        }); 
        
        gameOfTwelve.map((card, index) =>{
            this.gameContainerElement.appendChild(card);
        });
    }

    isMatchOrMiss(card1, card2) {
        const matchMade = document.getElementById("umatch");
        const missed = document.getElementById("umiss");
        let cardMatches = [];
        let matchPoints;
        let missedPoints;
            if (card1.innerText === card2.innerText) {
                this.matches++
                matchPoints = this.matches
                matchMade.innerText = matchPoints;
               console.log(matchPoints);   
                        console.log("Match!");
                        setTimeout(()=>{
                            card1.remove();
                            card2.remove();
                        }, 1550);
                        this.flippedCards = [];
                        console.log(this.gameContainerElement.childNodes.length);
                        if (this.gameContainerElement.childNodes.length === 3) {
                            setTimeout(() =>{
                                alert("GREAT JOB!");
                                this.matches = 0;
                                matchMade.innerText = 0;
                                this.misses = 0;
                                missed.innerText = 0;
                            }, 1000);
                            setTimeout(() =>{
                                this.initGame();
                            }, 2500);
                        }
                    }
                    
              else if(card1 != card2) {
                    this.misses++
                    missedPoints = this.misses;
                    missed.innerText = missedPoints;
                    setTimeout(()=>{
                        card1.classList.toggle('flip');
                        card2.classList.toggle('flip');
                    }, 1050);
                    console.log(missedPoints);
                    this.flippedCards = [];
                    console.log(this.flippedCards);
                } 
    }
   
    }

    let test1 = new Memory;
    test1.initGame();