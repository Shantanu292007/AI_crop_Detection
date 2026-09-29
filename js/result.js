/**
 * CROP DOCTOR — AI FIELD INTELLIGENCE
 * Result Page Controller (result.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  if (!CropDoctorAuth.requireAuth()) return;
  renderDiagnosisResult();
});

function renderDiagnosisResult() {
  const urlParams = new URLSearchParams(window.location.search);
  const scanId = urlParams.get('id') || sessionStorage.getItem('cropDoctorLatestResultId');

  const historyStr = localStorage.getItem('cropDoctorHistory');
  const history = historyStr ? JSON.parse(historyStr) : [];

  let record = null;
  if (scanId) {
    record = history.find(r => r.id === scanId);
  }
  if (!record && history.length > 0) {
    record = history[0];
  }

  if (!record) {
    showToast('No diagnosis record found. Please analyze a leaf first.', 'warning');
    setTimeout(() => {
      window.location.href = 'diagnosis.html';
    }, 1500);
    return;
  }

  const leafImageEl = document.getElementById('resultLeafImage');
  const conditionNameEl = document.getElementById('resultConditionName');
  const scientificNameEl = document.getElementById('resultScientificName');
  const statusBadgeEl = document.getElementById('resultStatusBadge');
  const confidenceScoreEl = document.getElementById('resultConfidenceScore');
  const statusCardEl = document.getElementById('resultStatusCard');

  const metaCropEl = document.getElementById('resultMetaCrop');
  const metaDateEl = document.getElementById('resultMetaDate');
  const metaIdEl = document.getElementById('resultMetaId');
  const metaSeverityEl = document.getElementById('resultMetaSeverity');

  const whatWeFoundEl = document.getElementById('resultWhatWeFound');
  const symptomsListEl = document.getElementById('resultSymptomsList');
  const nextStepsListEl = document.getElementById('resultNextStepsList');
  const preventionListEl = document.getElementById('resultPreventionList');
  const expertAdviceEl = document.getElementById('resultExpertAdvice');

  if (leafImageEl) leafImageEl.src = record.imageSource || 'assets/images/sample-tomato-blight.svg';
  if (conditionNameEl) conditionNameEl.textContent = record.conditionName;
  if (scientificNameEl) scientificNameEl.textContent = record.scientificName || record.scientificCrop || '';
  if (confidenceScoreEl) confidenceScoreEl.textContent = `${record.confidence}%`;

  if (metaCropEl) metaCropEl.textContent = record.crop;
  if (metaDateEl) metaDateEl.textContent = record.formattedDate || new Date(record.timestamp).toLocaleDateString();
  if (metaIdEl) metaIdEl.textContent = record.id;
  if (metaSeverityEl) metaSeverityEl.textContent = record.severity || 'Normal';

  if (statusBadgeEl && statusCardEl) {
    if (record.isHealthy) {
      statusBadgeEl.textContent = 'Healthy Crop';
      statusBadgeEl.className = 'badge-status healthy';
      statusCardEl.classList.add('status-success');
    } else if (record.severity === 'High') {
      statusBadgeEl.textContent = 'Urgent Disease Detected';
      statusBadgeEl.className = 'badge-status disease';
      statusCardEl.classList.add('status-danger');
    } else {
      statusBadgeEl.textContent = 'Possible Disease Detected';
      statusBadgeEl.className = 'badge-status review';
      statusCardEl.classList.add('status-warning');
    }
  }

  if (whatWeFoundEl) {
    whatWeFoundEl.textContent = record.summary || 'Detailed leaf pattern analysis completed.';
  }

  if (symptomsListEl && Array.isArray(record.symptoms)) {
    symptomsListEl.innerHTML = record.symptoms.map(s => `<li class="result-bullet-item">${escapeHtml(s)}</li>`).join('');
  }

  if (nextStepsListEl && Array.isArray(record.nextSteps)) {
    nextStepsListEl.innerHTML = record.nextSteps.map(step => `<li class="result-step-item">${escapeHtml(step)}</li>`).join('');
  }

  if (preventionListEl && Array.isArray(record.prevention)) {
    preventionListEl.innerHTML = record.prevention.map(p => `<li class="result-bullet-item">${escapeHtml(p)}</li>`).join('');
  }

  if (expertAdviceEl) {
    expertAdviceEl.textContent = record.whenToSeekExpert || 'Consult local extension office if condition persists.';
  }

  const saveBtn = document.getElementById('saveReportBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      showToast('Diagnosis report safely archived in your field history.', 'success');
    });
  }

  const printBtn = document.getElementById('printReportBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
