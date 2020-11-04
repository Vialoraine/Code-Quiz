var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
var scoreBoard = localStorage.getItem("scoreBoard");
scoreBoard = JSON.parse(scoreBoard);

if (scoreBoard !== null) {

  for (var i = 0; i < scoreBoard.length; i++) {

    var createLi = document.createElement("li");
    createLi.textContent = scoreBoard[i].initials + " " + scoreBoard[i].score;
    highScore.append(createLi);

  }
}