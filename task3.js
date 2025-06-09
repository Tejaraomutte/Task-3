let currentSlide = 0;
const carousel = document.querySelector('.carousel');
setInterval(() => {
  currentSlide = (currentSlide + 1) % carousel.children.length;
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}, 3000);

const quizzes = {
  html: [
    { q: "What does HTML stand for?", a: ["HyperText Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"], correct: 0 },
    { q: "Which tag creates a hyperlink?", a: ["<a>", "<link>", "<href>", "<hyper>"], correct: 0 },
    { q: "Which tag defines a paragraph?", a: ["<p>", "<para>", "<text>", "<pg>"], correct: 0 },
    { q: "HTML files are saved with which extension?", a: [".htm", ".html", ".web", ".page"], correct: 1 },
    { q: "What is the root element of an HTML document?", a: ["<html>", "<head>", "<body>", "<document>"], correct: 0 }
  ],
  css: [
    { q: "What does CSS stand for?", a: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], correct: 0 },
    { q: "Which property changes text color?", a: ["color", "text-color", "font-color", "foreground"], correct: 0 },
    { q: "Which CSS unit is relative to font-size?", a: ["em", "px", "%", "pt"], correct: 0 },
    { q: "How do you select an element with ID 'main'?", a: ["#main", ".main", "main", "*main"], correct: 0 },
    { q: "Which property controls spacing between lines?", a: ["line-height", "spacing", "height", "margin"], correct: 0 }
  ],
  js: [
    { q: "Which keyword declares a variable?", a: ["let", "var", "const", "All of the above"], correct: 3 },
    { q: "How do you write a comment in JS?", a: ["//", "<!-- -->", "#", "**"], correct: 0 },
    { q: "Which method prints to console?", a: ["print()", "console.log()", "echo()", "log()"], correct: 1 },
    { q: "What data type is '123'?", a: ["string", "number", "boolean", "object"], correct: 0 },
    { q: "Which is a loop structure?", a: ["for", "loop", "repeat", "circle"], correct: 0 }
  ]
};

let currentQuiz = [];
let quizIndex = 0;
let score = 0;
let timer;
let selectedCategory;

function startQuiz(cat) {
  selectedCategory = cat;
  currentQuiz = quizzes[cat];
  quizIndex = 0;
  score = 0;
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  startTimer();
  showQuestion();
}

function showQuestion() {
  const q = currentQuiz[quizIndex];
  document.getElementById("question").textContent = q.q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => {
      if (!btn.classList.contains("clicked")) {
        btn.classList.add("clicked");
        if (i === q.correct) {
          score++;
          btn.style.background = "green";
        } else {
          btn.style.background = "red";
          const correctBtn = Array.from(optionsDiv.children)[q.correct];
          correctBtn.style.background = "green";
        }
      }
    };
    optionsDiv.appendChild(btn);
  });
}

function nextQuestion() {
  quizIndex++;
  if (quizIndex < currentQuiz.length) {
    showQuestion();
  } else {
    clearInterval(timer);
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("result").innerHTML = `
      <h3>Quiz Completed!</h3>
      <p>Your Score: ${score} / ${currentQuiz.length}</p>
    `;
  }
}

function startTimer() {
  let timeLeft = 60;
  document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function getWeather() {
  const city = document.getElementById("city").value;
  fetch(`https://wttr.in/${city}?format=3`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("weather-result").textContent = data;
    });
}

function getJoke() {
  fetch("https://v2.jokeapi.dev/joke/Programming?type=single")
    .then(res => res.json())
    .then(data => {
      document.getElementById("joke-text").textContent = data.joke;
    });
}
