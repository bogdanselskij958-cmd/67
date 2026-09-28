const scoreEl = document.getElementById('score');
const pcEl = document.getElementById('pc');
const psEl = document.getElementById('ps');
const btn = document.getElementById('click');
const pic = document.getElementById('pic');

function render() {
  scoreEl.textContent = fmt(Game.state.score);
  pcEl.textContent = '+' + fmt(Game.perClick()) + ' / клік';
  psEl.textContent = fmt(Game.perSec()) + ' / сек';
}

btn.addEventListener('click', e => {
  const n = Game.perClick();
  Game.add(n);
  pic.classList.add('visible');
  setTimeout(() => pic.classList.remove('visible'), 120);
  const p = document.createElement('span');
  p.className = 'pop';
  p.textContent = '+' + fmt(n);
  p.style.left = e.clientX + 'px';
  p.style.top = e.clientY + 'px';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 700);
  render();
});

// пасивний дохід від братків і общака
setInterval(() => {
  const s = Game.perSec();
  if (s > 0) { Game.add(s); render(); }
}, 1000);

render();