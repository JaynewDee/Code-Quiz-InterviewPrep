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
console.log(scoreBoard);


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
          console.log(scoreBoard);
          localStorage.setItem("quizScores", JSON.stringify(scoreBoard));
          $('#stage').attr('style', "visibility: hidden");
          $('#formArea').attr('style', "display: none");
          score.textContent = "";
          let boardStage = document.createElement('div')
          $(boardStage).attr('class', 'container-sm d-flex mx-auto bg-secondary').css({
               "height": "500px",
               "border-radius": "20px"
          });
          $('body').append(boardStage);
          $('#formStage').text("Score Board").css({'font-size':'250%', 'top': "-200px"}).addClass("text-primary");
          
          scoreBoard.sort((a, b) => (a.score < b.score) ? 1 : -1);
          scoreBoard.forEach((item) => console.log(item));
          const tableTemplate = `
          <table class="table">
               <thead>
                    <tr>
                         <th scope="col">#</th>
                         <th scope="col">Name/Initials</th>
                         <th scope="col">Score</th>
                    </tr>
               </thead>
               <tbody>
                    <tr>
                         <th scope="row">1</th>
                         <td>${scoreBoard[0].initials}</td>
                         <td>${scoreBoard[0].score}</td>
                    </tr>
                    <tr>
                         <th scope="row">2</th>
                         <td>${scoreBoard[1].initials}</td>
                         <td>${scoreBoard[1].score}</td>
                    </tr>
                    <tr>
                         <th scope="row">3</th>
                         <td>${scoreBoard[2].initials}</td>
                         <td>${scoreBoard[2].score}</td>
                    </tr>
                    <tr>
                         <th scope="row">4</th>
                         <td>${scoreBoard[3].initials}</td>
                         <td>${scoreBoard[3].score}</td>
                    </tr>
                    <tr>
                         <th scope="row">5</th>
                         <td>${scoreBoard[4].initials}</td>
                         <td>${scoreBoard[4].score}</td>
                    </tr>
                    <tr>
                         <th scope="row">6</th>
                         <td>${scoreBoard[5].initials}</td>
                         <td>${scoreBoard[5].score}</td>
                    </tr>
                    <tr>
                         <th scope="row">7</th>
                         <td>${scoreBoard[6].initials}</td>
                         <td>${scoreBoard[6].score}</td>
                    </tr>
               </tbody>
          </table>`;
          boardStage.innerHTML = tableTemplate;
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
// Stores player's score locally
// Refreshes page display and reveals scoreboard




// Start Button Listener
startButton.addEventListener("click", startQuiz);
// Score Submit Button Listener
;