/* ═══════════════════════════════════════
   CARLOS URZOLA — main.js
═══════════════════════════════════════ */

fetch('data/data.json')
  .then(r => r.json())
  .then(data => {
    renderHero(data.profile, data.stack);
    renderAbout(data.profile, data.experience);
    renderFormacion(data.education);
    renderPortfolio(data.projects);
    renderContact(data.profile);
    renderFooter(data.profile);
    initCursor();
    initScrollReveal();
    initActiveNav();
  })
  .catch(err => console.error('Error cargando data.json:', err));


// ── HERO ──────────────────────────────────────────────────────
function renderHero(p, stack) {
  const badges = stack
    .filter(c => c.category !== 'En aprendizaje')
    .flatMap(c => c.items.filter(i => !i.learning))
    .map(i => `<span class="hero-badge">${i.name}</span>`)
    .join('');

  const stats = p.stats.map(s => `
    <div class="stat-card">
      <div class="stat-num">${s.num}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  document.getElementById('hero').innerHTML = `
    <div class="hero-left">
      ${p.available_for_internship ? `
      <div class="hero-tag"><span class="dot"></span>
        Disponible para prácticas DAM · Open to internship
      </div>` : ''}
      <h1 class="hero-name">${p.name.split(' ')[0]}<br/><span>${p.name.split(' ')[1]}</span></h1>
      <p class="hero-title">${p.title_es}</p>
      <div class="hero-badges">${badges}</div>
      <p class="hero-desc">${p.bio_es}</p>
      <div class="hero-cta">
        <a class="btn-primary" href="${p.cv_file}" download>↓ Descargar CV</a>
        <a class="btn-outline" href="#portfolio">Ver proyectos →</a>
      </div>
    </div>
    <div class="hero-right">
      ${stats}
      ${p.available_for_internship ? `
      <div class="available-badge">
        <div class="label">🎓 Prácticas DAM</div>
        <div class="value">Disponible · Alicante / Remoto</div>
      </div>` : ''}
    </div>`;
}


// ── ABOUT + EXPERIENCIA ───────────────────────────────────────
function renderAbout(p, experience) {
  document.getElementById('about-bio').innerHTML = `
    <p>${p.bio_es}</p>
    <p>${p.bio_es2}</p>
    <p>${p.bio_es3}</p>
    <div class="hobbies-row">
      ${p.hobbies.map(h => `<span class="hobby-tag">${h}</span>`).join('')}
    </div>`;

  document.getElementById('exp-list').innerHTML = experience.map(e => `
    <div class="exp-item reveal">
      <div class="exp-year">${e.period.split('–')[0].trim()}</div>
      <div>
        <div class="exp-role">${e.role_es}</div>
        <div class="exp-co">${e.company} · ${e.sector_es} · ${e.duration_es}</div>
        <div class="exp-tags">
          ${e.tags.map(t => `<span class="exp-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>`).join('');
}


// ── FORMACIÓN ─────────────────────────────────────────────────
function renderFormacion(education) {
  document.getElementById('edu-list').innerHTML = education.map(e => `
    <div class="edu-item${e.current ? ' current' : ''}">
      <div class="edu-year">${e.year}</div>
      <div>
        <div class="edu-title">${e.title}</div>
        <div class="edu-institution">${e.institution}</div>
        <span class="edu-level${e.current ? ' current-badge' : ''}">${e.current ? '📚 En curso — prácticas pendientes' : e.level}</span>
      </div>
    </div>`).join('');
}


// ── PORTFOLIO ─────────────────────────────────────────────────
function renderPortfolio(projects) {
  const statusLabel = { wip:'🔧 En construcción', live:'🟢 Live', professional:'💼 Proyecto profesional' };
  const statusClass = { wip:'status-wip', live:'status-live', professional:'status-professional' };

  const cards = projects.map(p => `
    <div class="project-card reveal">
      <div class="project-card-inner">
        <div class="project-top">
          <div class="project-icon" style="background:${p.icon_bg}">${p.icon}</div>
          <div class="project-links">
            ${p.github ? `<a href="${p.github}" target="_blank" title="GitHub">⌥</a>` : ''}
            ${p.demo   ? `<a href="${p.demo}"   target="_blank" title="Demo">↗</a>` : ''}
          </div>
        </div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc_es}</div>
        <div class="project-tags">${p.tags.map(t=>`<span class="project-tag">${t}</span>`).join('')}</div>
        <span class="project-status ${statusClass[p.status]||'status-wip'}">${statusLabel[p.status]||p.status}</span>
      </div>
    </div>`).join('');

  const placeholders = `
    <div class="project-placeholder reveal">
      <div class="project-placeholder-icon">🚧</div>
      <h3>Proyecto Final DAM</h3>
      <p>En construcción.<br/>Java · Spring Boot · Flutter · MongoDB · Docker</p>
    </div>
    <div class="project-placeholder reveal">
      <div class="project-placeholder-icon">➕</div>
      <h3>Próximo proyecto</h3>
      <p>Agrégalo en <code>data/data.json</code> → array <code>projects[]</code></p>
    </div>`;

  document.getElementById('projects-grid').innerHTML = cards + placeholders;
}


// ── CONTACT ───────────────────────────────────────────────────
function renderContact(p) {
  document.getElementById('contact-links').innerHTML = `
    <a class="contact-link" href="mailto:${p.email}">
      <span class="icon">✉</span>
      <div><div class="cl-label">Email</div><div class="cl-val">${p.email}</div></div>
    </a>
    <a class="contact-link" href="tel:${p.phone.replace(/[\s-]/g,'')}">
      <span class="icon">📱</span>
      <div><div class="cl-label">Teléfono</div><div class="cl-val">${p.phone}</div></div>
    </a>
    <a class="contact-link" href="https://${p.linkedin}" target="_blank">
      <span class="icon" style="font-weight:700;font-size:0.85rem">in</span>
      <div><div class="cl-label">LinkedIn</div><div class="cl-val">${p.linkedin.replace('linkedin.com/in/','')}</div></div>
    </a>
    <a class="contact-link" href="https://${p.web}" target="_blank">
      <span class="icon">🌐</span>
      <div><div class="cl-label">Web</div><div class="cl-val">${p.web}</div></div>
    </a>
    <div class="contact-link" style="opacity:0.4;pointer-events:none;">
      <span class="icon">📍</span>
      <div><div class="cl-label">Ubicación</div><div class="cl-val">${p.location}</div></div>
    </div>`;
  document.getElementById('cv-download').href = p.cv_file;
}


// ── FOOTER ────────────────────────────────────────────────────
function renderFooter(p) {
  document.getElementById('footer').innerHTML = `
    <span>© ${new Date().getFullYear()} ${p.name}</span>
    <span>HTML · CSS · JS — sin frameworks 🚀</span>`;
}


// ── CURSOR ────────────────────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function loop(){
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
    rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => {
    if(e.target.closest('a,button,.project-card,.hero-badge,.contact-link,.exp-item,.edu-item')){
      cursor.style.transform='translate(-50%,-50%) scale(2.5)'; ring.style.opacity='0';
    }
  });
  document.addEventListener('mouseout', e => {
    if(e.target.closest('a,button,.project-card,.hero-badge,.contact-link,.exp-item,.edu-item')){
      cursor.style.transform='translate(-50%,-50%) scale(1)'; ring.style.opacity='1';
    }
  });
}


// ── SCROLL REVEAL ─────────────────────────────────────────────
function initScrollReveal() {
  const obs = new IntersectionObserver(
    es => es.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.07 }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}


// ── ACTIVE NAV ────────────────────────────────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if(window.scrollY >= s.offsetTop - 100) current = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+current));
  }, { passive:true });
}
