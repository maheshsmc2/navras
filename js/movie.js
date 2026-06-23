/* ===========================
   NAVRAS — Movie Page JS
   =========================== */

/* ---- Watchlist Toggle ---- */
let inWatchlist = false;

function toggleWatchlist() {
  inWatchlist = !inWatchlist;
  const btn = document.getElementById('watchlistBtn');
  if (btn) {
    btn.textContent = inWatchlist ? '✓ In Watchlist' : '+ Watchlist';
    btn.style.background = inWatchlist ? 'transparent' : 'var(--gold)';
    btn.style.color = inWatchlist ? 'var(--gold)' : 'var(--ink)';
  }
}

/* ---- Share Film ---- */
function shareFilm() {
  if (navigator.share) {
    navigator.share({
      title: 'Stree 2 on Navras',
      text: 'Check out Stree 2 on Navras — rated 9.1 Navras Score. Funny. Scary. Rewatchable.',
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    });
  }
}

/* ---- Rating Flow ---- */
let selectedRasa = null;
let selectedStars = 0;

function initRating() {
  const rasaBtns = document.querySelectorAll('.rate-rasa-btn');
  const starWrap = document.getElementById('starRatingWrap');
  const starRow = document.getElementById('starRow');
  const starLabel = document.getElementById('starRatingLabel');
  const submitBtn = document.getElementById('submitRatingBtn');

  rasaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      rasaBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedRasa = btn.dataset.rasa;

      if (starWrap) {
        starWrap.style.display = 'block';
        if (starLabel) starLabel.textContent = `You felt ${selectedRasa} — now rate it`;
      }
    });
  });

  /* Star interaction */
  const starBtns = document.querySelectorAll('.star-btn');
  starBtns.forEach(btn => {
    btn.addEventListener('mouseover', () => {
      const val = parseInt(btn.dataset.val);
      starBtns.forEach(s => {
        s.classList.toggle('lit', parseInt(s.dataset.val) <= val);
      });
    });

    btn.addEventListener('mouseleave', () => {
      starBtns.forEach(s => {
        s.classList.toggle('lit', parseInt(s.dataset.val) <= selectedStars);
      });
    });

    btn.addEventListener('click', () => {
      selectedStars = parseInt(btn.dataset.val);
      starBtns.forEach(s => {
        s.classList.toggle('lit', parseInt(s.dataset.val) <= selectedStars);
      });
      if (submitBtn) submitBtn.style.display = 'inline-block';
    });
  });
}

function submitRating() {
  const starWrap = document.getElementById('starRatingWrap');
  const success = document.getElementById('ratingSuccess');
  const rasaGrid = document.getElementById('rateRasaGrid');

  if (starWrap) starWrap.style.display = 'none';
  if (rasaGrid) rasaGrid.style.display = 'none';
  if (success) success.style.display = 'block';
}

/* ---- Animate Desi Bars on scroll ---- */
function animateBars() {
  const bars = document.querySelectorAll('.desi-bar-fill');
  bars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = width; }, 100);
  });
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  initRating();

  /* Animate bars when visible */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBars();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const desiSection = document.querySelector('.desi-bars');
  if (desiSection) observer.observe(desiSection);

  /* Hamburger */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }
});
