/**
 * CROP DOCTOR — AI FIELD INTELLIGENCE
 * Dashboard Controller (dashboard.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  if (!CropDoctorAuth.requireAuth()) return;

  const currentUser = CropDoctorAuth.getCurrentUser();
  renderWelcome(currentUser);
  renderStats();
  renderRecentDiagnoses();
});

function renderWelcome(user) {
  const welcomeNameEl = document.getElementById('dashWelcomeName');
  const greetingEl = document.getElementById('dashGreetingTime');
  
  if (!user) return;

  const hour = new Date().getHours();
  let timeOfDay = 'Good day';
  if (hour >= 5 && hour < 12) timeOfDay = 'Good morning';
  else if (hour >= 12 && hour < 17) timeOfDay = 'Good afternoon';
  else if (hour >= 17 && hour < 22) timeOfDay = 'Good evening';

  if (greetingEl) greetingEl.textContent = `${timeOfDay},`;
  if (welcomeNameEl) welcomeNameEl.textContent = user.name;
}

function renderStats() {
  const history = getHistory();

  const totalScans = history.length;
  const healthyCount = history.filter(item => item.isHealthy).length;
  const diseaseCount = history.filter(item => !item.isHealthy).length;
  const savedReports = totalScans;

  const statTotalEl = document.getElementById('statTotalScans');
  const statHealthyEl = document.getElementById('statHealthyCrops');
  const statDiseaseEl = document.getElementById('statDiseaseCrops');
  const statSavedEl = document.getElementById('statSavedReports');

  if (statTotalEl) statTotalEl.textContent = totalScans;
  if (statHealthyEl) statHealthyEl.textContent = healthyCount;
  if (statDiseaseEl) statDiseaseEl.textContent = diseaseCount;
  if (statSavedEl) statSavedEl.textContent = savedReports;
}

function renderRecentDiagnoses() {
  const container = document.getElementById('recentDiagnosesGrid');
  if (!container) return;

  const history = getHistory();

  if (history.length === 0) {
    container.innerHTML = `
      <div class="empty-history-state" style="grid-column: 1 / -1; background: var(--white); border-radius: var(--radius-md); border: 1px solid var(--border);">
        <div class="empty-history-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <h3>No field scans recorded yet</h3>
        <p>Upload your first crop leaf photo to get a fast AI-assisted condition reading.</p>
        <a href="diagnosis.html" class="btn btn-primary">Start First Diagnosis</a>
      </div>
    `;
    return;
  }

  const recentItems = history.slice(0, 4);

  container.innerHTML = recentItems.map(item => {
    const badgeClass = item.isHealthy ? 'healthy' : 'disease';
    const statusText = item.isHealthy ? 'Healthy Crop' : 'Disease Detected';
    const imgSrc = item.imageSource || 'assets/images/sample-tomato-blight.svg';

    return `
      <div class="diagnosis-card">
        <div class="diagnosis-card-img-wrap">
          <img src="${imgSrc}" alt="${escapeHtml(item.crop)} leaf" loading="lazy">
          <div class="diagnosis-card-badge">
            <span class="badge-status ${badgeClass}">${statusText}</span>
          </div>
        </div>
        <div class="diagnosis-card-body">
          <div class="diagnosis-card-meta">
            <span class="diagnosis-card-crop">${escapeHtml(item.crop)}</span>
            <span>${escapeHtml(item.formattedDate || 'Recent')}</span>
          </div>
          <h4 class="diagnosis-card-condition">${escapeHtml(item.conditionName)}</h4>
          <div class="diagnosis-card-confidence">
            <span class="text-muted">Confidence Score</span>
            <span style="font-weight: 700; color: var(--forest);">${item.confidence}%</span>
          </div>
          <div class="diagnosis-card-footer">
            <a href="result.html?id=${encodeURIComponent(item.id)}" class="btn btn-secondary btn-sm" style="width: 100%;">
              View Full Report →
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function getHistory() {
  try {
    const data = localStorage.getItem('cropDoctorHistory');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}
