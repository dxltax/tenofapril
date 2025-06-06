const canvas = document.getElementById('orbitCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let orbs = [];
const orbColors = ["#00ff00", "#00bfff", "#0a0a0a"];

for (let i = 0; i < 30; i++) {
  orbs.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    r: Math.random() * 8 + 5,
    color: orbColors[Math.floor(Math.random() * orbColors.length)],
    glow: false
  });
}

let mainOrb = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 1.2,
  dy: 1.5,
  r: 40, 
  glow: true,
  hue: 0, 
  emoji: '🫛'
};

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

  ctx.font = `${mainOrb.r * 0.9}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText(mainOrb.emoji, mainOrb.x, mainOrb.y);
}

function update() {
  for (let orb of orbs) {
    orb.x += orb.dx;
    orb.y += orb.dy;

    if (orb.x + orb.r > canvas.width || orb.x - orb.r < 0) orb.dx *= -1;
    if (orb.y + orb.r > canvas.height || orb.y - orb.r < 0) orb.dy *= -1;
  }

  mainOrb.x += mainOrb.dx;
  mainOrb.y += mainOrb.dy;

  if (mainOrb.x + mainOrb.r > canvas.width || mainOrb.x - mainOrb.r < 0) mainOrb.dx *= -1;
  if (mainOrb.y + mainOrb.r > canvas.height || mainOrb.y - mainOrb.r < 0) mainOrb.dy *= -1;

  mainOrb.hue = (mainOrb.hue + 1) % 360;
}

canvas.addEventListener('click', function(e) {
  const dist = Math.hypot(e.clientX - mainOrb.x, e.clientY - mainOrb.y);
  if (dist < mainOrb.r) {
    window.location.href = "broken.html";
    return;
  }

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
