/**
 * CROP DOCTOR — AI FIELD INTELLIGENCE
 * Global Main Controller (main.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  initNavigation();
  initMobileDrawer();
  highlightActiveLink();
});

function initNavigation() {
  const navContainer = document.querySelector('.site-header');
  if (!navContainer) return;

  const currentUser = typeof CropDoctorAuth !== 'undefined' ? CropDoctorAuth.getCurrentUser() : null;
  const navActions = document.querySelector('.nav-actions');
  const mobileNavActions = document.querySelector('.mobile-nav-actions');

  if (currentUser) {
    const initials = currentUser.name
      ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      : 'CD';

    if (navActions) {
      navActions.innerHTML = `
        <a href="diagnosis.html" class="btn btn-primary btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          Diagnose
        </a>
        <a href="profile.html" class="nav-user-badge" title="View Profile">
          <div class="nav-user-avatar">${initials}</div>
          <span class="nav-user-name">${escapeHtml(currentUser.name.split(' ')[0])}</span>
        </a>
        <button id="navLogoutBtn" class="btn btn-secondary btn-sm" title="Log Out">
          Log Out
        </button>
      `;

      const logoutBtn = document.getElementById('navLogoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          CropDoctorAuth.logoutUser();
        });
      }
    }

    if (mobileNavActions) {
      mobileNavActions.innerHTML = `
        <a href="diagnosis.html" class="btn btn-primary btn-full">Start Diagnosis</a>
        <a href="dashboard.html" class="btn btn-secondary btn-full">Dashboard</a>
        <button id="mobileLogoutBtn" class="btn btn-secondary btn-full">Log Out (${escapeHtml(currentUser.name)})</button>
      `;

      const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
      if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', () => {
          CropDoctorAuth.logoutUser();
        });
      }
    }
  } else {
    if (navActions && !navActions.querySelector('.btn-primary')) {
      navActions.innerHTML = `
        <a href="login.html" class="btn btn-secondary btn-sm">Log in</a>
        <a href="register.html" class="btn btn-primary btn-sm">Get Started</a>
      `;
    }
  }
}

function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });
}

function highlightActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function showToast(message, type = 'info', duration = 4000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'ℹ️';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '⚠';
  if (type === 'warning') icon = '⚡';

  toast.innerHTML = `
    <span style="font-weight: bold; color: var(--forest);">${icon}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
