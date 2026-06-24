/* ===========================
   NAVRAS — Home Page JS
   Real TMDb data, cinema-first
   =========================== */

const langNames = {
  hi:'Hindi', ta:'Tamil', te:'Telugu', ml:'Malayalam',
  kn:'Kannada', bn:'Bengali', mr:'Marathi', pa:'Punjabi',
  gu:'Gujarati', en:'English'
};

const ottData = {
  netflix: [
    { title:"IC 814: The Kandahar Hijack", year:2024, lang:"Hindi", score:91, color:"#1a1a2e", rasas:["Bhayanaka","Veera"], verdict:"India's most gripping series based on true events.", platform:"Netflix" },
    { title:"All We Imagine as Light", year:2024, lang:"Malayalam", score:96, color:"#0d2e1a", rasas:["Karuna","Shanta"], verdict:"Grand Prix at Cannes. Quietly breathtaking.", platform:"Netflix" },
    { title:"Tumbbad", year:2018, lang:"Hindi", score:94, color:"#2e0d0d", rasas:["Bhayanaka","Bibhatsa"], verdict:"The most original Indian horror film ever made.", platform:"Netflix" },
    { title:"RRR", year:2022, lang:"Telugu", score:95, color:"#2e0d1a", rasas:["Veera","Raudra"], verdict:"Pure cinematic adrenaline from start to finish.", platform:"Netflix" }
  ],
  prime: [
    { title:"Stree 2", year:2024, lang:"Hindi", score:87, color:"#1a0d2e", rasas:["Hasya","Bhayanaka"], verdict:"Funnier, scarier and smarter than the original.", platform:"Prime Video" },
    { title:"Panchayat S3", year:2024, lang:"Hindi", score:93, color:"#1a2e0d", rasas:["Hasya","Shanta"], verdict:"The most wholesome Indian series ever made.", platform:"Prime Video" },
    { title:"Drishyam 2", year:2021, lang:"Malayalam", score:91, color:"#0d1a2e", rasas:["Bhayanaka","Karuna"], verdict:"A sequel that surpasses the original.", platform:"Prime Video" },
    { title:"Dangal", year:2016, lang:"Hindi", score:96, color:"#1a2e0d", rasas:["Veera","Karuna"], verdict:"The greatest sports film India has produced.", platform:"Prime Video" }
  ],
  hotstar: [
    { title:"Kalki 2898-AD", year:2024, lang:"Telugu", score:74, color:"#1a1a0d", rasas:["Adbhuta","Veera"], verdict:"Ambitious mythology meets sci-fi spectacle.", platform:"Disney+ Hotstar" },
    { title:"Shaitaan", year:2024, lang:"Hindi", score:77, color:"#1a0d0d", rasas:["Bhayanaka","Raudra"], verdict:"Ajay Devgn anchors this chilling supernatural thriller.", platform:"Disney+ Hotstar" },
    { title:"Manjummel Boys", year:2024, lang:"Malayalam", score:91, color:"#0d2e2e", rasas:["Veera","Bhayanaka"], verdict:"Brotherhood and survival, based on a true story.", platform:"Disney+ Hotstar" },
    { title:"Kanguva", year:2024, lang:"Tamil", score:79, color:"#1a0d2e", rasas:["Veera","Adbhuta"], verdict:"Tamil cinema's most ambitious production design.", platform:"Disney+ Hotstar" }
  ],
  sony: [
    { title:"The Family Man S2", year:2021, lang:"Hindi", score:94, color:"#0d1a1a", rasas:["Bhayanaka","Hasya"], verdict:"Manoj Bajpayee gives the performance of his career.", platform:"SonyLIV" },
    { title:"Scam 1992", year:2020, lang:"Hindi", score:97, color:"#2e2e0d", rasas:["Adbhuta","Raudra"], verdict:"The greatest Indian web series ever made.", platform:"SonyLIV" },
    { title:"Aspirants S2", year:2023, lang:"Hindi", score:89, color:"#1a2e1a", rasas:["Veera","Karuna"], verdict:"The most relatable Indian series for the youth.", platform:"SonyLIV" },
    { title:"Rocket Boys S2", year:2023, lang:"Hindi", score:87, color:"#0d0d2e", rasas:["Veera","Adbhuta"], verdict:"India's best historical drama series.", platform:"SonyLIV" }
  ],
  zee5: [
    { title:"Kaala Paani", year:2023, lang:"Hindi", score:85, color:"#0d1a2e", rasas:["Bhayanaka","Veera"], verdict:"India's answer to prestige survival drama.", platform:"ZEE5" },
    { title:"Murder in Mahim", year:2024, lang:"Hindi", score:80, color:"#1a0d0d", rasas:["Raudra","Bhayanaka"], verdict:"A gripping Mumbai crime mystery.", platform:"ZEE5" },
    { title:"Bhakshak", year:2024, lang:"Hindi", score:86, color:"#0d0d1a", rasas:["Raudra","Karuna"], verdict:"Bhumi Pednekar's finest performance.", platform:"ZEE5" },
    { title:"Dhoom Dhaam", year:2025, lang:"Hindi", score:72, color:"#1a2e0d", rasas:["Hasya","Shringara"], verdict:"Light fun — exactly what it promises.", platform:"ZEE5" }
  ]
};

const rankingsData = {
  top: [
    { rank:1, title:"Mughal-E-Azam", year:1960, lang:"Hindi", score:99, color:"#2e2e0d", rasas:["Karuna","Veera"] },
    { rank:2, title:"Pather Panchali", year:1955, lang:"Bengali", score:99, color:"#0d1a2e", rasas:["Karuna","Shanta"] },
    { rank:3, title:"Dilwale Dulhania Le Jayenge", year:1995, lang:"Hindi", score:98, color:"#1a0d2e", rasas:["Shringara","Veera"] },
    { rank:4, title:"Drishyam", year:2013, lang:"Malayalam", score:97, color:"#0d2e1a", rasas:["Bhayanaka","Karuna"] },
    { rank:5, title:"Lagaan", year:2001, lang:"Hindi", score:97, color:"#2e2e0d", rasas:["Veera","Shringara"] }
  ],
  bollywood: [
    { rank:1, title:"Mughal-E-Azam", year:1960, lang:"Hindi", score:99, color:"#2e2e0d", rasas:["Karuna","Veera"] },
    { rank:2, title:"Dilwale Dulhania Le Jayenge", year:1995, lang:"Hindi", score:98, color:"#1a0d2e", rasas:["Shringara","Veera"] },
    { rank:3, title:"Lagaan", year:2001, lang:"Hindi", score:97, color:"#2e2e0d", rasas:["Veera","Shringara"] },
    { rank:4, title:"Taare Zameen Par", year:2007, lang:"Hindi", score:97, color:"#0d2e1a", rasas:["Karuna","Veera"] },
    { rank:5, title:"Dangal", year:2016, lang:"Hindi", score:96, color:"#1a2e0d", rasas:["Veera","Karuna"] }
  ],
  south: [
    { rank:1, title:"Nayakan", year:1987, lang:"Tamil", score:98, color:"#2e0d0d", rasas:["Raudra","Karuna"] },
    { rank:2, title:"Drishyam", year:2013, lang:"Malayalam", score:97, color:"#0d2e1a", rasas:["Bhayanaka","Karuna"] },
    { rank:3, title:"RRR", year:2022, lang:"Telugu", score:95, color:"#2e0d1a", rasas:["Veera","Raudra"] },
    { rank:4, title:"96", year:2018, lang:"Tamil", score:96, color:"#1a1a2e", rasas:["Shringara","Karuna"] },
    { rank:5, title:"Baahubali 2", year:2017, lang:"Telugu", score:92, color:"#2e1a0d", rasas:["Adbhuta","Veera"] }
  ],
  ott: [
    { rank:1, title:"Scam 1992", year:2020, lang:"Hindi", score:97, color:"#2e2e0d", rasas:["Adbhuta","Raudra"] },
    { rank:2, title:"Panchayat", year:2020, lang:"Hindi", score:95, color:"#1a2e0d", rasas:["Hasya","Shanta"] },
    { rank:3, title:"The Family Man", year:2019, lang:"Hindi", score:94, color:"#0d1a1a", rasas:["Bhayanaka","Hasya"] },
    { rank:4, title:"Paatal Lok", year:2020, lang:"Hindi", score:93, color:"#1a0d1a", rasas:["Raudra","Bibhatsa"] },
    { rank:5, title:"IC 814", year:2024, lang:"Hindi", score:91, color:"#1a1a2e", rasas:["Bhayanaka","Veera"] }
  ]
};

/* ---- Score helpers ---- */
function scoreClass(s) { return s >= 85 ? 'green' : s >= 60 ? 'amber' : 'red'; }
function scoreColor(s) { return s >= 85 ? '#2ECC71' : s >= 60 ? '#F39C12' : '#E74C3C'; }

/* ---- Render cinema card ---- */
function renderCinemaCard(film) {
  const posterUrl = film.poster_path ? TMDB.poster(film.poster_path, 'w342') : null;
  const score = film.navrasScore || TMDB.navrasScore(film.vote_average, film.vote_count);
  const lang = film.original_language;
  const langName = langNames[lang] || lang?.toUpperCase() || '';
  const year = (film.release_date || '').slice(0, 4);
  const rasas = TMDB.rasaFromGenres((film.genre_ids||[]).map(id => ({id})));
  const sc = scoreClass(score);

  return `
    <a href="pages/movie.html?id=${film.id}" class="cinema-card">
      <div class="cinema-poster">
        ${posterUrl ? `<img src="${posterUrl}" alt="${film.title}" loading="lazy" onerror="this.style.display='none'" />` : ''}
        ${langName ? `<div class="cinema-lang">${langName}</div>` : ''}
        ${score ? `<div class="cinema-score ${sc}"><div>${score}</div><div class="cinema-score-sub">NAVRAS</div></div>` : ''}
      </div>
      <div class="cinema-info">
        <div class="cinema-title">${film.title || film.name}</div>
        <div class="cinema-meta">${year}</div>
        <div class="cinema-rasas">${rasas.map(r=>`<span class="rtag">${r}</span>`).join('')}</div>
      </div>
    </a>`;
}

/* ---- Render OTT card (from local data) ---- */
function renderOttCard(film) {
  return `
    <a href="pages/movie.html" class="cinema-card">
      <div class="cinema-poster" style="background:linear-gradient(160deg,${film.color},${film.color}88);">
        <div class="cinema-lang">${film.lang}</div>
        <div class="cinema-score ${scoreClass(film.score)}">
          <div>${film.score}</div>
          <div class="cinema-score-sub">NAVRAS</div>
        </div>
      </div>
      <div class="cinema-info">
        <div class="cinema-title">${film.title}</div>
        <div class="cinema-meta">${film.year} · ${film.platform}</div>
        <div class="cinema-verdict">${film.verdict}</div>
        <div class="cinema-rasas">${film.rasas.map(r=>`<span class="rtag">${r}</span>`).join('')}</div>
      </div>
    </a>`;
}

/* ---- Render review row ---- */
function renderReviewRow(film) {
  const posterUrl = film.poster_path ? TMDB.poster(film.poster_path, 'w92') : null;
  const score = film.navrasScore || TMDB.navrasScore(film.vote_average, film.vote_count);
  const lang = film.original_language;
  const langName = langNames[lang] || lang?.toUpperCase() || '';
  const year = (film.release_date || '').slice(0, 4);
  const rasas = TMDB.rasaFromGenres((film.genre_ids||[]).map(id=>({id})));
  const userScore = film.vote_average ? film.vote_average.toFixed(1) : '?';
  const sc = scoreClass(score);
  const usc = parseFloat(userScore) >= 7 ? '#2ECC71' : parseFloat(userScore) >= 5 ? '#F39C12' : '#E74C3C';

  return `
    <a href="pages/movie.html?id=${film.id}" class="review-row">
      <div class="rr-score ${sc}">
        <div class="rr-score-num">${score || '?'}</div>
        <div class="rr-score-lbl">NAVRAS</div>
      </div>
      ${posterUrl
        ? `<img src="${posterUrl}" class="rr-poster" alt="${film.title}" loading="lazy" onerror="this.style.display='none'" />`
        : `<div class="rr-poster"></div>`}
      <div class="rr-info">
        <div class="rr-top">
          <div class="rr-title">${film.title || film.name}</div>
          <div class="rr-year">${year}</div>
          ${langName ? `<div class="rr-lang">${langName}</div>` : ''}
        </div>
        <div class="rr-meta">${film.genre_ids?.length ? 'Film' : 'Series'}</div>
        <div class="rr-rasas">${rasas.map(r=>`<span class="rtag">${r}</span>`).join('')}</div>
      </div>
      <div class="rr-right">
        <div class="rr-user-score" style="color:${usc};">${userScore}</div>
        <div class="rr-user-label">User score</div>
      </div>
    </a>`;
}

/* ---- Render ranking row ---- */
function renderRankRow(film) {
  const rankClass = film.rank === 1 ? 'gold' : film.rank === 2 ? 'silver' : film.rank === 3 ? 'bronze' : '';
  const sc = scoreColor(film.score);
  return `
    <a href="pages/movie.html" class="rank-row">
      <div class="rank-num ${rankClass}">${film.rank}</div>
      <div class="rank-poster" style="background:linear-gradient(160deg,${film.color},${film.color}88);"></div>
      <div class="rank-info">
        <div class="rank-title">${film.title}</div>
        <div class="rank-meta">${film.lang} · ${film.year}</div>
        <div class="rank-rasas">${film.rasas.map(r=>`<span class="rtag">${r}</span>`).join('')}</div>
      </div>
      <div class="rank-score" style="color:${sc};">${film.score}</div>
    </a>`;
}

/* ---- Load in cinemas (TMDb now playing) ---- */
async function loadCinemas() {
  const data = await TMDB.get('/movie/now_playing', {
    region: 'IN', language: 'en-US'
  });
  const grid = document.getElementById('cinemasGrid');
  if (!grid) return;
  if (!data?.results?.length) { grid.innerHTML = ''; return; }
  grid.innerHTML = data.results.slice(0, 6).map(renderCinemaCard).join('');
}

/* ---- Load recent reviews (TMDb popular Indian) ---- */
async function loadReviews() {
  const data = await TMDB.discover({
    with_original_language: 'hi|ta|te|ml|kn|mr',
    sort_by: 'release_date.desc',
    'release_date.lte': new Date().toISOString().slice(0,10),
    'vote_count.gte': 20,
    page: 1
  });
  const list = document.getElementById('reviewsList');
  if (!list) return;
  if (!data?.results?.length) { list.innerHTML = ''; return; }
  list.innerHTML = data.results.slice(0, 8).map(renderReviewRow).join('');
}

/* ---- Load coming soon ---- */
async function loadComingSoon() {
  const future = new Date();
  future.setDate(future.getDate() + 1);
  const data = await TMDB.discover({
    with_original_language: 'hi|ta|te|ml|kn|mr|en',
    sort_by: 'popularity.desc',
    'release_date.gte': future.toISOString().slice(0,10),
    page: 1
  });
  const grid = document.getElementById('comingGrid');
  if (!grid) return;
  if (!data?.results?.length) { grid.innerHTML = ''; return; }

  grid.innerHTML = data.results.slice(0, 4).map(film => {
    const posterUrl = film.poster_path ? TMDB.poster(film.poster_path, 'w342') : null;
    const lang = film.original_language;
    const langName = langNames[lang] || lang?.toUpperCase() || '';
    const releaseDate = film.release_date ? new Date(film.release_date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : 'Coming soon';
    return `
      <a href="pages/movie.html?id=${film.id}" class="coming-card">
        <div class="coming-poster">
          ${posterUrl ? `<img src="${posterUrl}" alt="${film.title}" loading="lazy" />` : ''}
          <div class="coming-date-badge">${releaseDate}</div>
        </div>
        <div class="coming-info">
          <div class="coming-title">${film.title || film.name}</div>
          <div class="coming-meta">${langName}</div>
        </div>
      </a>`;
  }).join('');
}

/* ---- OTT tabs ---- */
function initOttTabs() {
  const grid = document.getElementById('ottGrid');
  if (!grid) return;

  function loadOtt(platform) {
    const films = ottData[platform] || [];
    grid.innerHTML = films.map(renderOttCard).join('');
  }

  document.querySelectorAll('.ott-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ott-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadOtt(btn.dataset.platform);
    });
  });

  loadOtt('netflix');
}

/* ---- Rankings tabs ---- */
function initRankingTabs() {
  const list = document.getElementById('rankingsList');
  if (!list) return;

  function loadRanking(key) {
    const films = rankingsData[key] || [];
    list.innerHTML = films.map(renderRankRow).join('');
  }

  document.querySelectorAll('.rtab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadRanking(btn.dataset.rank);
    });
  });

  loadRanking('top');
}

/* ---- Search ---- */
function initSearch() {
  const input = document.getElementById('heroSearch');
  if (!input) return;
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      window.location.href = `pages/browse.html?q=${encodeURIComponent(input.value.trim())}`;
    }
  });
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  loadCinemas();
  loadReviews();
  loadComingSoon();
  initOttTabs();
  initRankingTabs();
  initSearch();
});
