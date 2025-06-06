const canvas = document.getElementById('orbitCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Bintang (12 buah)
const totalStars = 12;
let stars = [];

// Emoji orb 🫛
let mainOrb = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 1.2,
  dy: 1.5,
  r: 60,
  hue: 0,
  emoji: '🫛'
};

// Inisialisasi bintang
for (let i = 0; i < totalStars; i++) {
  const angle = (Math.PI * 2 / totalStars) * i;
  const radius = Math.min(canvas.width, canvas.height) / 3;
  const x = canvas.width / 2 + radius * Math.cos(angle);
  const y = canvas.height / 2 + radius * Math.sin(angle);

  stars.push({
    x, y,
    dx: (Math.random() - 0.5) * 1.5,
    dy: (Math.random() - 0.5) * 1.5,
    r: 25,
    color: `hsl(${Math.random()*360}, 70%, 60%)`,
    glowOffset: Math.random() * Math.PI * 2,
    num: i + 1
  });
}

// Gambar bintang
function drawStar(cx, cy, spikes, outerR, innerR, color, glow) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerR;
    y = cy + Math.sin(rot) * outerR;
    ctx.lineTo(x, y);
    rot += step;
    x = cx + Math.cos(rot) * innerR;
    y = cy + Math.sin(rot) * innerR;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = glow ? color : 'transparent';
  ctx.shadowBlur = glow ? 20 : 0;
  ctx.fill();
}

// Gambar semua
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bintang
  stars.forEach(star => {
    const glow = Math.abs(Math.sin(Date.now()/500 + star.glowOffset));
    const blur = 10 + glow * 20;
    drawStar(star.x, star.y, 5, star.r, star.r/2, star.color, true);

    // Nomor di tengah
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(star.num, star.x, star.y);
  });

  // Emoji orb 🫛
  const rc = mainOrb;
  const rainbow = `hsl(${rc.hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.arc(rc.x, rc.y, rc.r, 0, Math.PI*2);
  ctx.fillStyle = rainbow;
  ctx.shadowColor = rainbow;
  ctx.shadowBlur = 50;
  ctx.fill();

  ctx.font = `${rc.r * 0.9}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText(rc.emoji, rc.x, rc.y);
}

// Update posisi
function update() {
  for (let star of stars) {
    star.x += star.dx;
    star.y += star.dy;

    if (star.x + star.r > canvas.width || star.x - star.r < 0) star.dx *= -1;
    if (star.y + star.r > canvas.height || star.y - star.r < 0) star.dy *= -1;
  }

  mainOrb.x += mainOrb.dx;
  mainOrb.y += mainOrb.dy;
  if (mainOrb.x + mainOrb.r > canvas.width || mainOrb.x - mainOrb.r < 0) mainOrb.dx *= -1;
  if (mainOrb.y + mainOrb.r > canvas.height || mainOrb.y - mainOrb.r < 0) mainOrb.dy *= -1;
  mainOrb.hue = (mainOrb.hue + 1) % 360;
}

// Klik event
canvas.addEventListener('click', e => {
  const mx = e.clientX, my = e.clientY;
  const dMain = Math.hypot(mx - mainOrb.x, my - mainOrb.y);
  if (dMain < mainOrb.r) return void(location.href = 'broken.html');

  stars.forEach(star => {
    const d = Math.hypot(mx - star.x, my - star.y);
    if (d < star.r) location.href = `poem${star.num}.html`;
  });
});

// Loop animasi
function animate() {
  requestAnimationFrame(animate);
  update();
  draw();
}
animate();

// Resize handling
window.addEventListener('resize', () => location.reload());
