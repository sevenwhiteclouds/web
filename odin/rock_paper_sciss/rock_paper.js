// determines what what the computer will play
function computerPlay()
{
  let turn = Math.floor(Math.random() * 3);

  if (turn == 0)
    return "rock";
  else if (turn == 1)
    return "paper";
  else
    return "scissors"; 
}

// determines who won the round
function whoWonRound(computerSelection, playerSelection)
{
  if (computerSelection == "rock" && playerSelection == "scissors")
  {
    const report = document.querySelector('.game_state')
    report.textContent = "you lose! rock beats scissors!";
    return "computer"
  }
  else if (computerSelection == "paper" && playerSelection == "rock")
  {
    const report = document.querySelector('.game_state')
    report.textContent = "you lose! paper beats rock!";
    return "computer"
  }
  else if (computerSelection == "scissors" && playerSelection == "paper")
  {
    const report = document.querySelector('.game_state')
    report.textContent = "you lose! scissors beats paper!";
    return "computer"
  }
  else if (playerSelection == "rock" && computerSelection == "scissors")
  {
    const report = document.querySelector('.game_state')
    report.textContent = "you win! rock beats scissors!";
    return "user"
  }
  else if (playerSelection == "paper" && computerSelection == "rock")
  {
    const report = document.querySelector('.game_state')
    report.textContent = "you win! paper beats rock!";
    return "user"
  }
  else if (playerSelection == "scissors" && computerSelection == "paper")
  {
    const report = document.querySelector('.game_state')
    report.textContent = "you win! scissors beats paper!";
    return "user"
  }
  else
  {
    const report = document.querySelector('.game_state')
    report.textContent = "tie!";
    return "tie!";
  }
}


// this function is when the game is over
function gameOver(computerScore, userScore)
{
  const won = "you won the entire game! -- refresh the website to play again";
  const lost = "you lost the entire game, the computer won! -- refresh the website to play again";
  let text = "";

  if (computerScore > userScore)
    text = lost;
  else
    text = won;

  const report = document.querySelector('.game_state')
  report.textContent = text;
}

// plays one round
function playsGame()
{
  let computerScore = 0;
  let userScore = 0;

  // array for all button to create listeners
  const buttons = [document.querySelector(".rock"), document.querySelector(".paper"), document.querySelector(".scissors")];

  // creates event listeners and plays game
  for (let i = 0; i < buttons.length; i++)
  {
    buttons[i].addEventListener("click", function (e)
                                           {
                                            const computer = computerPlay();

                                            let results = whoWonRound(computer, e.composedPath()[0].outerText)

                                            if (results == "user")
                                              userScore += 1;
                                            else if (results == "computer")
                                              computerScore += 1;

                                            if (computerScore == 5 || userScore == 5)
                                              gameOver(computerScore, userScore);
                                           });
  }
}

playsGame();
