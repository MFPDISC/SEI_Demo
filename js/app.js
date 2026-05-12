// ══════════════════════════════════════
// STATE
// ══════════════════════════════════════
let region = 'za';
let view = 'africa';
let activeSport = 'All';
let activeMerchCat = 'all';
let activeTeam = 'All Teams';
let cartTotal = 0;
let cartTimer;
let isPlaying = true;
let authRegion = 'za';
let userName = 'Guest';
let userEmail = 'guest@sei.tv';
let progressVal = 58;
let progressTimer;

// ══════════════════════════════════════
// AUTH
// ══════════════════════════════════════
function switchAuthTab(tab) {
  document.getElementById('at-login').classList.toggle('active', tab === 'login');
  document.getElementById('at-signup').classList.toggle('active', tab === 'signup');
  document.getElementById('auth-login').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('auth-signup').style.display = tab === 'signup' ? 'block' : 'none';
}

function selectAuthRegion(code, el) {
  document.querySelectorAll('.arp').forEach(e => e.classList.remove('active'));
  el.classList.add('active');
  authRegion = code;
}

function doLogin() {
  const email = document.getElementById('login-email').value || 'demo@sei.tv';
  const name = email.split('@')[0];
  userName = name.charAt(0).toUpperCase() + name.slice(1);
  userEmail = email;
  launchApp('za');
  showNotification('Welcome back, ' + userName + '! 🎬');
}

function doSignup() {
  const name = document.getElementById('sig-name').value || 'New User';
  const email = document.getElementById('sig-email').value || 'user@sei.tv';
  userName = name;
  userEmail = email;
  showNotification('Account created! Welcome, ' + name + ' 🚀');
  setTimeout(() => launchApp(authRegion), 600);
}

function skipAuth() {
  userName = 'Guest';
  userEmail = 'guest@sei.tv';
  launchApp('za');
}

function launchApp(r) {
  region = r;
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  const initials = userName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  document.getElementById('nav-avatar').textContent = initials;
  document.getElementById('prof-av').textContent = initials;
  document.getElementById('prof-name').textContent = userName;
  document.getElementById('prof-email').textContent = userEmail;
  applyRegion();
}

function signOut() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value = '';
  switchAuthTab('login');
}

// ══════════════════════════════════════
// REGION
// ══════════════════════════════════════
function toggleRegionDD() {
  document.getElementById('region-dd').classList.toggle('open');
}

document.addEventListener('click', e => {
  const w = document.getElementById('region-wrap');
  if (w && !w.contains(e.target)) document.getElementById('region-dd').classList.remove('open');
});

function setRegion(code) {
  region = code;
  activeSport = 'All';
  activeTeam = 'All Teams';
  activeMerchCat = 'all';
  document.querySelectorAll('.fpill').forEach((p, i) => p.classList.toggle('active', i === 0));
  document.getElementById('region-dd').classList.remove('open');

  ['za', 'ng', 'gh', 'ke', 'eg', 'af', 'gl'].forEach(r => {
    const rc = document.getElementById('rc-' + r);
    const rd = document.getElementById('rdi-' + r);
    if (rc) rc.style.display = r === code ? 'block' : 'none';
    if (rd) rd.classList.toggle('active', r === code);
  });

  applyRegion();
}

function applyRegion() {
  const D = REGIONS[region];
  document.getElementById('rg-flag').textContent = D.flag;
  document.getElementById('rg-label').textContent = D.name;
  document.getElementById('tb-flag').textContent = D.flag;
  document.getElementById('tb-rname').textContent = D.name;
  document.getElementById('tb-curr').textContent = D.currFull;
  document.getElementById('tb-live').textContent = D.live.length + ' live';

  document.getElementById('hero-bg').style.background = D.hero.bg;
  document.getElementById('hero-rtag').textContent = D.hero.tag;
  document.getElementById('hero-time').textContent = D.hero.time;
  document.getElementById('hero-title').innerHTML = D.hero.title;
  document.getElementById('hero-meta').textContent = D.hero.meta;
  document.getElementById('hs1').textContent = D.hero.s1;
  document.getElementById('hs2').textContent = D.hero.s2;

  document.getElementById('up-sym').textContent = D.curr;
  document.getElementById('up-val').textContent = D.proPrice;

  document.getElementById('pp-sym').textContent = D.curr;
  document.getElementById('pp-val').textContent = D.proPrice;
  document.getElementById('pe-sym').textContent = D.curr;
  document.getElementById('pe-val').textContent = D.elitePrice;
  document.getElementById('pricing-note').textContent = `${D.flag} Prices in ${D.currFull} · ${D.name}`;

  document.getElementById('prof-region-flag').textContent = D.flag;
  document.getElementById('prof-region-name').textContent = D.name;
  document.getElementById('psr-region').textContent = D.name + ' ›';

  document.getElementById('player-score').textContent = D.hero.score;
  document.getElementById('player-teams').textContent = D.hero.teams;
  document.getElementById('player-match-label').textContent = D.hero.matchLabel;
  document.getElementById('player-viewers').textContent = '👁 ' + D.hero.viewers + ' watching';

  if (region === 'gl') setView('global', true);
  else setView('africa', true);

  renderLiveRow();
  renderSportCats();
  renderContentGrid();
  renderTeamTabs();
  renderMerchGrid();
}

// ══════════════════════════════════════
// VIEWS
// ══════════════════════════════════════
function setView(v, silent) {
  view = v;
  document.getElementById('vt-africa').classList.toggle('active', v === 'africa');
  document.getElementById('vt-global').classList.toggle('active', v === 'global');
  if (!silent) {
    activeSport = 'All';
    document.querySelectorAll('.cpill').forEach((p, i) => p.classList.toggle('active', i === 0));
  }
  if (v === 'global' && region !== 'gl') {
    renderGlobalLive();
    renderGlobalContent();
    renderGlobalSportCats();
  } else {
    renderLiveRow();
    renderContentGrid();
    renderSportCats();
  }
}

function renderGlobalSportCats() {
  document.getElementById('sport-cats').innerHTML = REGIONS.gl.sports.map((s, i) => `<div class="cpill${i === 0 ? ' active' : ''}" onclick="setSport('${s}',this)">${s}</div>`).join('');
}

function renderGlobalLive() {
  document.getElementById('tb-live').textContent = REGIONS.gl.live.length + ' global live';
  document.getElementById('live-count').textContent = REGIONS.gl.live.length;
  document.getElementById('live-row').innerHTML = REGIONS.gl.live.map(ch => `
    <div class="ch" onclick="openPlayer()">
      <div class="ch-thumb" style="background:${ch.bg}">
        <div class="ch-art">${ch.sport.substring(0, 3).toUpperCase()}</div>
        <div class="ch-gtag">GLOBAL</div>
        <div class="ch-viewers">👁 ${ch.v}</div>
        <div class="ch-rflag">${ch.f}</div>
      </div>
      <div class="ch-info">
        <div class="ch-sport" style="color:var(--t2)">${ch.sport}</div>
        <div class="ch-match">${ch.match}${ch.score ? ' · ' + ch.score : ''}</div>
        <div class="ch-sub">${ch.time}</div>
      </div>
    </div>`).join('');
}

function renderGlobalContent() {
  const items = activeSport === 'All' ? REGIONS.gl.content : REGIONS.gl.content.filter(i => i.sport === activeSport);
  document.getElementById('cgrid').innerHTML = items.map(item => `
    <div class="cc" onclick="openPlayer()">
      <div class="cc-thumb" style="background:${item.bg}">
        <div class="cc-art">${item.sport.substring(0, 3).toUpperCase()}</div>
        ${item.pro ? '<div class="pro-tag">PRO</div>' : ''}
      </div>
      <div class="cc-info">
        <div class="cc-label">${item.label}</div>
        <div class="cc-name">${item.name}</div>
      </div>
    </div>`).join('');
}

// ══════════════════════════════════════
// RENDER
// ══════════════════════════════════════
function renderLiveRow() {
  document.getElementById('live-count').textContent = REGIONS[region].live.length;
  document.getElementById('live-row').innerHTML = REGIONS[region].live.map(ch => `
    <div class="ch" onclick="openPlayer()">
      <div class="ch-thumb" style="background:${ch.bg}">
        <div class="ch-art">${ch.sport.substring(0, 3).toUpperCase()}</div>
        <div class="ch-livetag">LIVE</div>
        <div class="ch-viewers">👁 ${ch.v}</div>
        <div class="ch-rflag">${ch.f}</div>
      </div>
      <div class="ch-info">
        <div class="ch-sport">${ch.sport}</div>
        <div class="ch-match">${ch.match}${ch.score ? ' · ' + ch.score : ''}</div>
        <div class="ch-sub">${ch.time}</div>
      </div>
    </div>`).join('');
}

function renderSportCats() {
  document.getElementById('sport-cats').innerHTML = REGIONS[region].sports.map((s, i) => `
    <div class="cpill${i === 0 ? ' active' : ''}" onclick="setSport('${s}',this)">${s}</div>`).join('');
}

function setSport(sport, el) {
  document.querySelectorAll('.cpill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  activeSport = sport;
  if (view === 'global') renderGlobalContent();
  else renderContentGrid();
}

function renderContentGrid() {
  const items = activeSport === 'All' ? REGIONS[region].content : REGIONS[region].content.filter(i => i.sport === activeSport);
  document.getElementById('cgrid').innerHTML = items.map(item => `
    <div class="cc" onclick="openPlayer()">
      <div class="cc-thumb" style="background:${item.bg}">
        <div class="cc-art">${item.sport.substring(0, 3).toUpperCase()}</div>
        ${item.pro ? '<div class="pro-tag">PRO</div>' : ''}
      </div>
      <div class="cc-info">
        <div class="cc-label">${item.label}</div>
        <div class="cc-name">${item.name}</div>
      </div>
    </div>`).join('');
}

function renderTeamTabs() {
  document.getElementById('team-tabs').innerHTML = REGIONS[region].teams.map((t, i) => `
    <div class="ttab${i === 0 ? ' active' : ''}" onclick="setTeam('${t}',this)">${t}</div>`).join('');
  activeTeam = 'All Teams';
}

function setTeam(team, el) {
  document.querySelectorAll('.ttab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  activeTeam = team;
  renderMerchGrid();
}

function filterMerch(cat, el) {
  document.querySelectorAll('.fpill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  activeMerchCat = cat;
  renderMerchGrid();
}

function renderMerchGrid() {
  let items = REGIONS[region].merch;
  if (activeMerchCat !== 'all') items = items.filter(i => i.cat === activeMerchCat);
  if (activeTeam !== 'All Teams') items = items.filter(i => i.team === activeTeam);
  document.getElementById('mgrid').innerHTML = items.length
    ? items.map(item => `
      <div class="mc">
        <div class="mc-img" style="background:${item.bg}">
          <div class="mc-emoji">${item.e}</div>
          <div class="mc-badge" style="background:${item.badgeBg}">${item.badge}</div>
        </div>
        <div class="mc-info">
          <div class="mc-cat">${item.cat}</div>
          <div class="mc-name">${item.name}</div>
          <div class="mc-team">${item.team}</div>
          <div class="mc-footer">
            <div class="mc-price">${item.price}</div>
            <button class="btn-cart" onclick="addToCart(this)">Add to Cart</button>
          </div>
        </div>
      </div>`).join('')
    : `<div style="padding:48px 0;color:var(--t3);font-size:13px;grid-column:1/-1;text-align:center">No items found.</div>`;
}

// ══════════════════════════════════════
// PLAYER
// ══════════════════════════════════════
function openPlayer() {
  document.getElementById('player-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  isPlaying = true;
  document.getElementById('play-btn').textContent = '⏸';
  animateProgress();
}

function closePlayer(e) {
  if (e) e.stopPropagation();
  document.getElementById('player-overlay').classList.remove('open');
  document.body.style.overflow = '';
  clearTimeout(progressTimer);
}

function animateProgress() {
  clearTimeout(progressTimer);
  if (!isPlaying) return;
  progressVal = Math.min(progressVal + 0.05, 99);
  document.getElementById('progress-fill').style.width = progressVal + '%';
  progressTimer = setTimeout(animateProgress, 200);
}

function togglePlayPause() {
  isPlaying = !isPlaying;
  document.getElementById('play-btn').textContent = isPlaying ? '⏸' : '▶';
  if (isPlaying) animateProgress();
}

function toggleQuality() {
  const btn = document.getElementById('quality-btn');
  btn.style.borderColor = 'var(--gold)';
  btn.style.color = 'var(--gold)';
  setTimeout(() => {
    btn.style.borderColor = '';
    btn.style.color = '';
  }, 800);
}

// ══════════════════════════════════════
// SEARCH
// ══════════════════════════════════════
function openSearch() {
  const o = document.getElementById('search-overlay');
  o.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('search-input').focus(), 100);
  renderSearchShortcuts();
  renderSearchResults('');
}

function closeSearch() {
  document.getElementById('search-overlay').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('search-input').value = '';
}

function renderSearchShortcuts() {
  const sports = REGIONS[region].sports.filter(s => s !== 'All');
  document.getElementById('ss-pills').innerHTML = sports.map(s => `
    <div class="ss-pill" onclick="searchFor('${s}')">${s}</div>`).join('');
}

function searchFor(term) {
  document.getElementById('search-input').value = term;
  doSearch(term);
}

function doSearch(q) {
  const allContent = [...REGIONS[region].content, ...(view === 'global' ? REGIONS.gl.content : [])];
  const filtered = q ? allContent.filter(i => i.name.toLowerCase().includes(q.toLowerCase()) || i.sport.toLowerCase().includes(q.toLowerCase())) : allContent;
  document.getElementById('search-results').innerHTML = filtered.map(item => `
    <div class="sr-item" onclick="closeSearch();openPlayer()">
      <div class="sr-thumb" style="background:${item.bg}">
        <div class="sr-art">${item.sport.substring(0, 3).toUpperCase()}</div>
      </div>
      <div class="sr-info">
        <div class="sr-sport">${item.sport}</div>
        <div class="sr-name">${item.name}</div>
      </div>
    </div>`).join('') || `<div style="padding:32px;color:var(--t3);font-size:13px;grid-column:1/-1;text-align:center">No results for "${q}"</div>`;
}

document.addEventListener('keydown', e => {
  // Keyboard shortcuts
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'k' || e.key === 'K') { e.preventDefault(); openSearch(); }
    if (e.key === '1') { e.preventDefault(); showPage('home'); }
    if (e.key === '2') { e.preventDefault(); showPage('merch'); }
    if (e.key === '3') { e.preventDefault(); showPage('pricing'); }
    if (e.key === '4') { e.preventDefault(); showPage('profile'); }
  }
  // Escape key for overlays
  if (e.key === 'Escape') {
    if (document.getElementById('player-overlay').classList.contains('open')) closePlayer();
    else if (document.getElementById('search-overlay').classList.contains('open')) closeSearch();
    else document.getElementById('region-dd').classList.remove('open');
  }
});

// ══════════════════════════════════════
// PAGE NAV
// ══════════════════════════════════════
const navMap = { home: 'nl-home', merch: 'nl-merch', pricing: 'nl-pricing', profile: 'nl-profile' };
const bnMap = { home: 'bn-home', merch: 'bn-merch', pricing: 'bn-pricing', profile: 'bn-profile' };

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  Object.values(navMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  Object.values(bnMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  const nid = navMap[page];
  if (nid) {
    const el = document.getElementById(nid);
    if (el) el.classList.add('active');
  }
  const bid = bnMap[page];
  if (bid) {
    const el = document.getElementById(bid);
    if (el) el.classList.add('active');
  }
  window.scrollTo(0, 0);
  document.getElementById('region-dd').classList.remove('open');
  closeSearch();
}

// ══════════════════════════════════════
// NOTIFICATIONS
// ══════════════════════════════════════
function showNotification(msg) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position:fixed;top:70px;right:20px;
    background:rgba(0,0,0,0.9);border:1px solid rgba(212,137,26,0.4);
    color:#fff;padding:14px 20px;border-radius:8px;z-index:700;
    font-size:13px;font-weight:500;max-width:300px;
    animation:slideIn 0.3s ease;backdrop-filter:blur(16px)
  `;
  notif.textContent = msg;
  document.body.appendChild(notif);
  setTimeout(() => notif.style.animation = 'slideOut 0.3s ease', 3000);
  setTimeout(() => notif.remove(), 3300);
}

// ══════════════════════════════════════
// CART
// ══════════════════════════════════════
function addToCart(btn) {
  const itemName = btn.parentElement.parentElement.querySelector('.mc-name').textContent;
  cartTotal++;
  btn.textContent = 'Added ✓';
  btn.classList.add('added');
  showNotification('✓ ' + itemName + ' added to cart');
  setTimeout(() => {
    if (btn) {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('added');
    }
  }, 2000);
  const toast = document.getElementById('toast');
  document.getElementById('cart-count').textContent = cartTotal + (cartTotal === 1 ? ' item' : ' items');
  toast.classList.add('show');
  clearTimeout(cartTimer);
  cartTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}
