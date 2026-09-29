/**
 * CROP DOCTOR — AI FIELD INTELLIGENCE
 * Profile Page Controller (profile.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  if (!CropDoctorAuth.requireAuth()) return;
  initProfileView();
});

function initProfileView() {
  const currentUser = CropDoctorAuth.getCurrentUser();
  if (!currentUser) return;

  const avatarEl = document.getElementById('profileAvatar');
  const nameEl = document.getElementById('profileName');
  const emailEl = document.getElementById('profileEmail');

  const metaJoinedEl = document.getElementById('profileJoinedDate');
  const metaTotalScansEl = document.getElementById('profileTotalScans');

  const inputName = document.getElementById('profNameInput');
  const inputEmail = document.getElementById('profEmailInput');
  const inputLocation = document.getElementById('profLocationInput');
  const inputCrop = document.getElementById('profCropInput');
  const profileForm = document.getElementById('profileForm');

  const initials = currentUser.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'CD';

  if (avatarEl) avatarEl.textContent = initials;
  if (nameEl) nameEl.textContent = currentUser.name;
  if (emailEl) emailEl.textContent = currentUser.email;

  let joinText = 'Jan 2026';
  if (currentUser.createdAt) {
    const d = new Date(currentUser.createdAt);
    joinText = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  if (metaJoinedEl) metaJoinedEl.textContent = joinText;

  try {
    const history = JSON.parse(localStorage.getItem('cropDoctorHistory')) || [];
    if (metaTotalScansEl) metaTotalScansEl.textContent = history.length;
  } catch (e) {
    if (metaTotalScansEl) metaTotalScansEl.textContent = '0';
  }

  if (inputName) inputName.value = currentUser.name || '';
  if (inputEmail) inputEmail.value = currentUser.email || '';
  if (inputLocation) inputLocation.value = currentUser.location || '';
  if (inputCrop) inputCrop.value = currentUser.preferredCrop || '';

  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const newName = inputName.value.trim();
      const newEmail = inputEmail.value.trim().toLowerCase();
      const newLocation = inputLocation.value.trim();
      const newCrop = inputCrop.value.trim();

      if (!newName || !newEmail) {
        showToast('Name and email cannot be blank.', 'error');
        return;
      }

      const updatedUser = {
        ...currentUser,
        name: newName,
        email: newEmail,
        location: newLocation,
        preferredCrop: newCrop
      };

      try {
        localStorage.setItem('cropDoctorCurrentUser', JSON.stringify(updatedUser));

        const users = CropDoctorAuth.getUsers();
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
          users[userIndex].name = newName;
          users[userIndex].email = newEmail;
          users[userIndex].location = newLocation;
          users[userIndex].preferredCrop = newCrop;
          CropDoctorAuth.saveUsers(users);
        }

        if (nameEl) nameEl.textContent = newName;
        if (emailEl) emailEl.textContent = newEmail;
        const newInitials = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        if (avatarEl) avatarEl.textContent = newInitials;

        showToast('Profile changes saved successfully.', 'success');
      } catch (err) {
        console.error('Error saving profile changes:', err);
        showToast('Failed to save profile changes.', 'error');
      }
    });
  }
}
