/* ===========================
   NAVRAS — Home Page JS v2
   Fixed TMDb loading + top tabs
   =========================== */

const langNames = {
  hi:'Hindi', ta:'Tamil', te:'Telugu', ml:'Malayalam',
  kn:'Kannada', bn:'Bengali', mr:'Marathi', pa:'Punjabi',
  gu:'Gujarati', en:'English'
};

/* ---- Score helpers ---- */
function scoreClass(s) { return s >= 85 ? 'green' : s >= 60 ? 'amber' : 'red'; }
function scoreColorHex(s) { return s >= 85 ? '#2ECC71' : s >= 60 ? '#F39C12' : '#E74C3C'; }

/* ---- Render cinema/poster card ---- */
function renderCinemaCard(film, type) {
  const isTV = type === 'tv';
  const title = isTV ? (film.name || film.original_name) : (film.title || film.original_title);
  const posterUrl = film.poster_path ? TMDB.poster(film.poster_path, 'w342') : null;
  const score = TMDB.navrasScore(film.vote_average, film.vote_count);
  const lang = film.original_language;
  const langName = langNames[lang] || (lang ? lang.toUpperCase() : '');
  const year = (film.release_date || film.first_air_date || '').slice(0,4);
  const rasas = TMDB.rasaFromGenres((film.genre_ids||[]).map(id=>({id})));
  const sc = scoreClass(score);

  return `
    <a href="pages/movie.html?id=${film.id}" class="cinema-card">
      <div class="cinema-poster">
        ${posterUrl
          ? `<img src="${posterUrl}" alt="${title}" loading="lazy"
               onerror="this.parentElement.style.background='var(--ink3)';this.remove()" />`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:var(--ink3);">🎬</div>`}
        ${langName ? `<div class="cinema-lang">${langName}</div>` : ''}
        ${score ? `<div class="cinema-score ${sc}"><div>${score}</div><div class="cinema-score-sub">NAVRAS</div></div>` : ''}
      </div>
      <div class="cinema-info">
        <div class="cinema-title">${title || 'Unknown'}</div>
        <div class="cinema-meta">${year}</div>
        <div class="cinema-rasas">${rasas.slice(0,2).map(r=>`<span class="rtag">${r}</span>`).join('')}</div>
      </div>
    </a>`;
}

/* ---- Render OTT card (local data) ---- */
const ottFilms = {
  netflix: [
    { title:"IC 814: The Kandahar Hijack", year:2024, lang:"Hindi", score:91, color:"#1a1a2e", rasas:["Bhayanaka","Veera"], platform:"Netflix" },
    { title:"All We Imagine as Light", year:2024, lang:"Malayalam", score:96, color:"#0d2e1a", rasas:["Karuna","Shanta"], platform:"Netflix" },
    { title:"Tumbbad", year:2018, lang:"Hindi", score:94, color:"#2e0d0d", rasas:["Bhayanaka","Bibhatsa"], platform:"Netflix" },
    { title:"RRR", year:2022, lang:"Telugu", score:95, color:"#2e0d1a", rasas:["Veera","Raudra"], platform:"Netflix" }
  ],
  prime: [
    { title:"Stree 2", year:2024, lang:"Hindi", score:87, color:"#1a0d2e", rasas:["Hasya","Bhayanaka"], platform:"Prime Video" },
    { title:"Panchayat S3", year:2024, lang:"Hindi", score:93, color:"#1a2e0d", rasas:["Hasya","Shanta"], platform:"Prime Video" },
    { title:"Drishyam 2", year:2021, lang:"Malayalam", score:91, color:"#0d1a2e", rasas:["Bhayanaka","Karuna"], platform:"Prime Video" },
    { title:"Dangal", year:2016, lang:"Hindi", score:96, color:"#1a2e0d", rasas:["Veera","Karuna"], platform:"Prime Video" }
  ],
  hotstar: [
    { title:"Kalki 2898-AD", year:2024, lang:"Telugu", score:74, color:"#1a1a0d", rasas:["Adbhuta","Veera"], platform:"Hotstar" },
    { title:"Manjummel Boys", year:2024, lang:"Malayalam", score:91, color:"#0d2e2e", rasas:["Veera","Bhayanaka"], platform:"Hotstar" },
    { title:"Shaitaan", year:2024, lang:"Hindi", score:77, color:"#1a0d0d", rasas:["Bhayanaka","Raudra"], platform:"Hotstar" },
    { title:"Kanguva", year:2024, lang:"Tamil", score:79, color:"#1a0d2e", rasas:["Veera","Adbhuta"], platform:"Hotstar" }
  ],
  sony: [
    { title:"The Family Man S2", year:2021, lang:"Hindi", score:94, color:"#0d1a1a", rasas:["Bhayanaka","Hasya"], platform:"SonyLIV" },
    { title:"Scam 1992", year:2020, lang:"Hindi", score:97, color:"#2e2e0d", rasas:["Adbhuta","Raudra"], platform:"SonyLIV" },
    { title:"Aspirants S2", year:2023, lang:"Hindi", score:89, color:"#1a2e1a", rasas:["Veera","Karuna"], platform:"SonyLIV" },
    { title:"Rocket Boys S2", year:2023, lang:"Hindi", score:87, color:"#0d0d2e", rasas:["Veera","Adbhuta"], platform:"SonyLIV" }
  ],
  zee5: [
    { title:"Kaala Paani", year:2023, lang:"Hindi", score:85, color:"#0d1a2e", rasas:["Bhayanaka","Veera"], platform:"ZEE5" },
    { title:"Murder in Mahim", year:2024, lang:"Hindi", score:80, color:"#1a0d0d", rasas:["Raudra","Bhayanaka"], platform:"ZEE5" },
    { title:"Bhakshak", year:2024, lang:"Hindi", score:86, color:"#0d0d1a", rasas:["Raudra","Karuna"], platform:"ZEE5" },
    { title:"Dhoom Dhaam", year:2025, lang:"Hindi", score:72, color:"#1a2e0d", rasas:["Hasya","Shringara"], platform:"ZEE5" }
  ]
};

function renderOttCard(f) {
  return `
    <a href="pages/movie.html" class="cinema-card">
      <div class="cinema-poster" style="background:linear-gradient(160deg,${f.color},${f.color}cc);">
        <div class="cinema-lang">${f.lang}</div>
        <div class="cinema-score ${scoreClass(f.score)}">
          <div>${f.score}</div><div class="cinema-score-sub">NAVRAS</div>
        </div>
      </div>
      <div class="cinema-info">
        <div class="cinema-title">${f.title}</div>
        <div class="cinema-meta">${f.year} · ${f.platform}</div>
        <div class="cinema-rasas">${f.rasas.map(r=>`<span class="rtag">${r}</span>`).join('')}</div>
      </div>
    </a>`;
}

/* ---- Render review row ---- */
function renderReviewRow(film, type) {
  const isTV = type === 'tv';
  const title = isTV ? (film.name||film.original_name) : (film.title||film.original_title);
  const posterUrl = film.poster_path ? TMDB.poster(film.poster_path, 'w92') : null;
  const score = TMDB.navrasScore(film.vote_average, film.vote_count);
  const lang = film.original_language;
  const langName = langNames[lang] || (lang ? lang.toUpperCase() : '');
  const year = (film.release_date||film.first_air_date||'').slice(0,4);
  const rasas = TMDB.rasaFromGenres((film.genre_ids||[]).map(id=>({id})));
  const userScore = film.vote_average ? film.vote_average.toFixed(1) : '?';
  const usc = parseFloat(userScore)>=7 ? '#2ECC71' : parseFloat(userScore)>=5 ? '#F39C12' : '#E74C3C';

  return `
    <a href="pages/movie.html?id=${film.id}" class="review-row">
      <div class="rr-score ${scoreClass(score)}">
        <div class="rr-score-num">${score||'?'}</div>
        <div class="rr-score-lbl">NAVRAS</div>
      </div>
      ${posterUrl
        ? `<img src="${posterUrl}" class="rr-poster" alt="${title}" loading="lazy" onerror="this.style.display='none'" />`
        : `<div class="rr-poster"></div>`}
      <div class="rr-info">
        <div class="rr-top">
          <div class="rr-title">${title||'Unknown'}</div>
          <div class="rr-year">${year}</div>
          ${langName ? `<div class="rr-lang">${langName}</div>` : ''}
        </div>
        <div class="rr-rasas">${rasas.slice(0,2).map(r=>`<span class="rtag">${r}</span>`).join('')}</div>
      </div>
      <div class="rr-right">
        <div class="rr-user-score" style="color:${usc};">${userScore}</div>
        <div class="rr-user-label">User score</div>
      </div>
    </a>`;
}

/* ---- Rankings data ---- */
const rankingsData = {
  top:[
    {rank:1,title:"Mughal-E-Azam",year:1960,lang:"Hindi",score:99,color:"#2e2e0d",rasas:["Karuna","Veera"]},
    {rank:2,title:"Pather Panchali",year:1955,lang:"Bengali",score:99,color:"#0d1a2e",rasas:["Karuna","Shanta"]},
    {rank:3,title:"Dilwale Dulhania Le Jayenge",year:1995,lang:"Hindi",score:98,color:"#1a0d2e",rasas:["Shringara","Veera"]},
    {rank:4,title:"Drishyam",year:2013,lang:"Malayalam",score:97,color:"#0d2e1a",rasas:["Bhayanaka","Karuna"]},
    {rank:5,title:"Lagaan",year:2001,lang:"Hindi",score:97,color:"#2e2e0d",rasas:["Veera","Shringara"]}
  ],
  bollywood:[
    {rank:1,title:"Mughal-E-Azam",year:1960,lang:"Hindi",score:99,color:"#2e2e0d",rasas:["Karuna","Veera"]},
    {rank:2,title:"Dilwale Dulhania Le Jayenge",year:1995,lang:"Hindi",score:98,color:"#1a0d2e",rasas:["Shringara","Veera"]},
    {rank:3,title:"Lagaan",year:2001,lang:"Hindi",score:97,color:"#2e2e0d",rasas:["Veera","Shringara"]},
    {rank:4,title:"Taare Zameen Par",year:2007,lang:"Hindi",score:97,color:"#0d2e1a",rasas:["Karuna","Veera"]},
    {rank:5,title:"Dangal",year:2016,lang:"Hindi",score:96,color:"#1a2e0d",rasas:["Veera","Karuna"]}
  ],
  south:[
    {rank:1,title:"Nayakan",year:1987,lang:"Tamil",score:98,color:"#2e0d0d",rasas:["Raudra","Karuna"]},
    {rank:2,title:"Drishyam",year:2013,lang:"Malayalam",score:97,color:"#0d2e1a",rasas:["Bhayanaka","Karuna"]},
    {rank:3,title:"RRR",year:2022,lang:"Telugu",score:95,color:"#2e0d1a",rasas:["Veera","Raudra"]},
    {rank:4,title:"96",year:2018,lang:"Tamil",score:96,color:"#1a1a2e",rasas:["Shringara","Karuna"]},
    {rank:5,title:"Baahubali 2",year:2017,lang:"Telugu",score:92,color:"#2e1a0d",rasas:["Adbhuta","Veera"]}
  ],
  ott:[
    {rank:1,title:"Scam 1992",year:2020,lang:"Hindi",score:97,color:"#2e2e0d",rasas:["Adbhuta","Raudra"]},
    {rank:2,title:"Panchayat",year:2020,lang:"Hindi",score:95,color:"#1a2e0d",rasas:["Hasya","Shanta"]},
    {rank:3,title:"The Family Man",year:2019,lang:"Hindi",score:94,color:"#0d1a1a",rasas:["Bhayanaka","Hasya"]},
    {rank:4,title:"Paatal Lok",year:2020,lang:"Hindi",score:93,color:"#1a0d1a",rasas:["Raudra","Bibhatsa"]},
    {rank:5,title:"IC 814",year:2024,lang:"Hindi",score:91,color:"#1a1a2e",rasas:["Bhayanaka","Veera"]}
  ]
};

function renderRankRow(f) {
  const rc = f.rank===1?'gold':f.rank===2?'silver':f.rank===3?'bronze':'';
  return `
    <a href="pages/movie.html" class="rank-row">
      <div class="rank-num ${rc}">${f.rank}</div>
      <div class="rank-poster" style="background:linear-gradient(160deg,${f.color},${f.color}aa);"></div>
      <div class="rank-info">
        <div class="rank-title">${f.title}</div>
        <div class="rank-meta">${f.lang} · ${f.year}</div>
        <div class="rank-rasas">${f.rasas.map(r=>`<span class="rtag">${r}</span>`).join('')}</div>
      </div>
      <div class="rank-score" style="color:${scoreColorHex(f.score)};">${f.score}</div>
    </a>`;
}

/* ---- TMDb loaders — FIXED: use separate calls not pipe syntax ---- */
async function loadCinemas() {
  const grid = document.getElementById('cinemasGrid');
  if (!grid) return;
  // Fetch now playing — TMDb supports this endpoint directly
  const data = await TMDB.get('/movie/now_playing', { region:'IN' });
  if (!data?.results?.length) {
    // Fallback: popular Indian films
    const fallback = await TMDB.get('/trending/movie/week', {});
    if (fallback?.results) {
      grid.innerHTML = fallback.results.slice(0,6).map(f=>renderCinemaCard(f,'movie')).join('');
    }
    return;
  }
  grid.innerHTML = data.results.slice(0,6).map(f=>renderCinemaCard(f,'movie')).join('');
}

async function loadReviews() {
  const list = document.getElementById('reviewsList');
  if (!list) return;
  // Use trending Indian films as recent reviews
  const data = await TMDB.get('/trending/movie/week', {});
  if (!data?.results?.length) { list.innerHTML='<div style="color:var(--text-muted);padding:20px;">No reviews found</div>'; return; }
  list.innerHTML = data.results.slice(0,6).map(f=>renderReviewRow(f,'movie')).join('');
}

async function loadTV() {
  const grid = document.getElementById('tvGrid');
  const list = document.getElementById('tvReviewsList');
  if (!grid) return;
  const data = await TMDB.get('/trending/tv/week', {});
  if (!data?.results?.length) return;
  if (grid) grid.innerHTML = data.results.slice(0,6).map(f=>renderCinemaCard(f,'tv')).join('');
  if (list) list.innerHTML = data.results.slice(0,4).map(f=>renderReviewRow(f,'tv')).join('');
}

async function loadComingSoon() {
  const grid = document.getElementById('comingGrid');
  if (!grid) return;
  const future = new Date();
  future.setDate(future.getDate()+7);
  const data = await TMDB.get('/movie/upcoming', { region:'IN' });
  if (!data?.results?.length) {
    grid.innerHTML = '<div style="color:var(--text-muted);padding:20px;grid-column:1/-1;">Coming soon listings not available right now.</div>';
    return;
  }
  grid.innerHTML = data.results.slice(0,4).map(film => {
    const posterUrl = film.poster_path ? TMDB.poster(film.poster_path,'w342') : null;
    const lang = film.original_language;
    const langName = langNames[lang] || (lang?lang.toUpperCase():'');
    const rd = film.release_date ? new Date(film.release_date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : 'Coming soon';
    return `
      <a href="pages/movie.html?id=${film.id}" class="coming-card">
        <div class="coming-poster">
          ${posterUrl?`<img src="${posterUrl}" alt="${film.title}" loading="lazy" />`:''}
          <div class="coming-date-badge">${rd}</div>
        </div>
        <div class="coming-info">
          <div class="coming-title">${film.title}</div>
          <div class="coming-meta">${langName}</div>
        </div>
      </a>`;
  }).join('');
}

/* ---- OTT tabs ---- */
function initOttTabs() {
  const grid = document.getElementById('ottGrid');
  if (!grid) return;
  const load = p => { grid.innerHTML = (ottFilms[p]||[]).map(renderOttCard).join(''); };
  document.querySelectorAll('.ott-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ott-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      load(btn.dataset.platform);
    });
  });
  load('netflix');
}

/* ---- Ranking tabs ---- */
function initRankingTabs() {
  const list = document.getElementById('rankingsList');
  if (!list) return;
  const load = k => { list.innerHTML = (rankingsData[k]||[]).map(renderRankRow).join(''); };
  document.querySelectorAll('.rtab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rtab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      load(btn.dataset.rank);
    });
  });
  load('top');
}

/* ---- Top tabs (Movies / TV / News) ---- */
function initTopTabs() {
  document.querySelectorAll('.top-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.top-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.getElementById('tab-movies').style.display = tab==='movies' ? 'block' : 'none';
      document.getElementById('tab-tv').style.display = tab==='tv' ? 'block' : 'none';
      document.getElementById('tab-news').style.display = tab==='news' ? 'block' : 'none';
      if (tab==='tv') loadTV();
    });
  });
}

/* ---- Review sort ---- */
function initReviewSort() {
  document.querySelectorAll('.rsort-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      document.querySelectorAll('.rsort-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const list = document.getElementById('reviewsList');
      if (!list) return;
      list.innerHTML = '<div class="review-skeleton"></div>'.repeat(5);
      let data;
      if (btn.dataset.sort==='top') {
        data = await TMDB.get('/movie/top_rated', { region:'IN' });
      } else {
        data = await TMDB.get('/trending/movie/week', {});
      }
      if (data?.results) list.innerHTML = data.results.slice(0,6).map(f=>renderReviewRow(f,'movie')).join('');
    });
  });
}

/* ---- Search ---- */
function initSearch() {
  const input = document.getElementById('heroSearch');
  if (!input) return;
  input.addEventListener('keydown', e => {
    if (e.key==='Enter' && input.value.trim()) {
      window.location.href = `pages/browse.html?q=${encodeURIComponent(input.value.trim())}`;
    }
  });
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  initTopTabs();
  initOttTabs();
  initRankingTabs();
  initReviewSort();
  initSearch();
  loadCinemas();
  loadReviews();
  loadComingSoon();
});
