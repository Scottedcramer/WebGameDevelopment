var playerScore = 0;
var computerScore = 0;
const playerScore_holder = document.getElementById("playerscore");
const computerScore_holder = document.getElementById("computerscore");
const scoreboard_div = document.querySelector(".scoreboard");
const outcome_div = document.querySelector(".outcome");
const history_div = document.querySelector(".history");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");


function getComputerChoice() {
const choices = ['rock', 'paper', 'scissors'];
const number = Math.floor(Math.random() * 3);

return choices[number];

}

function win(playerchoice, computerchoice) {
    playerScore = playerScore + 1;
    playerScore_holder.innerHTML = playerScore;
    computerScore_holder.innerHTML = computerScore;
    outcome_div.innerHTML = playerchoice + " beats " + computerchoice + " ...you win!";
    history_div.innerHTML = history_div.innerHTML + "<br>" + playerchoice + " beats " + computerchoice + " ..You Won!";
}

function lose(playerchoice, computerchoice) {
    computerScore = computerScore + 1;
    playerScore_holder.innerHTML = playerScore;
    computerScore_holder.innerHTML = computerScore;
    outcome_div.innerHTML =computerchoice + " beats " + playerchoice + " ...you lost!";
    history_div.innerHTML = history_div.innerHTML + "<br>" + computerchoice + " beats " + playerchoice + " ..You Lost!";
}

function draw() {
    outcome_div.innerHTML = "it's a draw!";
    history_div.innerHTML = history_div.innerHTML + "<br>" + "It's a Draw!";

}

function play(playerChoice) {
const computerChoice = getComputerChoice();

switch (playerChoice + computerChoice) {
    case "rockscissors":
    case "scissorspaper":
    case "paperrock":
        win(playerChoice, computerChoice);
        break;
    case "scissorsrock":
    case "paperscissors":
    case "rockpaper":
        lose(playerChoice, computerChoice);
        break;
    case "rockrock":
    case "scissorsscissors":
    case "paperpaper":
        draw(playerChoice, computerChoice);
        break;
    }
}


function main() {

rock_div.addEventListener('click', function(){
play("rock");
})

paper_div.addEventListener('click', function(){
play("paper");
})

scissors_div.addEventListener('click', function(){
play("scissors");
})

}

main();