class Memory {
    constructor(numOfCards, gameContainerElement) {
        this.numOfCards = numOfCards;
        this.gameContainerElement = gameContainerElement;
        this.cards = [];
        this.matches = 0;
        this.misses = 0;
        this.table;
        this.selection;
        this.flippedCards = [];
    }
       initGame() { 
        this.makeMemBoardTable();
        this.makeMemCards();
        this.makeMemGmBtns();
    }


    //sets up game containers, appends selection heading
    makeMemBoardTable(){
        let memGameTable = document.getElementById("gameTable");
        const memGameBoard = document.getElementById("gameBoard");
        memGameBoard.classList.add("memFlex");
        this.gameContainerElement = memGameBoard;
        const memTitleHolder = document.createElement('div');
        const memTitle = document.createTextNode("Select your number of cards to match");
       
        this.memTitleh2 = document.createElement("h2");
        this.memTitleh2.classList.add('text-center', 'pb-4');
        this.memTitleh2.appendChild(memTitle);
        memTitleHolder.appendChild(this.memTitleh2);
        memGameTable.appendChild(memTitleHolder);
        this.table = memGameTable;
    }


    //creates buttons for selection of level. appends difficulty level. adds eventListeners. passes number of cards for startGame function
    makeMemGmBtns(){
        const gmBtnsHolder = document.createElement("div")
        gmBtnsHolder.classList.add('text-center');
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
        const nineCardGamebtn = document.createElement("button");
        nineCardGamebtn.classList.add('btn', 'btn-danger', 'mx-2');
        const nineCardGame = document.createTextNode("Hard - 9 Matches");
        nineCardGamebtn.appendChild(nineCardGame);
        gmBtnsHolder.appendChild(nineCardGamebtn);
        this.table.appendChild(gmBtnsHolder);

        threeCardGamebtn.addEventListener("click", () => {
            console.log('beginner level');
            this.startGame(3); // Pass 3 for easy level
            this.memTitleh2.classList.add("hideMe");
            gmBtnsHolder.classList.add('hideMe');
        })
        
        sixCardGamebtn.addEventListener("click", () => {
            this.startGame(6); // Pass 6 for medium level
            this.memTitleh2.classList.add("hideMe");
            gmBtnsHolder.classList.add('hideMe');
        })

        nineCardGamebtn.addEventListener("click", () => {
            this.startGame(9); // Pass 9 for hard level
            this.memTitleh2.classList.add("hideMe");
            gmBtnsHolder.classList.add('hideMe');
        })
    }

    
    //makes memoryEmoji cards. array to hold complete card. background color classes for cards stored in array, along with emojis and their names.
    //array method map() is used to add color class. because bgGradientColor length is less than the memoryAniEmojis array length, a loop is used
    //to cycle through the memoryAniEmojis array using the modulo operator. The modulo operator finds the bgGradientColorIndex, it gives the 
    //remainder when 'i' is divided by the length of the array. The bgGradientColorIndex will always be within the range of the array.
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
    //complete set of aniEmojiCards with emoji faces, background colors, and other style class properties
    this.cards = memoryCompleteCards;
    }

    // returns a duplicate of the node on which this method was called. Copies all of its attributes and values. 
    cloneDomElement(element) {
        return element.cloneNode(true);
      }

    
    // Fisher-Yates algorithm used to produce random order of cards. Swaps elements in the array to achieve a randomized order.
      shuffleMemCards(array) {
        let mixedUpMemCards = [...array]; // Create a copy of the input array
        for (let i = mixedUpMemCards.length - 1; i > 0; i--) {
            // Generates a random index j using Math.random() and Math.floor() functions. 
            //It then swaps the elements at indices i and j using destructuring assignment.
            const j = Math.floor(Math.random() * (i + 1));
            [mixedUpMemCards[i], mixedUpMemCards[j]] = [mixedUpMemCards[j], mixedUpMemCards[i]];
        }
        return mixedUpMemCards;
    }


     
    //takes in the level of difficulty(number of cards)
    startGame(numOfCards){
        let selectedCards = [];
        let gameSet = [];

        //shuffles complete set of animal emoji cards
        let mixer = this.shuffleMemCards(this.cards);
        //pulls given number of cards from shuffled array
        for (let index = 0; index < numOfCards; index++) {
            selectedCards.push(mixer.pop())
        }
        
        //Creates a match for each card in array, by duplicating the array.
        let duplicates = selectedCards.map(card => this.cloneDomElement(card));

        //combines both arrays together
        gameSet = selectedCards.concat(duplicates);

        //reshuffles combined array
        gameSet = this.shuffleMemCards(gameSet);
        
        //adds card flip ability to each card on click. When two cards are pushed into new array this.flippedCards
        //the this.isMatchorMiss function is called, with the two cards passed as the two parameters.
        gameSet.map((gameCard, i) => {
            gameCard.addEventListener("click", () => {
                gameCard.classList.toggle("flip");
                this.flippedCards.push(gameCard);
                if (this.flippedCards.length === 2) {
                    this.isMatchOrMiss(this.flippedCards[0], this.flippedCards[1]);
                }
                console.log(this.flippedCards);
            });
        }); 
        
        //appends all the cards to the game board
        gameSet.map((card, index) => {
            this.gameContainerElement.appendChild(card);
        });
    }
    

    
    isMatchOrMiss(card1, card2) {
        const matchMade = document.getElementById("umatch");
        const missed = document.getElementById("umiss");
        const celebrateCont = document.createElement('p');
        const celebrate = document.createTextNode('YOU DID IT!');
        celebrateCont.appendChild(celebrate);
        celebrateCont.classList.add('text-center','celebrateText','animate__animated','animate__zoomInUp');
        let matchPoints;
        let missedPoints;
        //compares the innerText of the cards, if they're the same, point is awarded and matchmade.innerText is updated
            if (card1.innerText === card2.innerText) {
                this.matches++
                matchPoints = this.matches
                matchMade.innerText = matchPoints;
                  
                        //matched cards are removed, this.flippedCards array is reset
                        setTimeout(()=>{
                            card1.remove();
                            card2.remove();
                        }, 1550);
                        this.flippedCards = [];
                        
                        //checks the game container for cards (childNodes of the gameContainer). the base childNodes.length of the container
                        //is 3. If it equals 3, all cards are matched game is won.
                        if (this.gameContainerElement.childNodes.length === 3) {
                            setTimeout(() =>{
                                this.table.appendChild(celebrateCont);
                                this.matches = 0;
                                matchMade.innerText = 0;
                                this.misses = 0;
                                missed.innerText = 0;
                            }, 1000);
                            setTimeout(() =>{
                                this.table.removeChild(celebrateCont);
                                this.initGame();
                            }, 5500);
                        }
                    }
                    
                    //If cards innerText dont match, the missedPoints is updated and both cards are flipped over.
              else if(card1 != card2) {
                    this.misses++
                    missedPoints = this.misses;
                    missed.innerText = missedPoints;
                    setTimeout(()=>{
                        card1.classList.toggle('flip');
                        card2.classList.toggle('flip');
                    }, 1050);
                    this.flippedCards = [];
                } 
    }
   
    }

    let test1 = new Memory;
    test1.initGame();