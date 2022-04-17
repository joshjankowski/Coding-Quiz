const shade = new Audio("soundfx/itschocolate.mp3"); // Adding Shade Sound
const begin = document.querySelector("#begin"); // Grabbing Begin Button
const viewScoreboard = document.querySelector("#view-scoreboard"); // View Scoreboard Button
const time = document.querySelector("#timer"); // Grabbing Timer location
const highscore = document.querySelector(".highscore"); // Grabbing High Score Location
const jumboTron = document.querySelector(".quiz");
const questionText = document.querySelector(".question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const losingImage = document.querySelector(".losing-image");

let secondsLeft = 20;

// Function to set the timer.
function setTime() {
  // Sets interval in variable
  let timerInterval = setInterval(function () {
    secondsLeft--;
    time.textContent = secondsLeft + " seconds left till end of quiz.";

    if (secondsLeft <= 0) {
      jumboTron.style.display = "none";
      begin.textContent = "Play Again!";
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      if (secondsLeft <= 0) {
        secondsLeft = 20;
      }
      // Calls function to create and append image
      youFail();
    }
  }, 1000);
}
// Function to create the failed message, image and sound when user runs out of time.
function youFail() {
  time.textContent = "Time is up!";
  let imgEl = document.createElement("img");
  imgEl.setAttribute("src", "images/rupaul-fail.jpg");
  imgEl.setAttribute("width", "200px");
  losingImage.style.display = "block";
  losingImage.appendChild(imgEl);
  shade.play();
}
// Setting timer function ends

// Setting local storage
let score = localStorage.getItem("score");
highscore.textContent = score;

// Questions to ask made into objects.
let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0; // Holds the number of questions you are on
let availableQuestions = [];
let questions = [
  {
    question: "Who is currently on the cast of Season 14?",
    choice1: "Derrick Berry",
    choice2: "Raja",
    choice3: "Manila Luzon",
    choice4: "Willow Pill",
    answer: 4,
  },
  {
    question: "Who is currently on the cast of All Stars 7?",
    choice1: "Derrick Berry",
    choice2: "Raja",
    choice3: "Manila Luzon",
    choice4: "Willow Pill",
    answer: 2,
  },
  {
    question: "Who is hosting RuPaul's Drag Race Phillipines?",
    choice1: "Derrick Berry",
    choice2: "Raja",
    choice3: "Manila Luzon",
    choice4: "Willow Pill",
    answer: 3,
  },
  {
    question: "Who has been disqualified?",
    choice1: "Coco Montrese",
    choice2: "Willam",
    choice3: "Daya Betty",
    choice4: "Asia O'Hara",
    answer: 2,
  },
  {
    question: "Who won All Stars 3?",
    choice1: "Trixie Mattel",
    choice2: "Katya",
    choice3: "Acid Betty",
    choice4: "BenDeLaCreme",
    answer: 1,
  },
  {
    question: "Who received the gold bar?",
    choice1: "Coco Montrese",
    choice2: "Willam",
    choice3: "Daya Betty",
    choice4: "Bosco",
    answer: 4,
  },
  {
    question:
      "Who has been on Season 2, AllStars 1, AllStars 5 and Uk VS the World?",
    choice1: "Monet Xchange",
    choice2: "Jujubee",
    choice3: "Jimbo",
    choice4: "Pangina Heals",
    answer: 2,
  },
  {
    question: "Who is the host of Drag Race Thailand?",
    choice1: "Manila Luzon",
    choice2: "Pangina Heals",
    choice3: "Jujubee",
    choice4: "Yuhua Hamasaki",
    answer: 2,
  },
  {
    question: "How many episodes are there in season 14?",
    choice1: "7",
    choice2: "10",
    choice3: "16",
    choice4: "25",
    answer: 3,
  },
  {
    question: "Who won season 12 of RuPaul's Drag Race?",
    choice1: "Jaida Essence Hall",
    choice2: "Jinx Monsoon",
    choice3: "Kimora Hall",
    choice4: "Willow Pill",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  jumboTron.style.display = "block";
  losingImage.style.display = "none";
  getNewQuestion();
  setTime();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("score", score);
  }

  questionCounter++;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  questionText.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    console.log("hI");
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
}

// Setting how the selection of the answers work.
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // Set the color of the answer when it is picked whether right or wrong
    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    if (classToApply === "incorrect") {
      if (secondsLeft >= 5) {
        secondsLeft -= 5;
      }
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Setting how to increase the score.
incrementScore = (num) => {
  score += num;
  highscore.innerText = score;
};
console.log(score);

begin.addEventListener("click", function () {
  startGame();
  // jumboTron.style.display = none;
});

const savedName = document.querySelector(".saved-name");
const savedScore = document.querySelector(".saved-score");
const submit = document.querySelector(".submit");
const input = document.querySelector(".input");
const storedInput = localStorage.getItem("name");

if (input) {
  savedName.textContent = storedInput;
  savedScore.appendChild(highscore);
}

input.addEventListener("input", (letters) => {
  savedName.textContent = letters.target.value;
});

const saveToLocalStorage = () => {
  localStorage.setItem("name", savedName.textContent);
  localStorage.setItem('score', highscore.textContent);
};

submit.addEventListener("click", saveToLocalStorage);
