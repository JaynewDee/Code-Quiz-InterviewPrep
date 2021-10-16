// ID selectors
var startButton = document.querySelector('#start');
var titleText = document.querySelector('#title');
var timerText = document.querySelector('#countdownText');
var quizStage = document.querySelector('#stage');
var score = document.querySelector('#score');
var formStage = document.querySelector('#formStage');
var formText = document.querySelector('#formText');
var formArea = document.querySelector('#formArea');
var formButt = document.querySelector('#formButt');
var inits = document.querySelector('#initInput')
let countdownTimer = 3;
let scoreTimer = 60;
const scoreBoard = [];
storageInit();

// Array of questions as objects
const questionsArr = [
     Q1 = {
          question: "Which of these methods belongs to the window object?",
          answers: ["debug()", "prompt()", "perpetuate", "math.sign()"],
          correctAnswer: "prompt()",
     },
     Q2 = {
          question: "What are coders and apes both built from?",
          answers: ["atoms", "genetic code", "bones", "All of the above"],
          correctAnswer: "All of the above",
     },
     Q3 = {
          question: "Which programming language has an engine built into all standard web browsers?",
          answers: ["C#", "JavaScript", "Python", "Swift"],
          correctAnswer: "JavaScript",
     },
     Q4 = {
          question: "Which is the best programming paradigm?",
          answers: ["Functional Programming", "Procedural Programming", "Object-Oriented Programming", "Each has its advantages"],
          correctAnswer: "Each has its advantages",
     },
     Q5 = {
          question: "Who is responsible for your success?",
          answers: ["my teachers", "Bill Murray", "Myself", "my therapist"],
          correctAnswer: "Myself",
     },
     Q6 = {
          question: "Is this the best quiz you've ever taken?",
          answers: ["Yes", "It's really bad"],
          correctAnswer: "Yes",
     }
];

// Renders question and answer buttons to page
var i = 0;

function renderQuestion() {

     var questionStage = document.createElement('h2');
     var answersStage = document.createElement('ul');
     quizStage.appendChild(questionStage);
     questionStage.textContent = questionsArr[i].question;
     questionStage.appendChild(answersStage);

     for (var j = 0; j < questionsArr[i].answers.length; j++) {
          var answerBtn = document.createElement('li');
          answerBtn.textContent = questionsArr[i].answers[j];
          answersStage.appendChild(answerBtn);
          answerBtn.setAttribute("type", "button");
          answerBtn.setAttribute("style", "display: block");
          answerBtn.classList.add("btn", "btn-primary");
          answerBtn.addEventListener("click", function (userChoice) {
               var userChoice = userChoice.currentTarget.textContent;
               console.log(userChoice)
               if (userChoice === questionsArr[i].correctAnswer) {
                    quizStage.removeChild(quizStage.firstChild);
                    i++;
                    if (i === questionsArr.length) {
                         endQuiz();
                         return;
                    }
                    renderQuestion();
               } else if (userChoice !== questionsArr[i].correctAnswer) {
                    $(this).addClass('btn-danger')
                    let hitpoints = document.createElement('h3');
                    hitpoints.textContent = "-5";
                    $('#score').append(hitpoints);

                    setTimeout(() => {
                         $(this).removeClass('btn-danger')
                         $(scoreTimer).remove();
                    }, 2200);
                    scoreTimer -= 5;
               }
          })
     }
}

// Score timer function
function scoreCount() {
     var count = setInterval(function () {
          scoreTimer--;
          score.textContent = scoreTimer;

          if (scoreTimer < 1) {
               clearInterval(count);
               score.textContent = "";
               gameOver();
          } else if (i === questionsArr.length) {
               clearInterval(count);
          }
     }, 1000)
}

// Function here determines the ending for the user should they run out of time/score
function gameOver() {
     quizStage.removeChild(quizStage.firstChild);
     const gameOverText = document.createElement("button");
     gameOverText.setAttribute('style', 'display: flex')
     gameOverText.setAttribute('style', 'padding: 10px')
     gameOverText.setAttribute('class', 'btn-warning btn')
     gameOverText.textContent = "Time's up!";
     const gameOverButt = document.createElement('h6');
     gameOverButt.textContent = "Click to try again";
     quizStage.appendChild(gameOverText);
     gameOverText.appendChild(gameOverButt);
     gameOverText.addEventListener('click', function () {
          location.reload();
     })


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
     event.stopPropagation();
     startButton.setAttribute("style", "display: none");
     titleText.setAttribute("style", "display: none");
     countDown();
}

// Function here triggers when no questions remain
function endQuiz() {
     quizStage.textContent = 'Final Score:';
     $('#formArea').attr('style', "display: flex");

     $('#formButt').click(function (event) {
          event.preventDefault();
          let newUser = {
               initials: inits.value,
               score: scoreTimer,
          }
          scoreBoard.push(newUser);
          localStorage.setItem("quizScores", JSON.stringify(scoreBoard));
          $('#stage').attr('style', "visibility: hidden");
          $('#formArea').attr('style', "display: none");
          score.textContent = "";
          let boardStage = document.createElement('div')
          $(boardStage).attr('class', 'container-sm d-flex mx-auto bg-secondary').css({
               "height": "500px",
               "border-radius": "9px"
          });
          $('body').append(boardStage);
          $('#formStage').text("Score Board").css({
               'font-size': '250%',
               'top': "-200px"
          }).addClass("text-primary");

          renderScores(boardStage);
     })
}

function storageInit() {
     let i = 0;
     if (localStorage.quizScores) {
          let storageObj = JSON.parse(localStorage.quizScores)
          while (i < storageObj.length) {
               let item = storageObj[i];
               scoreBoard.push(item);
               i++;
          }
     } else {
          return;
     }
}
// renderScores();
// Renders scoreboard by parsing array of objects
function renderScores(parent) {
     // Generate essential table structure
          let frame = $('<table class="table"></table').appendTo(parent);
          let header = $('<thead></thead').appendTo(frame);
          let headRow = $('<tr></tr>').appendTo(header);
          let numCol = $('<th scope="col">#</th>').appendTo(headRow);
          let nameCol = $('<th scope="col">Name</th>').appendTo(headRow);
          let scoreCol = $('<th scope="col">Score</th>').appendTo(headRow);
          let tableBody = $('<tbody></tbody').appendTo(frame)

          // parses objects of scoreBoard array
     scoreBoard.sort((a, b) => (a.score < b.score) ? 1 : -1);
     let initsArr = scoreBoard.map(user => user.initials);
     let scoresArr = scoreBoard.map(user => user.score);
     console.log(scoreBoard)
     scoreBoard.forEach((player) => {
          const placeRow = $('<tr></tr>').appendTo(tableBody)
          let placeRank = $('<th scope="row"></th>').text(initsArr.indexOf(player.initials) + 1);
          let placeInit = $('<td></td>').text(player.initials);
          let placeScore = $('<td></td>').text(player.score);
          placeRank.appendTo(placeRow);
          placeInit.appendTo(placeRow);
          placeScore.appendTo(placeRow);
          ;
     })
     
     const highScores = scoreBoard.filter(user => user.score >= 50);
}



// Start Button Listener
startButton.addEventListener("click", startQuiz);
// Score Submit Button Listener