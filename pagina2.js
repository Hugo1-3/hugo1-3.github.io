const canvas = document.getElementById('heartArrowCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

function heartFunction(t, scale = 10) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x: x * scale, y: y * scale };
}

let particles = [];
const totalParticles = 300;

for (let i = 0; i < totalParticles; i++) {
  let t = Math.random() * Math.PI * 2;
  let pos = heartFunction(t);
  particles.push({
    baseX: canvas.width / 2 + pos.x,
    baseY: canvas.height / 2 + pos.y,
    size: Math.random() * 2 + 1,
    angle: Math.random() * 360
  });
}

let arrowX = -100; // Inicio fuera del canvas
let arrowY = 200;  // Centro vertical
let arrowSpeed = 2;

function drawArrow(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(-50, 0);
  ctx.lineTo(50, 0);
  ctx.strokeStyle = 'gold';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.lineTo(40, -5);
  ctx.lineTo(40, 5);
  ctx.closePath();
  ctx.fillStyle = 'gold';
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar el corazón latiente
  const time = Date.now() * 0.002;
  const beatScale = 1 + 0.2 * Math.sin(time * 3);

  for (let p of particles) {
    let angleRad = p.angle * (Math.PI / 180);
    let x = p.baseX + Math.cos(angleRad + time) * 5 * beatScale;
    let y = p.baseY + Math.sin(angleRad + time) * 5 * beatScale;

    ctx.beginPath();
    ctx.arc(x, y, p.size * beatScale, 0, Math.PI * 2);
    ctx.fillStyle = 'pink';
    ctx.shadowColor = 'pink';
    ctx.shadowBlur = 10;
    ctx.fill();
  }

  // Flecha pasa "detrás" si ya atravesó el corazón
  if (arrowX > 200) {
    drawArrow(arrowX, arrowY); // por detrás
  }

  // Corazón en el centro
  for (let p of particles) {
    let angleRad = p.angle * (Math.PI / 180);
    let x = p.baseX + Math.cos(angleRad + time) * 5 * beatScale;
    let y = p.baseY + Math.sin(angleRad + time) * 5 * beatScale;

    ctx.beginPath();
    ctx.arc(x, y, p.size * beatScale, 0, Math.PI * 2);
    ctx.fillStyle = 'pink';
    ctx.shadowColor = 'pink';
    ctx.shadowBlur = 10;
    ctx.fill();
  }

  // Flecha pasa "delante" si aún no ha llegado al corazón
  if (arrowX <= 200) {
    drawArrow(arrowX, arrowY); // por delante
  }

  arrowX += arrowSpeed;
  if (arrowX > 500) arrowX = -100; // reinicia animación

  requestAnimationFrame(animate);
}
 document.addEventListener('click', function() {
      const musica = document.getElementById('musica');
      musica.play();
    }, { once: true });
