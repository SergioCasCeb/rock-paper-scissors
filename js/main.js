const options = ["rock", "paper", "scissors"];
const playerOptions = document.querySelector(".player-options");
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


playerOptions.value = '';

let scorePlayer = 0;
let scoreComputer = 0;
let roundsPlayed = 0;

userScoreSection.textContent = scorePlayer;
computerScoreSection.textContent = scoreComputer;
roundsSection.textContent = roundsPlayed;

function returnToDefault() {
    loader.classList.remove("hidden");
    rockPc.classList.add('hidden');
    paperPc.classList.add('hidden');
    scissorsPc.classList.add('hidden');

    rockUser.classList.add('hidden');
    paperUser.classList.add('hidden');
    scissorsUser.classList.add('hidden');
    waitingText.classList.remove('hidden');

    userScoreSection.textContent = 0;
    computerScoreSection.textContent = 0;
    roundsSection.textContent = 0;
}

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


function playRound(playerSelection, computerSelection){
    if(playerSelection == computerSelection){
        console.log("Its a Draw");
        return 0;
    }
    else if((playerSelection == "rock" && computerSelection == "scissors") || (playerSelection == "paper" && computerSelection == "rock") || (playerSelection == "scissors" && computerSelection == "paper") ){

        console.log("You Win! " + playerSelection + " beats " + computerSelection);
        return 1;
    }
    else{
        console.log("You Loose! " + computerSelection + " beats " + playerSelection);
        return -1; 
    }

}


/*
function game(){
    let scorePlayer = 0, scoreComputer = 0, round = 1;

    for(let i = 0; i < 5; i++){
        const computerSelection = computerPlay();
        const playerSelection = "rock";
        console.log("Round: "+round);
        let roundResult =  playRound(playerSelection, computerSelection);

        if(roundResult == 1){
            scorePlayer++;
        }
        if(roundResult == -1){
            scoreComputer++
        }

        round++
    }
    

    if(scorePlayer > scoreComputer){
        console.log("You have WON the game!");
    }
    else if(scorePlayer < scoreComputer){
        console.log("The Computer Wins!")
    }
    else{
        console.log("It's a Draw!")
    }
    console.log("Player: "+scorePlayer+" | Computer: "+scoreComputer);
}
*/


playerOptions.addEventListener('change', () => {
    let userInput = playerOptions.value;

    if(userInput == 'rock'){
        rockUser.classList.remove('hidden');
        paperUser.classList.add('hidden');
        scissorsUser.classList.add('hidden');
        waitingText.classList.add('hidden');
    }
    else if(userInput == 'paper'){
        rockUser.classList.add('hidden');
        paperUser.classList.remove('hidden');
        scissorsUser.classList.add('hidden');
        waitingText.classList.add('hidden');
    }
    else if(userInput == 'scissors'){
        rockUser.classList.add('hidden');
        paperUser.classList.add('hidden');
        scissorsUser.classList.remove('hidden');
        waitingText.classList.add('hidden');
    }
    else{
        rockUser.classList.add('hidden');
        paperUser.classList.add('hidden');
        scissorsUser.classList.add('hidden');
        waitingText.classList.remove('hidden');
    }


});

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let userInput = playerOptions.value;
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

restartBtn.addEventListener('click', () =>{
    returnToDefault();
});

closeBtn.addEventListener('click', () =>{
    resultContainer.classList.add("hidden");
});
