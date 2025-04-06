const questionBox = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("time");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let time = 30;
let interval;

function showQuestion(index) {
  clearInterval(interval);
  time = 30;
  startTimer();

  const q = questions[index];
  questionBox.textContent = q.question;
  optionsBox.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(option);
    optionsBox.appendChild(li);
  });

  nextBtn.disabled = true;
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  const options = optionsBox.querySelectorAll("li");

  options.forEach(opt => {
    opt.style.pointerEvents = "none";
    if (opt.textContent === correct) opt.style.background = "#28a745";
    else if (opt.textContent === selected) opt.style.background = "#dc3545";
  });

  if (selected === correct) score++;
  nextBtn.disabled = false;
  clearInterval(interval);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    showResult();
  }
}

function startTimer() {
  timerDisplay.textContent = time;
  interval = setInterval(() => {
    time--;
    timerDisplay.textContent = time;
    if (time === 0) {
      clearInterval(interval);
      checkAnswer(""); // No answer given
      nextBtn.disabled = false;
    }
  }, 1000);
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length} (${Math.round(score / questions.length * 100)}%)`;
}

nextBtn.addEventListener("click", nextQuestion);

window.onload = () => {
  showQuestion(currentQuestion);
};
