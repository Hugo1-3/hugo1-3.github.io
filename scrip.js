const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let particles = [];
const totalParticles = 300;

function heartFunction(t, scale = 10) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x: x * scale, y: y * scale };
}

// Create particles
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

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const time = Date.now() * 0.002;
  const beatScale = 1 + 0.2 * Math.sin(time * 3);

  for (let p of particles) {
    let angleRad = p.angle * (Math.PI / 180);
    let x = p.baseX + Math.cos(angleRad + time) * 5 * beatScale;
    let y = p.baseY + Math.sin(angleRad + time) * 5 * beatScale;

    ctx.beginPath();
    ctx.arc(x, y, p.size * beatScale, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 10;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();

// "Te Amo" aparece al hacer clic
const teAmoText = document.getElementById('teAmo');
document.addEventListener('click', () => {
  teAmoText.classList.remove('hidden');
});

// Botón que reproduce sonido y redirige
const loveButton = document.getElementById('loveButton');

loveButton.addEventListener('click', () => {
  setTimeout(() => {
    window.location.href = 'pagina2.html';
  }, 4000); // espera 4 segundos antes de ir a la segunda página
});
