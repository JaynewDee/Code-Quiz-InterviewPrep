// ID selectors
var startButton = document.querySelector('#start');
var titleText = document.querySelector('#title');
var timerText = document.querySelector('#countdownText');
var quizStage = document.querySelector('#stage');
var score = document.querySelector('#score')

var countdownTimer = 3;
var scoreTimer = 60;

// Array of questions as objects
var questionsArr = [
     Q1 = {
          question: "Which of these methods belongs to the window object?",
          answers: ["debug()", "prompt()", "perpetuate", "math.sign()"],
          correctAnswer: "prompt()",
     },
     Q2 = {
          question: "Yadayada doodoo",
          answers: ["debug()", "prompt()", "perpetuate", "math.sign()"],
          correctAnswer: "prompt()",
     },
     Q3 = {
          question: "chimney chimney woowoo",
          answers: ["debug()", "prompt()", "perpetuate", "math.sign()"],
          correctAnswer: "prompt()",
     },
     Q4 = {
          question: "Question 4 boopity bop",
          answers: ["debug()", "prompt()", "perpetuate", "math.sign()"],
          correctAnswer: "prompt()",
     },
     Q5 = {
          question: "last question whoa",
          answers: ["debug()", "prompt()", "perpetuate", "math.sign()"],
          correctAnswer: "prompt()",
     },
];
// Renders question and answer buttons to page
var i = 0;

function renderQuestion() {
     var questionStage = document.createElement('h2');
     var answersStage = document.createElement('ul');
     quizStage.appendChild(questionStage);
     questionStage.textContent = questionsArr[i].question;
     questionStage.appendChild(answersStage);
          if (i > questionsArr.length) {
               endQuiz();
          }
          for (var j = 0; j < questionsArr[i].answers.length; j++) {
               var answerBtn = document.createElement('li');
               answerBtn.textContent = questionsArr[i].answers[j];
               answersStage.appendChild(answerBtn);
               answerBtn.setAttribute("type", "button");
               answerBtn.setAttribute("style", "display: block");
               answerBtn.classList.add("btn", "btn-primary");
               answerBtn.addEventListener("click", function(userChoice) {
                    var userChoice = userChoice.currentTarget.textContent;
                    console.log(userChoice)
                    if (userChoice === questionsArr[i].correctAnswer) {
                         quizStage.removeChild(quizStage.firstChild);
                         i++;
                         renderQuestion();
                    } else if (userChoice !== questionsArr[i].correctAnswer) {
                         scoreTimer -= 5;
                    }
               })
          }
     }

     // Score timer function
     function scoreCount() {
          var count = setInterval(function() {
               scoreTimer--;
               score.textContent = scoreTimer;

               if (scoreTimer < 1) {
                    clearInterval(count);
                    score.textContent = "";
                    gameOver();
               }
          }, 1000)
     }
     
     function gameOver() {
          quizStage.removeChild(quizStage.firstChild);
          var gameOverText = document.createElement("h1")
          gameOverText.textContent = "Time's up!  Try again?"
          quizStage.appendChild(gameOverText);
          quizStage.appendChild(startButton);
          startButton.setAttribute("style", "")
          if (startButton.click()) {
               document.innerHTML = "";
               renderQuestion();
          }
     }

     // Countdown timer function
     function countDown() {
          timerText.textContent = countdownTimer;
          var timerCount = setInterval(function () {
               countdownTimer--;
               timerText.textContent = countdownTimer;

               if (countdownTimer === 0) {
                    clearInterval(timerCount);
                    timerText.textContent = "";
                    renderQuestion();
                    scoreCount();
               }

          }, 1000);

     }


     // Function starts quiz on click

     function startQuiz(event) {
          startButton.setAttribute("style", "display: none");
          titleText.setAttribute("style", "display: none");
          countDown();
     }


     
     
     // Start Button Listener
     startButton.addEventListener("click", startQuiz);
     // Answer Button Listener