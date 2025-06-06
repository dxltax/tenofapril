const canvas = document.getElementById('orbitCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let orbs = [];

const colors = ["#00ff00", "#00bfff", "#0a0a0a"];

for (let i = 0; i < 30; i++) {
  orbs.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    r: Math.random() * 8 + 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    glow: false
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let orb of orbs) {
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2, false);
    ctx.fillStyle = orb.glow ? 'white' : orb.color;
    ctx.shadowColor = orb.glow ? orb.color : 'transparent';
    ctx.shadowBlur = orb.glow ? 20 : 0;
    ctx.fill();
  }
}

function update() {
  for (let orb of orbs) {
    orb.x += orb.dx;
    orb.y += orb.dy;

    if (orb.x + orb.r > canvas.width || orb.x - orb.r < 0) orb.dx *= -1;
    if (orb.y + orb.r > canvas.height || orb.y - orb.r < 0) orb.dy *= -1;
  }
}

canvas.addEventListener('click', function(e) {
  for (let orb of orbs) {
    const dist = Math.hypot(e.clientX - orb.x, e.clientY - orb.y);
    if (dist < orb.r) {
      orb.glow = true;
      setTimeout(() => {
        window.location.href = "broken.html";
      }, 300);
    }
  }
});

function animate() {
  requestAnimationFrame(animate);
  update();
  draw();
}

animate();
