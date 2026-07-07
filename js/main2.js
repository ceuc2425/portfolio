async function initV2() {
  try {
    const r = await fetch('data/data.json');
    const data = await r.json();
    const p = data.profile;

    // Render Bio
    document.getElementById('v2-bio').innerHTML = `
      <p>${p.bio_es}</p>
      <p>${p.bio_es2}</p>
      <p>${p.bio_es3}</p>
    `;

    // Render Experience (Top 3)
    document.getElementById('v2-exp-list').innerHTML = data.experience.slice(0, 3).map(e => `
      <div class="exp-item">
        <div class="exp-year">${e.period.split('–')[0].trim()}</div>
        <div>
          <div class="exp-role">${e.role_es}</div>
          <div class="exp-co">${e.company} · ${e.sector_es}</div>
          <p style="font-size: 0.9rem; color: var(--muted); margin: 0.5rem 0;">${e.desc_es}</p>
        </div>
      </div>
    `).join('');

    // Render Education (Top 2)
    document.getElementById('v2-edu-list').innerHTML = data.education.slice(0, 2).map(e => `
      <div class="edu-item">
        <div class="edu-year">${e.year}</div>
        <div>
          <div class="edu-title">${e.title}</div>
          <div class="edu-institution">${e.institution}</div>
        </div>
      </div>
    `).join('');

    lucide.createIcons();
  } catch (e) {
    console.error('Error loading V2:', e);
  }
}

initV2();