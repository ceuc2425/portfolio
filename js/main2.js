async function initV2() {
  try {
    const r = await fetch('data/data.json');
    const data = await r.json();
    const p = data.profile;

    // Render Header
    document.getElementById('v2-name').innerText = p.name;
    document.getElementById('v2-title').innerText = p.title_es;
    document.getElementById('v2-contact').innerHTML = `
      <span>${p.email}</span> | 
      <span>${p.phone}</span> | 
      <span>${p.location}</span> | 
      <span>${p.linkedin}</span>
    `;

    // Render Profile
    document.getElementById('v2-profile').innerHTML = `
      ${p.bio_es}<br><br>
      ${p.bio_es2}<br><br>
      ${p.bio_es3}
    `;

    // Render All Experience (Full list as per professional CV)
    document.getElementById('v2-experience').innerHTML = data.experience.map(e => `
      <div class="cv-exp-item">
        <div class="cv-exp-header">
          <span>${e.role_es}</span>
          <span>${e.period}</span>
        </div>
        <div class="cv-exp-sub">
          <span>${e.company}</span>
          <span>${e.sector_es}</span>
        </div>
        <div class="cv-exp-desc">${e.desc_es}</div>
      </div>
    `).join('');

    // Render All Education
    document.getElementById('v2-education').innerHTML = data.education.map(e => `
      <div class="cv-edu-item">
        <div class="cv-edu-main">${e.title} - ${e.institution}</div>
        <div class="cv-edu-sub">${e.year} ${e.current ? '(En curso)' : ''}</div>
      </div>
    `).join('');

    // Render All Skills
    document.getElementById('v2-skills').innerHTML = data.stack.map(cat => `
      <div class="cv-skill-cat">
        <strong>${cat.category}:</strong> ${cat.items.map(i => i.name).join(', ')}
      </div>
    `).join('');

    lucide.createIcons();
  } catch (e) {
    console.error('Error loading V2:', e);
  }
}

async function downloadPDF() {
  const element = document.getElementById('cv-content');
  const opt = {
    margin: [10, 10, 10, 10],
    filename: 'Carlos_Urzola_Professional_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Temporary style override for PDF to ensure it's white background
  const originalBg = element.style.background;
  const originalColor = element.style.color;
  element.style.background = '#fff';
  element.style.color = '#333';

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (err) {
    console.error('PDF Error:', err);
  } finally {
    element.style.background = originalBg;
    element.style.color = originalColor;
  }
}

initV2();