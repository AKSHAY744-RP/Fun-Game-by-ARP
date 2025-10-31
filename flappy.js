const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird, pipes, score, gameRunning, gravity, lift, velocity, interval;
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const scoreDisplay = document.getElementById("score");

function initGame() {
  bird = { x: 50, y: 200, width: 30, height: 30 };
  pipes = [];
  score = 0;
  gravity = 0.5;
  lift = -8;
  velocity = 0;
  gameRunning = false;
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
  scoreDisplay.textContent = 0;
}

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  interval = requestAnimationFrame(gameLoop);
}

function stopGame() {
  gameRunning = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  cancelAnimationFrame(interval);
}

function gameLoop() {
  update();
  draw();
  if (gameRunning) requestAnimationFrame(gameLoop);
}

function update() {
  velocity += gravity;
  bird.y += velocity;

  if (bird.y + bird.height >= canvas.height || bird.y <= 0) gameOver();

  if (Math.random() < 0.02) {
    let gap = 120;
    let top = Math.random() * (canvas.height - gap - 80) + 20;
    pipes.push({ x: canvas.width, top, bottom: top + gap });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    if (
      bird.x < pipe.x + 50 &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
    ) {
      gameOver();
    }

    if (pipe.x + 50 === bird.x) {
      score++;
      scoreDisplay.textContent = score;
    }
  });

  pipes = pipes.filter(pipe => pipe.x + 50 > 0);
}

function draw() {
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Bird
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  // Pipes
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 50, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, 50, canvas.height - pipe.bottom);
  });
}

function gameOver() {
  stopGame();
  alert(`Game Over! Your score: ${score}`);
  initGame();
}

window.addEventListener("touchstart", () => (velocity = lift));
startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);

initGame();
