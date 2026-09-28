const grid = document.getElementById('grid');
const scoreEl = document.getElementById('score');
const toast = document.getElementById('toast');

function render() {
  scoreEl.textContent = fmt(Game.state.score);
  document.getElementById('pc').textContent = 'За клік: ' + fmt(Game.perClick());
  document.getElementById('ps').textContent = 'За секунду: ' + fmt(Game.perSec());
  grid.innerHTML = '';
  UPGRADES.forEach(u => {
    const cost = Game.cost(u);
    const can = Game.state.score >= cost;
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML =
      '<div class="icon">' + u.icon + '</div>' +
      '<h2>' + u.name + '</h2>' +
      '<p>' + u.desc + '</p>' +
      '<p class="lvl">Рівень: ' + Game.level(u.id) + '</p>' +
      '<button class="btn buy" data-id="' + u.id + '"' + (can ? '' : ' disabled') + '>Купити за ' + fmt(cost) + '</button>';
    grid.appendChild(card);
  });
}

function say(t) {
  toast.textContent = t;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1400);
}

grid.addEventListener('click', e => {
  const b = e.target.closest('.buy');
  if (!b) return;
  const u = UPGRADES.find(x => x.id === b.dataset.id);
  if (Game.buy(u.id)) { say('Куплено: ' + u.name); render(); }
});

document.getElementById('reset').addEventListener('click', () => {
  if (confirm('Точно все обнулити, босс?')) { Game.reset(); render(); }
});

// пасивний дохід іде і тут
setInterval(() => {
  const s = Game.perSec();
  if (s > 0) { Game.add(s); render(); }
}, 1000);

render();