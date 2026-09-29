/**
 * CROP DOCTOR — AI FIELD INTELLIGENCE
 * Diagnosis Page Controller (diagnosis.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  if (!CropDoctorAuth.requireAuth()) return;
  initDiagnosisWorkflow();
});

function initDiagnosisWorkflow() {
  const dropzone = document.getElementById('uploadDropzone');
  const fileInput = document.getElementById('leafFileInput');
  const previewArea = document.getElementById('uploadPreviewArea');
  const previewImg = document.getElementById('previewImg');
  const previewFilename = document.getElementById('previewFilename');
  const previewFilesize = document.getElementById('previewFilesize');
  const dropzonePrompt = document.getElementById('dropzonePrompt');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const clearBtn = document.getElementById('clearBtn');
  const changeImgBtn = document.getElementById('changeImgBtn');
  const sampleLeafBtns = document.querySelectorAll('.sample-leaf-btn');

  const scanModal = document.getElementById('scanOverlayModal');
  const scanStepMsg = document.getElementById('scanStepMsg');
  const scanProgressBar = document.getElementById('scanProgressBar');

  let currentImageDataUrl = null;
  let currentImageName = '';

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('#changeImgBtn') || e.target.closest('#clearPreviewBtn')) return;
      if (!currentImageDataUrl) {
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleSelectedFile(file);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const file = dt.files[0];
      if (file) handleSelectedFile(file);
    });
  }

  sampleLeafBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const samplePath = btn.getAttribute('data-sample-src');
      const sampleName = btn.getAttribute('data-sample-name') || 'sample-leaf.svg';
      loadSampleImage(samplePath, sampleName);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', resetDropzone);
  }

  if (changeImgBtn) {
    changeImgBtn.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', runCropAnalysis);
  }

  function handleSelectedFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type.toLowerCase())) {
      showToast('Please select a valid image file (JPG, PNG, or WEBP).', 'error');
      return;
    }

    if (file.size > maxSize) {
      showToast('Image file size must be less than 10MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLoadedImage(event.target.result, file.name, formatBytes(file.size));
      showToast('Leaf image loaded. Ready to analyze.', 'success');
    };
    reader.onerror = () => {
      showToast('Failed to read image file. Please try another image.', 'error');
    };
    reader.readAsDataURL(file);
  }

  function loadSampleImage(path, name) {
    setLoadedImage(path, name, 'Demo Asset');
    showToast(`Loaded sample: ${name}`, 'info');
  }

  function setLoadedImage(src, name, sizeText) {
    currentImageDataUrl = src;
    currentImageName = name;

    if (previewImg) previewImg.src = src;
    if (previewFilename) previewFilename.textContent = name;
    if (previewFilesize) previewFilesize.textContent = sizeText;

    if (dropzonePrompt) dropzonePrompt.style.display = 'none';
    if (previewArea) {
      previewArea.style.display = 'flex';
      previewArea.classList.add('has-image');
    }

    if (analyzeBtn) {
      analyzeBtn.removeAttribute('disabled');
      analyzeBtn.classList.remove('btn-disabled');
    }
  }

  function resetDropzone() {
    currentImageDataUrl = null;
    currentImageName = '';
    if (fileInput) fileInput.value = '';

    if (dropzonePrompt) dropzonePrompt.style.display = 'flex';
    if (previewArea) {
      previewArea.style.display = 'none';
      previewArea.classList.remove('has-image');
    }

    if (analyzeBtn) {
      analyzeBtn.setAttribute('disabled', 'true');
    }

    showToast('Image cleared.', 'info');
  }

  async function runCropAnalysis() {
    if (!currentImageDataUrl) {
      showToast('Please select or upload a leaf image first.', 'warning');
      return;
    }

    if (scanModal) scanModal.classList.add('is-active');

    try {
      const result = await CropDoctorAIService.analyzeCropImage(
        currentImageDataUrl,
        currentImageName,
        (progress) => {
          if (scanStepMsg) scanStepMsg.textContent = progress.message;
          if (scanProgressBar) scanProgressBar.style.width = `${progress.percent}%`;
        }
      );

      saveDiagnosisResult(result);

      setTimeout(() => {
        if (scanModal) scanModal.classList.remove('is-active');
        window.location.href = `result.html?id=${encodeURIComponent(result.id)}`;
      }, 500);

    } catch (err) {
      console.error('Analysis error:', err);
      if (scanModal) scanModal.classList.remove('is-active');
      showToast('An error occurred during analysis. Please try again.', 'error');
    }
  }

  function saveDiagnosisResult(result) {
    try {
      const historyStr = localStorage.getItem('cropDoctorHistory');
      let history = historyStr ? JSON.parse(historyStr) : [];
      history.unshift(result);
      localStorage.setItem('cropDoctorHistory', JSON.stringify(history));
      sessionStorage.setItem('cropDoctorLatestResultId', result.id);
    } catch (e) {
      console.error('Error saving diagnosis history:', e);
    }
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}
