var questions = [
  {
    exam: "What symbol do we use to reference an ID in js and CSS?",
    answers: ["#idName", "@idName", "$idName", "!idName"],
    correctAnswer: "#idName"
  },
  {
    exam: "The condition in an if / else statement is enclosed within ____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses"
  },
  {
    exam: "What does DOM stand for?",
    answers: ["Drinks On Me", "Days On Market", "Dominican Republic", "Document Object Model"],
    correctAnswer: "Document Object Model"
  },
  {
    exam: "Which javascript syntax will print 'Hello World' to the console?",
    answers: ["$('p').splice('')=Hello World", "Console.log('Hello World')", "$document.printInnerHTML='Hello World'", "FREAKING PRINT HELLO WORLD!"],
    correctAnswer: "Console.log('Hello World')"
  },
  {
    exam: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
  }
];

var quizScore = 0;
var questionIndex = 0;

var startBtn = document.querySelector('#start-btn');
var questionDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var currentTime = document.querySelector("#currentTime");

var timeRemaining = 60;
var wrong = 10;

var interval = 0;
var ulCreate = document.createElement("ul");

startBtn.addEventListener("click", function () {
  if (interval === 0) {
    interval = setInterval(function () {
      timeRemaining--;
      currentTime.textContent = "Time: " + timeRemaining;

      if (timeRemaining <= 0) {
        clearInterval(interval);
        fin();
        currentTime.textContent = "Time!"

      }
    }, 1000);
  }
  showQuestion(questionIndex);



})

function showQuestion(questionIndex) {
  questionDiv.innerHTML = "";
  ulCreate.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionIndex].exam;
    var userAnswers = questions[questionIndex].answers;
    questionDiv.textContent = userQuestion;
  }

  userAnswers.forEach(function (newEl) {
    var showAnswers = document.createElement("li");
    showAnswers.textContent = newEl;
    questionDiv.appendChild(ulCreate);
    ulCreate.appendChild(showAnswers);
    showAnswers.addEventListener("click", (tracking));
  })
}

function tracking(event) {
  var choice = event.target;

  if (choice.matches("li")) {

    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "newDiv");

    if (choice.textContent === questions[questionIndex].correctAnswer) {
      quizScore++;
      newDiv.textContent = "Correct!"
    } else {
      timeRemaining = timeRemaining - wrong;
      newDiv.textContent = "Wrong! -10 seconds"
    }
  }

  questionIndex++;

  if (questionIndex >= questions.length) {
    fin();
    newDiv.textContent = "The quiz has ended!";
  } else {
    showQuestion(questionIndex);
  }
  questionDiv.appendChild(newDiv);
}

function fin() {
  questionDiv.innerHTML = "";
  currentTime.style.display = "none";

  var endGameH1 = document.createElement("h1");
  endGameH1.setAttribute("id", "endGameH1");
  endGameH1.textContent = "How did you do?"

  questionDiv.appendChild(endGameH1);

  var endGameP = document.createElement("p");
  endGameP.setAttribute("id", "endGameP");
  endGameP.textContent = "Your final score is " + quizScore;

  questionDiv.appendChild(endGameP);

  var newLabel = document.createElement("label");
  newLabel.setAttribute("id", "newLabel");
  newLabel.textContent = "Enter your handle:";

  questionsDiv.appendChild(newLabel);

  var newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("id", "tag");
  newInput.setAttribute("placeholder", "enter initials");
  newInput.textContent = "";

  questionsDiv.appendChild(newInput);
  newSubmit
  var newSubmit = document.createElement("button");
  newSubmit.setAttribute("type", "submit");
  newSubmit.setAttribute("id", "submit");
  newSubmit.textContent = "Submit Results";

  questionsDiv.appendChild(newSubmit);
  newSubmit.addEventListener("click", function () {
    var initials = newInput.value;
    if (initials === null) {

      console.log("Invalid Response");

    } else {
      var finalScore = {
        initials: initials,
        score: quizScore,
      }
      console.log(finalScore);
      var scoreBoard = localStorage.getItem("scoreBoard");
      if (scoreBoard === null) {
        scoreBoard = [];
      } else {
        scoreBoard = JSON.parse(scoreBoard);
      }
      scoreBoard.push(finalScore);
      var newScore = JSON.stringify(scoreBoard);
      localStorage.setItem("scoreBoard", newScore);
      window.location.replace("highscores.html");
    }
  });

}
