/* ===========================
   NAVRAS — Main JavaScript
   =========================== */

/* ---- Mood Search Data ---- */
const rasaData = {
  shringara: {
    label: "Top Shringara picks for you",
    prompt: '"romantic but not too cheesy, set in modern India"',
    films: [
      { title: "Dilwale Dulhania Le Jayenge", meta: "Hindi · 1995 · Romance", score: "9.8", color: "#1a0d2e", scoreColor: "#2ECC71" },
      { title: "Jab We Met", meta: "Hindi · 2007 · Romance Comedy", score: "9.2", color: "#0d1a2e", scoreColor: "#2ECC71" },
      { title: "OK Kanmani", meta: "Tamil · 2015 · Romance", score: "9.0", color: "#2e1a0d", scoreColor: "#2ECC71" }
    ]
  },
  hasya: {
    label: "Top Hasya picks — laugh your heart out",
    prompt: '"something funny but smart, makes me forget my day"',
    films: [
      { title: "Stree 2", meta: "Hindi · 2024 · Horror Comedy", score: "9.3", color: "#0d1a2e", scoreColor: "#2ECC71" },
      { title: "3 Idiots", meta: "Hindi · 2009 · Comedy Drama", score: "9.5", color: "#1a2e0d", scoreColor: "#2ECC71" },
      { title: "Golmaal Again", meta: "Hindi · 2017 · Comedy", score: "7.8", color: "#2e0d1a", scoreColor: "#F39C12" }
    ]
  },
  karuna: {
    label: "Top Karuna picks — feel it deeply",
    prompt: '"emotionally heavy but leaves me feeling hopeful"',
    films: [
      { title: "Taare Zameen Par", meta: "Hindi · 2007 · Drama", score: "9.7", color: "#0d2e1a", scoreColor: "#2ECC71" },
      { title: "Drishyam", meta: "Malayalam · 2013 · Drama Thriller", score: "9.4", color: "#1a0d2e", scoreColor: "#2ECC71" },
      { title: "All We Imagine as Light", meta: "Malayalam · 2024 · Drama", score: "9.6", color: "#2e1a0d", scoreColor: "#2ECC71" }
    ]
  },
  veera: {
    label: "Top Veera picks — feel the fire",
    prompt: '"heroic and inspiring, makes me want to conquer the world"',
    films: [
      { title: "Dangal", meta: "Hindi · 2016 · Sports Drama", score: "9.6", color: "#1a2e0d", scoreColor: "#2ECC71" },
      { title: "RRR", meta: "Telugu · 2022 · Action Epic", score: "9.5", color: "#2e0d1a", scoreColor: "#2ECC71" },
      { title: "Kanguva", meta: "Tamil · 2024 · Action", score: "9.1", color: "#1a0d2e", scoreColor: "#2ECC71" }
    ]
  },
  bhayanaka: {
    label: "Top Bhayanaka picks — edge of your seat",
    prompt: '"psychological thrills, not gory, keeps me guessing"',
    films: [
      { title: "IC 814: The Kandahar Hijack", meta: "Hindi · 2024 · Thriller", score: "9.4", color: "#1a1a2e", scoreColor: "#2ECC71" },
      { title: "Drishyam 2", meta: "Malayalam · 2021 · Crime Thriller", score: "9.1", color: "#0d1a2e", scoreColor: "#2ECC71" },
      { title: "Tumbbad", meta: "Hindi · 2018 · Horror", score: "9.3", color: "#2e1a0d", scoreColor: "#2ECC71" }
    ]
  },
  adbhuta: {
    label: "Top Adbhuta picks — blow your mind",
    prompt: '"visually stunning, world-building, nothing like I have seen before"',
    films: [
      { title: "Baahubali 2", meta: "Telugu · 2017 · Epic Fantasy", score: "9.2", color: "#2e1a0d", scoreColor: "#2ECC71" },
      { title: "Kalki 2898-AD", meta: "Telugu · 2024 · Sci-Fi", score: "7.4", color: "#1a0d2e", scoreColor: "#F39C12" },
      { title: "Enthiran", meta: "Tamil · 2010 · Sci-Fi", score: "8.8", color: "#0d2e1a", scoreColor: "#2ECC71" }
    ]
  },
  raudra: {
    label: "Top Raudra picks — raw and intense",
    prompt: '"intense, morally complex, no-holds-barred storytelling"',
    films: [
      { title: "Gangs of Wasseypur", meta: "Hindi · 2012 · Crime Drama", score: "9.4", color: "#2e0d0d", scoreColor: "#2ECC71" },
      { title: "Vikram", meta: "Tamil · 2022 · Action Thriller", score: "9.0", color: "#1a0d2e", scoreColor: "#2ECC71" },
      { title: "Devara: Part 1", meta: "Telugu · 2024 · Action", score: "6.9", color: "#2e1a0d", scoreColor: "#F39C12" }
    ]
  },
  shanta: {
    label: "Top Shanta picks — breathe and feel",
    prompt: '"slow, beautiful, no rush — I want to exhale and just watch"',
    films: [
      { title: "All We Imagine as Light", meta: "Malayalam · 2024 · Drama", score: "9.6", color: "#0d2e1a", scoreColor: "#2ECC71" },
      { title: "Piku", meta: "Hindi · 2015 · Drama", score: "8.9", color: "#1a2e0d", scoreColor: "#2ECC71" },
      { title: "Masaan", meta: "Hindi · 2015 · Drama", score: "9.1", color: "#0d1a2e", scoreColor: "#2ECC71" }
    ]
  },
  bibhatsa: {
    label: "Top Bibhatsa picks — dark and unflinching",
    prompt: '"gritty realism, dark themes, not for the faint-hearted"',
    films: [
      { title: "Tumbbad", meta: "Hindi · 2018 · Horror", score: "9.3", color: "#2e0d0d", scoreColor: "#2ECC71" },
      { title: "Ugly", meta: "Hindi · 2013 · Crime Drama", score: "9.1", color: "#1a1a1a", scoreColor: "#2ECC71" },
      { title: "Article 15", meta: "Hindi · 2019 · Crime Drama", score: "8.8", color: "#0d1a1a", scoreColor: "#2ECC71" }
    ]
  }
};

/* ---- Mood Card Interaction ---- */
function selectMood(rasa) {
  document.querySelectorAll('.mood-card').forEach(card => {
    card.classList.remove('selected');
  });

  const selected = document.querySelector(`.mood-card[data-rasa="${rasa}"]`);
  if (selected) selected.classList.add('selected');

  const data = rasaData[rasa];
  if (!data) return;

  document.getElementById('moodResultsLabel').textContent = data.label;
  document.getElementById('moodPromptText').textContent = 'Tell us more — ' + data.prompt;

  const list = document.getElementById('moodResultList');
  list.innerHTML = data.films.map(f => `
    <a href="pages/movie.html" class="mood-result-item">
      <div class="result-poster" style="background:${f.color};"></div>
      <div class="result-info">
        <div class="result-title">${f.title}</div>
        <div class="result-meta">${f.meta}</div>
      </div>
      <div class="result-score" style="color:${f.scoreColor};">${f.score}</div>
    </a>
  `).join('');
}

/* ---- Industry Filter ---- */
function filterIndustry(filter) {
  document.querySelectorAll('.ind-chip').forEach(chip => chip.classList.remove('active'));
  const activeChip = document.querySelector(`.ind-chip[data-filter="${filter}"]`);
  if (activeChip) activeChip.classList.add('active');

  const cards = document.querySelectorAll('.film-card');
  cards.forEach(card => {
    if (filter === 'all' || card.dataset.industry === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ---- Mobile Menu ---- */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

/* ---- Language Switcher ---- */
function setLanguage(btn) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {

  /* Mood cards */
  document.querySelectorAll('.mood-card').forEach(card => {
    card.addEventListener('click', () => selectMood(card.dataset.rasa));
  });

  /* Load default mood */
  selectMood('shringara');

  /* Industry chips */
  document.querySelectorAll('.ind-chip').forEach(chip => {
    chip.addEventListener('click', () => filterIndustry(chip.dataset.filter));
  });

  /* Hamburger */
  const hamburger = document.getElementById('hamburger');
  if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);

  /* Language buttons */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn));
  });

  /* Hero search — pressing Enter navigates to browse */
  const heroSearch = document.getElementById('heroSearch');
  if (heroSearch) {
    heroSearch.addEventListener('keydown', e => {
      if (e.key === 'Enter' && heroSearch.value.trim()) {
        window.location.href = `pages/browse.html?q=${encodeURIComponent(heroSearch.value.trim())}`;
      }
    });
  }

});
