/**
 * CROP DOCTOR — AI FIELD INTELLIGENCE
 * History Page Controller (history.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  if (!CropDoctorAuth.requireAuth()) return;
  initHistoryView();
});

function initHistoryView() {
  const tableBody = document.getElementById('historyTableBody');
  const emptyState = document.getElementById('emptyHistoryState');
  const searchInput = document.getElementById('historySearchInput');
  const filterPills = document.querySelectorAll('.filter-pill');
  const tableContainer = document.getElementById('historyTableContainer');

  let currentFilter = 'all';
  let searchQuery = '';

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter') || 'all';
      renderHistoryList();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderHistoryList();
    });
  }

  renderHistoryList();

  function renderHistoryList() {
    let history = getHistoryRecords();

    if (currentFilter === 'healthy') {
      history = history.filter(item => item.isHealthy === true);
    } else if (currentFilter === 'disease') {
      history = history.filter(item => item.isHealthy === false);
    }

    if (searchQuery) {
      history = history.filter(item => {
        const cropMatch = (item.crop || '').toLowerCase().includes(searchQuery);
        const conditionMatch = (item.conditionName || '').toLowerCase().includes(searchQuery);
        const notesMatch = (item.notes || '').toLowerCase().includes(searchQuery);
        return cropMatch || conditionMatch || notesMatch;
      });
    }

    if (history.length === 0) {
      if (tableContainer) tableContainer.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (tableContainer) tableContainer.style.display = 'block';
    if (emptyState) emptyState.style.display = 'none';

    if (tableBody) {
      tableBody.innerHTML = history.map(item => {
        const badgeClass = item.isHealthy ? 'healthy' : 'disease';
        const statusText = item.isHealthy ? 'Healthy' : 'Disease Detected';
        const thumb = item.imageSource || 'assets/images/sample-tomato-blight.svg';
        const dateText = item.formattedDate || new Date(item.timestamp).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        });

        return `
          <tr id="row-${item.id}">
            <td data-label="Crop">
              <div class="history-crop-cell">
                <img src="${thumb}" alt="${escapeHtml(item.crop)}" class="history-thumb">
                <div>
                  <strong style="color: var(--forest);">${escapeHtml(item.crop)}</strong>
                  <div style="font-size: 0.78rem; color: var(--muted);">${escapeHtml(item.id)}</div>
                </div>
              </div>
            </td>
            <td data-label="Date">
              <span>${escapeHtml(dateText)}</span>
            </td>
            <td data-label="Condition">
              <strong style="color: var(--forest);">${escapeHtml(item.conditionName)}</strong>
            </td>
            <td data-label="Confidence">
              <span style="font-weight: 700; color: var(--forest);">${item.confidence}%</span>
            </td>
            <td data-label="Status">
              <span class="badge-status ${badgeClass}">${statusText}</span>
            </td>
            <td data-label="Actions" style="text-align: right;">
              <div style="display: flex; gap: 8px; justify-content: flex-end; align-items: center;">
                <a href="result.html?id=${encodeURIComponent(item.id)}" class="btn btn-secondary btn-sm" title="View Report">
                  View
                </a>
                <button class="btn btn-sm btn-delete-record" data-id="${item.id}" title="Remove scan" style="background: transparent; color: var(--muted); border: 1px solid var(--border); padding: 8px 10px;">
                  ✕
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      document.querySelectorAll('.btn-delete-record').forEach(delBtn => {
        delBtn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          deleteRecord(id);
        });
      });
    }
  }

  function deleteRecord(id) {
    if (!confirm('Are you sure you want to remove this diagnosis record?')) return;

    let history = getHistoryRecords();
    history = history.filter(item => item.id !== id);

    try {
      localStorage.setItem('cropDoctorHistory', JSON.stringify(history));
      showToast('Record removed.', 'info');
      renderHistoryList();
    } catch (e) {
      console.error('Error deleting record:', e);
    }
  }

  function getHistoryRecords() {
    try {
      const data = localStorage.getItem('cropDoctorHistory');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }
}
