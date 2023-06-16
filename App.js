//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "What country has the highest life expectancy?",
    options: ["Great Britan", "USA", "France", "HONG KONG"],
    correct: "HONG KONG",
  },
  {
    id: "1",
    question: "Where would you be if you were standing on the Spanish Steps?",
    options: ["Brazil", "India", "Mexico", "Rome"],
    correct: "3",
  },
  {
    id: "2",
    question: "What was the name of the crime boss who was head of the feared Chicago Outfit?",
    options: ["Al Capone", "El Pacho", "Machette", "Eazy E"],
    correct: "12",
  },
  {
    id: "3",
    question: "Which planet has the most moons?",
    options: ["Mercury", "Saturn", "Venus", "Jupiter"],
    correct: "Saturn",
  },
  {
    id: "4",
    question: "What is a group of pandas known as?",
    options: ["A Herd", "A Swamp", "An embarrassment", "A group"],
    correct: "jaw",
  },
  {
    id: "5",
    question: "What Netflix show had the most streaming views in 2021?",
    options: ["Friends", "Kevin hart Irresponsible", "Squid Game", "Jumanji"],
    correct: "Squid Game",
  }, {
    id: "6",
    question: "Which animal kills the most humans annually?",
    options: ["Bees", "Mosquitoes", "Sharks", "Alligators"],
    correct: "Mosquitoes",
  },
  {
    id: "7",
    question: "In the Lion King, who is Simba's uncle?",
    options: ["Mufasa", "Timon", "Scar", "Zazu"],
    correct: "Scar",
  },
  {
    id: "8",
    question: "Which app has the most total users?",
    options: ["Whatsapp", "TikTok", "Snapchat", "Instagram"],
    correct: "Instagram",
  },
  {
    id: "9",
    question: "What is the world's fastest bird?",
    options: ["The Peregrine Falcon", "An Ostrich", "An eagle", "A Hawk"],
    correct: "The Peregrine Falcon",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Questions";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Questions";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};