const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote the Indian national anthem?",
    options: ["Rabindranath Tagore", "Bankim Chandra", "Mahatma Gandhi", "Sarojini Naidu"],
    answer: "Rabindranath Tagore"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    answer: "Tokyo"
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "Which gas do plants absorb?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide"
  }
];

let currentQ = 0;
let score = 0;
let selectedOption = null;
let totalTime = 120;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const progress = document.getElementById("progress");
const scoreEl = document.getElementById("score");

function showQuestion(index) {
  const q = questions[index];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  progress.textContent = `Question ${index + 1} of ${questions.length}`;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-outline-dark");
    btn.textContent = option;
    btn.onclick = () => {
      selectedOption = option;
      nextBtn.disabled = false;
      Array.from(optionsEl.children).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    };
    optionsEl.appendChild(btn);
  });
}

function updateTimer() {
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  timerEl.textContent = `⏱ ${minutes}:${seconds.toString().padStart(2, "0")}`;
  totalTime--;

  if (totalTime < 0) {
    endQuiz();
  }
}

function nextQuestion() {
  if (selectedOption === questions[currentQ].answer) score++;
  currentQ++;

  if (currentQ < questions.length) {
    selectedOption = null;
    nextBtn.disabled = true;
    showQuestion(currentQ);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  quizBox.classList.add("d-none");
  resultBox.classList.remove("d-none");
  scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
}

document.addEventListener("DOMContentLoaded", () => {
  showQuestion(currentQ);
  timer = setInterval(updateTimer, 1000);
});

nextBtn.addEventListener("click", nextQuestion);
