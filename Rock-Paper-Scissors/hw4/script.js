/**
 * Name: Samuel
 * Date: 10.07.2024
 * CSC 372-01
 *
 * This file contains the JavaScript functionality for the Rock-Paper-Scissors game.
 * It includes event listeners for player choices, logic for computer throw, determining the game outcome,
 * and updating the UI accordingly.
 */

// Variables to track the score
let wins = 0;
let losses = 0;
let ties = 0;

// Event listeners for player's throw
const playerChoices = document.querySelectorAll(".player-choices img");
playerChoices.forEach(choice => {
    choice.addEventListener("click", handlePlayerChoice);
});

// Handle player choice
function handlePlayerChoice(event) {
    clearPlayerSelection();
    const playerChoice = event.target.id;
    event.target.classList.add("selected");

    // Simulate computer's throw with a 3-second "thinking" phase
    simulateComputerThrow(playerChoice);
}

// Clear player selection (remove border from previously selected option)
function clearPlayerSelection() {
    playerChoices.forEach(choice => choice.classList.remove("selected"));
}

// Simulate computer's throw
function simulateComputerThrow(playerChoice) {
    const computerChoices = ['rock', 'paper', 'scissors'];
    const computerChoiceElement = document.getElementById("computer-choice");

    let shuffleInterval = setInterval(() => {
        const randomChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];
        computerChoiceElement.src = `images/${randomChoice}.PNG`;
    }, 500);

    setTimeout(() => {
        clearInterval(shuffleInterval);
        const finalComputerChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];
        computerChoiceElement.src = `images/${finalComputerChoice}.PNG`;

        // Determine winner
        determineWinner(playerChoice, finalComputerChoice);
    }, 3000);
}

// Determine the winner
function determineWinner(playerChoice, computerChoice) {
    const gameResultElement = document.getElementById("game-result");

    if (playerChoice === computerChoice) {
        gameResultElement.textContent = "It's a Tie!";
        ties++;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        gameResultElement.textContent = "You Win!";
        wins++;
    } else {
        gameResultElement.textContent = "Computer Wins!";
        losses++;
    }

    updateScoreboard();
}

// Update the scoreboard
function updateScoreboard() {
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("ties").textContent = ties;
}

// Reset the score
document.getElementById("reset-button").addEventListener("click", function () {
    wins = 0;
    losses = 0;
    ties = 0;
    updateScoreboard();
    document.getElementById("game-result").textContent = "Make your move!";
    document.getElementById("computer-choice").src = "images/question-mark.PNG";
    clearPlayerSelection();
});
