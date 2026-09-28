// Спільний мозок для обох сторінок: очки і прокачки живуть у localStorage
const UPGRADES = [
  { id: 'finger', icon: '💪', name: 'Сильний палець', desc: '+1 очко за клік',        type: 'click', value: 1,  base: 15,  mult: 1.5 },
  { id: 'brat',   icon: '🕶️', name: 'Братки на підхваті', desc: '+1 очко за секунду', type: 'auto',  value: 1,  base: 50,  mult: 1.6 },
  { id: 'boss',   icon: '👑', name: 'Слово авторитета', desc: '+10 очок за клік',     type: 'click', value: 10, base: 500, mult: 1.8 },
  { id: 'cash',   icon: '💰', name: 'Общак',            desc: '+5 очок за секунду',   type: 'auto',  value: 5,  base: 300, mult: 1.7 },
];

const KEY = 'game67';
const Game = {
  state: { score: 0, levels: {} },
  load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s) this.state = { score: s.score || 0, levels: s.levels || {} };
    } catch (e) {}
  },
  save() { try { localStorage.setItem(KEY, JSON.stringify(this.state)); } catch (e) {} },
  level(id) { return this.state.levels[id] || 0; },
  cost(u) { return Math.floor(u.base * Math.pow(u.mult, this.level(u.id))); },
  sum(type) { return UPGRADES.filter(u => u.type === type).reduce((s, u) => s + u.value * this.level(u.id), 0); },
  perClick() { return 1 + this.sum('click'); },
  perSec() { return this.sum('auto'); },
  add(n) { this.state.score += n; this.save(); },
  buy(id) {
    const u = UPGRADES.find(x => x.id === id);
    const c = this.cost(u);
    if (this.state.score < c) return false;
    this.state.score -= c;
    this.state.levels[id] = this.level(id) + 1;
    this.save();
    return true;
  },
  reset() { this.state = { score: 0, levels: {} }; this.save(); },
};
Game.load();
const fmt = n => Math.floor(n).toLocaleString('uk-UA');