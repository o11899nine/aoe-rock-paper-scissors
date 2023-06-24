// HTML element variables
const playerHeartsDiv = document.querySelector(".player-health .hearts")
const computerHeartsDiv = document.querySelector(".computer-health .hearts")
const playerSelectionDiv = document.querySelector(".player-selection")
const computerSelectionDiv = document.querySelector(".computer-selection");
const gameTextDiv = document.querySelector(".game-text");
const HorseDiv = document.querySelector(".fighter-button.horse");
const SpearmanDiv = document.querySelector(".fighter-button.spearman");
const ArcherDiv = document.querySelector(".fighter-button.archer");

// Constants
const HORSE = "horse";
const SPEARMAN = "spearman";
const ARCHER = "archer";
const STARTING_HEALTH = 1;

// Starting variables
let playerHealth = STARTING_HEALTH;
let computerHealth = STARTING_HEALTH;

HorseDiv.value = HORSE;
SpearmanDiv.value = SPEARMAN;
ArcherDiv.value = ARCHER;

HorseDiv.addEventListener("click", playRound);
SpearmanDiv.addEventListener("click", playRound);
ArcherDiv.addEventListener("click", playRound);




function randInt(number) {
    return Math.floor(Math.random() * number);
}

function getComputerSelection() {
    const choices = [HORSE, SPEARMAN, ARCHER];
    return choices[randInt(choices.length)];
}

function playRound() {
    const playerSelection = this.value;
    playerSelectionDiv.innerHTML = `<img src="img/${playerSelection}.png">`;  

    const computerSelection = getComputerSelection();
    computerSelectionDiv.innerHTML = `<img src="img/${computerSelection}.png">`;

    if (playerSelection === computerSelection) {
        gameTextDiv.innerHTML = `<h1>IT'S A TIE!</h1><h3>This will not end the war</h3>`;
    }

    else if (
        playerSelection === HORSE && computerSelection === SPEARMAN ||
        playerSelection === SPEARMAN && computerSelection === ARCHER ||
        playerSelection === ARCHER && computerSelection === HORSE
    ) {
        gameTextDiv.innerHTML = `<h1>YOU LOSE!</h1><h3>The enemy's ${computerSelection} beats your ${playerSelection}</h3>`;
        playerHealth--;
        playerHeartsDiv.removeChild(playerHeartsDiv.firstElementChild);
    }

    else if (
        playerSelection === HORSE && computerSelection === ARCHER ||
        playerSelection === SPEARMAN && computerSelection === HORSE ||
        playerSelection === ARCHER && computerSelection === SPEARMAN
    ) {
        gameTextDiv.innerHTML = `<h1>YOU WIN!</h1><h3>Your ${playerSelection} beats the enemy's ${computerSelection}</h3>`;
        computerHealth--;
        computerHeartsDiv.removeChild(computerHeartsDiv.firstElementChild);
    }

    if (playerHealth < 1 || computerHealth < 1) {
        gameTextDiv.innerHTML = "GAME OVER<br>Click here to restart";
        gameTextDiv.addEventListener('click', newGame);
    }

}



function setHearts(n) {
    const heartsContainers = document.querySelectorAll(".hearts");
    heartsContainers.forEach((e) => {
        e.innerHTML = "";
        for (let i = 0; i < STARTING_HEALTH; i++) {
            const HEART_ICON = document.createElement("img");
            HEART_ICON.src = "img/heart.png";
            HEART_ICON.width = "30";
            e.appendChild(HEART_ICON);
        };
    });
}

function newGame() {
    setHearts(STARTING_HEALTH);
    playerSelectionDiv.innerHTML = "";
    computerSelectionDiv.innerHTML = "";
    gameTextDiv.textContent = "Choose your fighter!";
}


newGame();
