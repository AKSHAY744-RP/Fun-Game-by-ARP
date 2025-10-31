const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 150, width: 34, height: 24, gravity: 0.6, lift: -10, velocity: 0 };
let pipes = [];
let frame = 0;
let score = 0;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 50, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, 50, pipe.bottom);
  });
}

function update() {
  frame++;
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (frame % 100 === 0) {
    let top = Math.random() * 200 + 50;
    let bottom = canvas.height - top - 150;
    pipes.push({ x: canvas.width, top: top, bottom: bottom });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;
    if (pipe.x + 50 < 0) pipes.shift();

    if (bird.x < pipe.x + 50 && bird.x + bird.width > pipe.x &&
        (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)) {
      resetGame();
    }
  });

  if (bird.y + bird.height > canvas.height || bird.y < 0) resetGame();
}

function resetGame() {
  bird.y = 150;
  bird.velocity = 0;
  pipes = [];
  score = 0;
}

function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawBird();
  drawPipes();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener("touchstart", () => bird.velocity = bird.lift);
loop();
