const options = ["rock", "paper", "scissors"];
const playerOptions = document.querySelectorAll(".player-options button");
const rockUser = document.querySelector(".rock-user");
const paperUser = document.querySelector(".paper-user");
const scissorsUser = document.querySelector(".scissors-user");
const loader = document.querySelector(".loader-wrapper");

const rockPc = document.querySelector(".rock-pc");
const paperPc = document.querySelector(".paper-pc");
const scissorsPc = document.querySelector(".scissors-pc");

const waitingText = document.querySelector(".waiting-text");
const form = document.querySelector(".game-container");

const userScoreSection = document.querySelector(".user-score");
const computerScoreSection = document.querySelector(".computer-score");

const roundsSection = document.querySelector(".rounds");
const restartBtn = document.querySelector(".restart-btn");

const closeBtn = document.querySelector(".close-btn");
const resultContainer = document.querySelector(".result-container");
const resultText = document.querySelector(".result-text");


//Initializing the program values with 0

let scorePlayer = 0;
let scoreComputer = 0;
let roundsPlayed = 0;
let userInput = '';

userScoreSection.textContent = scorePlayer;
computerScoreSection.textContent = scoreComputer;
roundsSection.textContent = roundsPlayed;

//Function to return everything to its default state
function returnToDefault() {

    loader.classList.remove("hidden");
    rockPc.classList.add('hidden');
    paperPc.classList.add('hidden');
    scissorsPc.classList.add('hidden');

    rockUser.classList.add('hidden');
    paperUser.classList.add('hidden');
    scissorsUser.classList.add('hidden');
    waitingText.classList.remove('hidden');

    scorePlayer = 0;
    scoreComputer = 0;
    roundsPlayed = 0;

    userScoreSection.textContent = scorePlayer;
    computerScoreSection.textContent = scoreComputer;
    roundsSection.textContent = roundsPlayed;
}

//Function where the computer choces a hand and its displayed in the screen
function computerPlay(){
    let value = Math.floor(Math.random() * 3);
    let computerSelection = options[value];

    loader.classList.add("hidden");
    
    if(computerSelection == 'rock'){
        rockPc.classList.remove('hidden');
        paperPc.classList.add('hidden');
        scissorsPc.classList.add('hidden');
    }
    else if(computerSelection == 'paper'){
        rockPc.classList.add('hidden');
        paperPc.classList.remove('hidden');
        scissorsPc.classList.add('hidden');
    }
    else if(computerSelection == 'scissors'){
        rockPc.classList.add('hidden');
        paperPc.classList.add('hidden');
        scissorsPc.classList.remove('hidden');
    }
    else{
        rockPc.classList.add('hidden');
        paperPc.classList.add('hidden');
        scissorsPc.classList.add('hidden');
    }
    return computerSelection;
}

//Function where both the values of the user and the computer and compared and gives value depending of the result
function playRound(playerSelection, computerSelection){
    if(playerSelection == computerSelection){
        return 0;
    }
    else if((playerSelection == "rock" && computerSelection == "scissors") || (playerSelection == "paper" && computerSelection == "rock") || (playerSelection == "scissors" && computerSelection == "paper") ){
        return 1;
    }
    else{
        return -1; 
    }

}

/*******  Event Listeners  ************/


//listener for the users options
playerOptions.forEach( option => {
    option.addEventListener("click", () => {
        
        if (option.className == 'rock') {
            rockUser.classList.remove('hidden');
            paperUser.classList.add('hidden');
            scissorsUser.classList.add('hidden');
            waitingText.classList.add('hidden');
            userInput = 'rock';
        }
        else if(option.className == 'paper'){
            rockUser.classList.add('hidden');
            paperUser.classList.remove('hidden');
            scissorsUser.classList.add('hidden');
            waitingText.classList.add('hidden');
            userInput = 'paper';
        }
        else{
            rockUser.classList.add('hidden');
            paperUser.classList.add('hidden');
            scissorsUser.classList.remove('hidden');
            waitingText.classList.add('hidden');
            userInput = 'scissors';
        }
    })
})

//submit event listener that runs the previous play functions, updates the score values, the round values and shows a pop up with a message
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let roundResult = playRound(userInput, computerPlay());

    if(roundResult == 1){
        scorePlayer++;
        userScoreSection.textContent = scorePlayer;
        resultText.textContent = "You WON!";
        resultText.classList.add("won");
        resultText.classList.remove("lost");
        resultText.classList.remove("draw");
    }
    else if(roundResult == -1){
        scoreComputer++
        computerScoreSection.textContent = scoreComputer;
        resultText.textContent = "You LOST!";
        resultText.classList.remove("won");
        resultText.classList.add("lost");
        resultText.classList.remove("draw");
    }
    else{
        resultText.textContent = "It's a Draw!";
        resultText.classList.remove("won");
        resultText.classList.remove("lost");
        resultText.classList.add("draw");
    }

    roundsPlayed++;
    roundsSection.textContent = roundsPlayed;

    setTimeout(function(){ resultContainer.classList.remove("hidden"); }, 500);
    
});

//Listener that call the default function
restartBtn.addEventListener('click', () =>{
    returnToDefault();
});

//Listener to close the pop up message
closeBtn.addEventListener('click', () =>{
    resultContainer.classList.add("hidden");
});