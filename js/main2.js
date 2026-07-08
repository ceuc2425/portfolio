async function initV2() {
  try {
    const r = await fetch('data/data.json');
    const data = await r.json();
    const p = data.profile;

    document.getElementById('v2-name').innerText = p.name;
    document.getElementById('v2-title').innerText = p.title_es;
    document.getElementById('v2-contact').innerHTML = `
      <a href="mailto:${p.email}">${p.email}</a> | 
      <span>${p.phone}</span> | 
      <span>${p.location}</span> | 
      <a href="https://${p.linkedin}" target="_blank">${p.linkedin}</a>
    `;

    document.getElementById('v2-personal').innerHTML = `
      <div><strong>Residencia/Permiso:</strong> ${p.personal_info.residence_permit || '---'}</div>
      <div><strong>Idiomas:</strong> ${p.personal_info.languages.map(l => `${l.lang} (${l.level})`).join(', ')}</div>
      <div><strong>Carnet/Coche:</strong> ${p.personal_info.license || '---'} ${p.personal_info.car ? '/ ' + p.personal_info.car : ''}</div>
      <div><strong>Disponibilidad:</strong> Viajes: ${p.personal_info.travel_available || '---'}, Traslado: ${p.personal_info.relocation_available || '---'}</div>
    `;

    document.getElementById('v2-profile').innerHTML = `
      ${p.bio_es}<br><br>
      ${p.bio_es2}<br><br>
      ${p.bio_es3}
    `;

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

    const mainEdu = data.education.slice(0, 3);
    const otherEdu = data.education.slice(3);

    document.getElementById('v2-education').innerHTML = mainEdu.map(e => `
      <div class="cv-edu-item">
        <div class="cv-edu-main">${e.title} - ${e.institution}</div>
        <div class="cv-edu-sub">${e.year} ${e.current ? '(En curso)' : ''}</div>
      </div>
    `).join('');

    document.getElementById('v2-education-others').innerHTML = otherEdu.map(e => `
      <div class="cv-edu-item">
        <div class="cv-edu-main">${e.title}</div>
        <div class="cv-edu-sub">${e.institution} (${e.year})</div>
      </div>
    `).join('');

    document.getElementById('v2-skills').innerHTML = data.stack.map(cat => `
      <div class="cv-skill-cat">
        <strong>${cat.category}:</strong> ${cat.items.map(i => i.name).join(', ')}
      </div>
    `).join('');

  } catch (e) {
    console.error('Error loading V2:', e);
  }
}

async function downloadPDF() {
  const element = document.getElementById('cv-content');
  const opt = {
    margin: [10, 10, 10, 10],
    filename: 'Carlos_Urzola_ATS_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (err) {
    console.error('PDF Error:', err);
  }
}

initV2();