'use strict';

const STORAGE_KEY = 'pos-tugas-kampus:v1';
const API = {
  cuaca: 'https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true',
  kutipan: 'https://dummyjson.com/quotes/random',
  tugas: 'https://jsonplaceholder.typicode.com/todos?_limit=5'
};
const KODE_CUACA = { 0:'Cerah', 1:'Cerah berawan', 2:'Berawan sebagian', 3:'Mendung', 45:'Berkabut', 51:'Gerimis', 61:'Hujan ringan', 63:'Hujan sedang', 65:'Hujan lebat', 80:'Hujan lokal', 95:'Badai petir' };

const CONTOH_TUGAS = [
  { title: 'Tugas 3 Pengujian Perangkat Lunak', course: 'Pengujian Perangkat Lunak', hari: 2 },
  { title: 'Praktikum Pengembangan Aplikasi Web', course: 'Pengembangan Aplikasi Web', hari: 3 },
  { title: 'Kuis Machine Learning', course: 'Machine Learning', hari: 5 },
  { title: 'Tugas Kelompok Sistem Informasi Kesehatan', course: 'Sistem Informasi Kesehatan', hari: 7 },
  { title: 'Tugas Pengembangan Aplikasi Web', course: 'Pengembangan Aplikasi Web', hari: -1 }
];
const tanggalOffset = hari => {
  const d = new Date();
  d.setDate(d.getDate() + hari);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const buatContoh = (done = i => false) =>
  CONTOH_TUGAS.map(({ hari, ...rest }, i) => new TaskItem({ ...rest, deadline: tanggalOffset(hari), done: done(i) }));

class TaskItem {
  constructor({ id = crypto.randomUUID?.() ?? String(Date.now() + Math.random()), title, course = 'Umum', deadline = '', done = false }) {
    Object.assign(this, { id, title, course, deadline, done });
  }
  get daysLeft() {
    if (!this.deadline) return null;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return Math.round((new Date(`${this.deadline}T00:00:00`) - today) / 864e5);
  }
  get status() {
    const d = this.daysLeft;
    if (this.done || d === null) return { cls: 'ok', text: this.done ? 'Selesai' : 'Tanpa tenggat' };
    if (d < 0) return { cls: 'late', text: `Telat ${-d} hari` };
    if (d === 0) return { cls: 'soon', text: 'Hari ini' };
    return { cls: d <= 2 ? 'soon' : 'ok', text: `${d} hari lagi` };
  }
  static fromJSON(obj) { return new TaskItem(obj); }
}

class DashboardApp {
  constructor() {
    this.tasks = [];
    this.filter = 'semua';
    this.editingId = null;
    this.sourceNote = '';
    this.$ = id => document.getElementById(id);
  }

  async init() {
    this.bindEvents();
    this.startClock();
    this.loadTasks();
    this.render();
    await Promise.allSettled([this.loadWeather(), this.loadQuote(), this.seedIfEmpty()]);
  }

  loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.hasStored = raw !== null;
      this.tasks = raw ? JSON.parse(raw).map(TaskItem.fromJSON) : [];
    } catch (err) { this.tasks = []; this.hasStored = false; }
  }
  save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks)); }
    catch (err) { this.sourceNote = 'Penyimpanan lokal tidak tersedia; data hilang saat halaman ditutup.'; }
  }

  async fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
  async loadWeather() {
    try {
      const { current_weather: { temperature, weathercode, windspeed } } = await this.fetchJSON(API.cuaca);
      this.$('suhu').textContent = `${Math.round(temperature)}°C`;
      this.$('cuaca').textContent = `${KODE_CUACA[weathercode] ?? 'Kondisi lain'}, angin ${windspeed} km/j`;
    } catch (err) {
      this.$('suhu').textContent = '–';
      this.$('cuaca').textContent = 'Cuaca tidak dapat dimuat. Periksa koneksi internet.';
    }
  }
  async loadQuote() {
    try {
      const { quote, author } = await this.fetchJSON(API.kutipan);
      this.$('kutipan').textContent = `“${quote}”`;
      this.$('penulis').textContent = author;
    } catch (err) {
      this.$('kutipan').textContent = '“Mulai dari tugas yang paling dekat tenggatnya.”';
      this.$('penulis').textContent = 'Pengingat dari dashboard';
    }
  }
  async seedIfEmpty() {
    if (this.hasStored) return;
    let seeds;
    try {
      const todos = await this.fetchJSON(API.tugas);
      seeds = buatContoh(i => Boolean(todos[i]?.completed));
      this.sourceNote = 'Contoh tugas awal (status dari JSONPlaceholder). Ubah atau hapus sesuai kebutuhan.';
    } catch (err) {
      seeds = buatContoh();
      this.sourceNote = 'API contoh tidak dapat dimuat, jadi contoh tugas dibuat secara lokal.';
    }
    this.tasks = [...seeds];
    this.hasStored = true;
    this.save();
    this.render();
  }

  addTask = ({ title, course, deadline }) => {
    this.tasks = [new TaskItem({ title, course: course || 'Umum', deadline }), ...this.tasks];
    this.save(); this.render();
  };
  updateTask = (id, changes) => {
    this.tasks = this.tasks.map(t => (t.id === id ? new TaskItem({ ...t, ...changes }) : t));
    this.save(); this.render();
  };
  deleteTask = id => {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save(); this.render();
  };

  bindEvents() {
    this.$('formTugas').addEventListener('submit', e => {
      e.preventDefault();
      const title = this.$('fJudul').value.trim();
      if (!title) return;
      this.addTask({ title, course: this.$('fMk').value.trim(), deadline: this.$('fTenggat').value });
      e.target.reset();
    });
    this.$('filter').addEventListener('click', ({ target }) => {
      const f = target.dataset.f;
      if (!f) return;
      this.filter = f;
      this.$('filter').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === f)));
      this.render();
    });
    this.$('daftar').addEventListener('click', ({ target }) => {
      const li = target.closest('li[data-id]');
      const act = target.dataset.act;
      if (!li || !act) return;
      const id = li.dataset.id;
      if (act === 'hapus') this.deleteTask(id);
      if (act === 'edit') { this.editingId = id; this.render(); }
      if (act === 'batal') { this.editingId = null; this.render(); }
      if (act === 'simpan') {
        const [title, course, deadline] = [...li.querySelectorAll('input')].map(i => i.value.trim());
        if (!title) return;
        this.editingId = null;
        this.updateTask(id, { title, course: course || 'Umum', deadline });
      }
    });
    this.$('daftar').addEventListener('change', ({ target }) => {
      if (target.type !== 'checkbox') return;
      this.updateTask(target.closest('li').dataset.id, { done: target.checked });
    });
  }

  startClock() {
    const tick = () => {
      const now = new Date();
      this.$('jam').textContent = now.toLocaleTimeString('id-ID', { hour12: false });
      this.$('tanggal').textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };
    tick();
    setInterval(tick, 1000);
  }

  escape = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  renderTask = task => {
    const { id, title, course, deadline, done, status } = task;
    const e = this.escape;
    if (id === this.editingId) {
      return `<li class="task" data-id="${id}"><div class="editrow">
        <input value="${e(title)}" maxlength="80" aria-label="Judul">
        <input value="${e(course)}" maxlength="40" aria-label="Mata kuliah">
        <input type="date" value="${e(deadline)}" aria-label="Tenggat">
        <button class="primary" data-act="simpan">Simpan</button>
        <button data-act="batal">Batal</button></div></li>`;
    }
    return `<li class="task ${done ? 'done' : ''}" data-id="${id}">
      <input type="checkbox" ${done ? 'checked' : ''} aria-label="Tandai selesai: ${e(title)}">
      <div><div class="title">${e(title)}</div>
        <div class="meta">${e(course)}${deadline ? ` · ${new Date(`${deadline}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}` : ''} · <span class="badge ${status.cls}">${status.text}</span></div></div>
      <div class="actions"><button data-act="edit">Ubah</button><button data-act="hapus">Hapus</button></div></li>`;
  };

  render() {
    const visible = this.tasks
      .filter(({ done }) => this.filter === 'semua' || (this.filter === 'selesai' ? done : !done))
      .sort((a, b) => (a.deadline || '9999').localeCompare(b.deadline || '9999'));
    this.$('daftar').innerHTML = visible.length
      ? visible.map(this.renderTask).join('')
      : '<li class="empty">Belum ada tugas di sini. Tambahkan tugas pertama lewat formulir di atas.</li>';
    const active = this.tasks.filter(t => !t.done);
    this.$('sTotal').textContent = this.tasks.length;
    this.$('sAktif').textContent = active.length;
    this.$('sTelat').textContent = active.filter(t => t.daysLeft !== null && t.daysLeft < 0).length;
    this.$('sumber').textContent = this.sourceNote;
  }
}

new DashboardApp().init();
