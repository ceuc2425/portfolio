/* ═══════════════════════════════════════
   CARLOS URZOLA — main.js
═══════════════════════════════════════ */

// ── THEME & INIT ────────────────────────────────────────────────
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  btn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Initialize theme and icons immediately to ensure UI elements are visible
initThemeToggle();
lucide.createIcons();

fetch('data/data.json')
  .then(r => r.json())
  .then(data => {
    renderHero(data.profile);
    renderStack(data.stack);
    renderAbout(data.profile, data.experience);
    renderMethodology(data.//...




// ── HERO ──────────────────────────────────────────────────────
function renderHero(p) {
  const stats = p.stats.map(s => `
    <div class="stat-card">
      <div class="stat-num">${s.num}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  document.getElementById('hero').innerHTML = `
    <div class="hero-left">
      <div class="hero-profile-container">
        <div class="hero-photo">
          <img src="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Carlos Urzola" id="profile-photo">
        </div>
      </div>
      ${p.available_for_internship ? `
      <div class="hero-tag"><span class="dot"></span>
        Disponible para prácticas DAM · Open to internship
      </div>` : ''}
      <h1 class="hero-name">${p.name.split(' ')[0]}<br/><span>${p.name.split(' ')[1]}</span></h1>
      <p class="hero-title">${p.title_es}</p>
      <p class="hero-desc">${p.bio_es}</p>
      <div class="hero-cta">
        <a class="btn-primary cv-download-btn" href="#" download>↓ Descargar CV</a>
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
function renderStack(stack) {
  const container = document.getElementById('stack-container');
  if (!container || !stack) return;

  container.innerHTML = stack.map(cat => {
    const itemsHtml = cat.items.map(i => {
      if (i.name.includes(':')) {
        const [prefix, content] = i.name.split(':');
        return `<div class="stack-item-row"><strong>${prefix}:</strong> ${content}</div>`;
      }
      return `<span class="skill-pill">${i.name}</span>`;
    }).join('');

    return `
      <div class="stack-category">
        <div class="stack-header" onclick="this.parentElement.classList.toggle('open')">
          <span class="cat-title">${cat.category}</span>
          <i data-lucide="chevron-down" class="cat-icon"></i>
        </div>
        <div class="stack-content">
          <div class="stack-items">
            ${itemsHtml}
          </div>
        </div>
      </div>`;
  }).join('');
  
  lucide.createIcons();
}


function renderAbout(p, experience) {
  document.getElementById('about-bio').innerHTML = `
    <p>${p.bio_es}</p>
    <p>${p.bio_es2}</p>
    <p>${p.bio_es3}</p>`;
  
  if (p.philosophy) {
    document.getElementById('philosophy').innerHTML = `
      <div class="phil-label">Filosofía</div>
      <div class="phil-text">${p.philosophy}</div>
    `;
  }
  
  if (p.how_i_work) {
    document.getElementById('how-i-work').innerHTML = `
      <div class="how-label">Cómo trabajo</div>
      <ul class="how-list">
        ${p.how_i_work.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  }
  
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

function renderPersonal(p) {
  const info = p.personal_info;
  if (!info) return;

  document.getElementById('personal-data').innerHTML = `
    <div class="data-item"><span class="data-label">Residencia/Permiso:</span> <span class="data-value">${info.residence_permit || '---'}</span></div>
    <div class="data-item"><span class="data-label">Idiomas:</span> <span class="data-value">${info.languages.map(l => `${l.lang} (${l.level})`).join(', ')}</span></div>
    <div class="data-item"><span class="data-label">Carnet/Coche:</span> <span class="data-value">${info.license || '---'} ${info.car ? '/ ' + info.car : ''}</span></div>
    <div class="data-item"><span class="data-label">Dispon. Viajes:</span> <span class="data-value">${info.travel_available || '---'}</span></div>
    <div class="data-item"><span class="data-label">Dispon. Traslado:</span> <span class="data-value">${info.relocation_available || '---'}</span></div>
  `;

  document.getElementById('hobbies-container').innerHTML = p.hobbies.map(h => `
    <span class="hobby-tag">${h}</span>
  `).join('');
}


// ── EVOLUCIÓN IA ──────────────────────────────────────────────
function renderAiJourney(journey) {
  const el = document.getElementById('ai-journey-list');
  if (!el || !journey) return;
  el.innerHTML = journey.map(j => `
    <div class="ai-item reveal">
      <div class="ai-phase">${j.phase}</div>
      <div>
        <div class="ai-period">${j.period}</div>
        <div class="ai-title">${j.title}</div>
        <p class="ai-desc">${j.desc_es}</p>
        ${j.quote ? `<div class="ai-quote">${j.quote}</div>` : ''}
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


// ── METODOLOGÍA ────────────────────────────────────────────────
function renderMethodology(methodology) {
  const el = document.getElementById('methodology-grid');
  if (!el || !methodology) return;
  el.innerHTML = methodology.map(m => `
    <div class="method-card reveal">
      <div class="method-step">${m.step}</div>
      <div class="method-content">
        <div class="method-title">${m.title}</div>
        <p class="method-desc">${m.desc}</p>
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
          <div class="project-icon" style="background:${p.icon_bg}">
            <i data-lucide="${p.icon}"></i>
          </div>
          <div class="project-links">
            ${p.github ? `<a href="${p.github}" target="_blank" title="GitHub"><i data-lucide="github"></i></a>` : ''}
            ${p.demo   ? `<a href="${p.demo}"   target="_blank" title="Demo"><i data-lucide="external-link"></i></a>` : ''}
            ${p.doc    ? `<a href="${p.doc}"    target="_blank" title="Docs"><i data-lucide="file-text"></i></a>` : ''}
          </div>
        </div>
        <div class="project-title">${p.title}</div>
        
        <div class="project-detail">
          <div class="detail-label">Problema</div>
          <div class="detail-text">${p.problem}</div>
        </div>
        <div class="project-detail">
          <div class="detail-label">Objetivo</div>
          <div class="detail-text">${p.goal}</div>
        </div>
        <div class="project-detail">
          <div class="detail-label">Solución</div>
          <div class="detail-text">${p.solution}</div>
        </div>
        <div class="project-detail">
          <div class="detail-label">Arquitectura</div>
          <div class="detail-text">${p.architecture}</div>
        </div>
        <div class="project-detail">
          <div class="detail-label">Tecnologías</div>
          <div class="detail-text">${p.stack.join(' · ')}</div>
        </div>
        <div class="project-detail">
          <div class="detail-label">Mi Papel</div>
          <div class="detail-text">${p.my_role}</div>
        </div>
        
        <span class="project-status ${statusClass[p.status]||'status-wip'}">${statusLabel[p.status]||p.status}</span>
      </div>
    </div>`).join('');

  document.getElementById('projects-grid').innerHTML = cards;
}


// ── CONTACT ───────────────────────────────────────────────────
function renderContact(p) {
  document.getElementById('contact-links').innerHTML = `
    <a class="contact-link" href="mailto:${p.email}">
      <span class="icon"><i data-lucide="mail"></i></span>
      <div><div class="cl-label">Email</div><div class="cl-val">${p.email}</div></div>
    </a>
    <a class="contact-link" href="tel:${p.phone.replace(/[\s-]/g,'')}">
      <span class="icon"><i data-lucide="phone"></i></span>
      <div><div class="cl-label">Teléfono</div><div class="cl-val">${p.phone}</div></div>
    </a>
    <a class="contact-link" href="https://${p.linkedin}" target="_blank">
      <span class="icon"><i data-lucide="linkedin"></i></span>
      <div><div class="cl-label">LinkedIn</div><div class="cl-val">${p.linkedin.replace('linkedin.com/in/','')}</div></div>
    </a>
    <a class="contact-link" href="https://${p.web}" target="_blank">
      <span class="icon"><i data-lucide="globe"></i></span>
      <div><div class="cl-label">Web</div><div class="cl-val">${p.web}</div></div>
    </a>
    <div class="contact-link" style="opacity:0.4;pointer-events:none;">
      <span class="icon"><i data-lucide="map-pin"></i></span>
      <div><div class="cl-label">Ubicación</div><div class="cl-val">${p.location}</div></div>
    </div>`;
}


// ── FOOTER ────────────────────────────────────────────────────
function renderFooter(p) {
  document.getElementById('footer').innerHTML = `
    <span>© ${new Date().getFullYear()} ${p.name}</span>
    <span>HTML · CSS · JS — sin frameworks</span>`;
}


// ── PDF DESDE LOS DATOS (siempre actualizado) ─────────────────
// En lugar de servir un PDF estático, generamos el PDF desde el
// contenido ya renderizado en la página usando el diálogo de
// impresión del navegador ("Guardar como PDF"). El CSS de impresión
// (@media print en styles.css) reordena la página en formato documento.
function initPdfDownload(data) {
  const btns = document.querySelectorAll('.cv-download-btn');
  if (!btns.length) return;

  btns.forEach(btn => btn.addEventListener('click', async (ev) => {
    ev.preventDefault();
    
    const p = data.profile;
    const template = document.getElementById('pdf-template');
    
    document.getElementById('pdf-bio').innerText = `${p.bio_es} ${p.bio_es2}`;
    
    document.getElementById('pdf-experience').innerHTML = data.experience.map(e => `
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; color: #1A2E44;">
          <span>${e.role_es} - ${e.company}</span>
          <span style="font-weight: normal; color: #666;">${e.period}</span>
        </div>
        <p style="font-size: 9pt; color: #444; margin: 4px 0;">${e.desc_es}</p>
      </div>
    `).join('');

    document.getElementById('pdf-education').innerHTML = data.education.map(e => `
      <div style="margin-bottom: 8px; display: flex; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 9pt;">${e.title}</span>
        <span style="font-size: 9pt; color: #666;">${e.year}</span>
      </div>
      <div style="font-size: 8pt; color: #888; margin-bottom: 8px;">${e.institution}</div>
    `).join('');

    document.getElementById('pdf-stack').innerHTML = data.stack.map(s => `
      <div style="margin-bottom: 4px;">
        <strong>${s.category}:</strong> ${s.items.map(i => i.name).join(', ')}
      </div>
    `).join('');

    const opt = {
      margin: 0,
      filename: `CV_Carlos_Urzola_${new Date().getFullYear()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(template).save();
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  }));
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
