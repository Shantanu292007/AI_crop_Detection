/**
 * CROP DOCTOR — AI FIELD INTELLIGENCE
 * Authentication & Session Management Module (auth.js)
 */

const CropDoctorAuth = (() => {
  'use strict';

  const STORAGE_KEY_USERS = 'cropDoctorUsers';
  const STORAGE_KEY_CURRENT_USER = 'cropDoctorCurrentUser';
  const STORAGE_KEY_HISTORY = 'cropDoctorHistory';

  const DEFAULT_DEMO_USER = {
    id: 'usr_demo_01',
    name: 'Maria Ramos',
    email: 'farmer.maria@fieldcrop.demo',
    password: 'demoPassword123',
    location: 'Salinas Valley, CA',
    preferredCrop: 'Tomato & Bell Pepper',
    createdAt: '2026-01-15T08:00:00.000Z'
  };

  const DEFAULT_SEED_HISTORY = [
    {
      id: 'CD-FIELD-01',
      timestamp: '2026-09-29T11:20:00.000Z',
      formattedDate: 'Sep 29, 2026, 11:20 AM',
      crop: 'Field Crop / Horticultural Foliage',
      scientificCrop: 'Various Host Plants',
      conditionName: 'Aphid Infestation (Insect Pest)',
      scientificName: 'Aphidoidea (Pest Problem)',
      status: 'Pest Infestation Detected',
      severity: 'Moderate to High',
      confidence: 96,
      isHealthy: false,
      summary: 'This is not really a disease; it is an insect pest problem. The insects are clustered heavily around the plant tissue, and the white material appears consistent with aphid cast skins.',
      symptoms: [
        'Dense clusters of insects crowded heavily around plant tissue',
        'Abundant white powdery material consistent with aphid cast skins (exuviae)',
        'Curling or distortion of young leaves and shoots'
      ],
      nextSteps: [
        'Inspect the underside of leaves and new shoots regularly.',
        'Remove heavily infested leaves/shoots.',
        'Use a strong water spray for light infestations.'
      ],
      prevention: [
        'Inspect the underside of leaves and new shoots regularly.',
        'Remove heavily infested leaves/shoots.',
        'Use a strong water spray for light infestations.',
        'Encourage natural predators such as ladybird beetles.',
        'Avoid excessive nitrogen fertilizer, which can encourage soft new growth.',
        'For serious infestations, use an agriculturally approved aphicide/insecticide according to the crop label.'
      ],
      whenToSeekExpert: 'If aphids cover more than 20% of the crop canopy or viral symptoms appear, contact agricultural extension.',
      imageSource: 'assets/images/banana-aphid-infestation.jpg',
      isDemoAnalysis: true,
      notes: 'Insects clustered heavily around plant tissue with white cast skins.'
    },
    {
      id: 'CD-FIELD-02',
      timestamp: '2026-09-29T09:45:00.000Z',
      formattedDate: 'Sep 29, 2026, 09:45 AM',
      crop: 'Maize (Corn)',
      scientificCrop: 'Zea mays',
      conditionName: 'Maize Ear Problem (Possible Ear / Kernel Rot)',
      scientificName: 'Fungal Ear Rot Complex',
      status: 'Possible Disease Detected',
      severity: 'High',
      confidence: 91,
      isHealthy: false,
      summary: 'The image shows a maize ear with kernel discoloration/deterioration, so an ear/kernel rot is possible. However, the exact fungal disease cannot be reliably distinguished from this image alone.',
      symptoms: [
        'Visible kernel discoloration and progressive tissue deterioration along the cob',
        'Scattered or incomplete kernel fill with sunken, bleached, or blackened kernels',
        'Fungal mold or mycelial growth potentially developing between kernel rows'
      ],
      nextSteps: [
        'Remove and properly dispose of severely affected ears.',
        'Harvest mature grain promptly and dry to below 15% moisture to halt rot progression.',
        'If the problem is widespread, obtain a crop-specific diagnosis before selecting a fungicide.'
      ],
      prevention: [
        'Use certified/disease-free seed.',
        'Avoid waterlogging and excessive irrigation.',
        'Maintain proper plant spacing and field ventilation.',
        'Remove and properly dispose of severely affected ears.',
        'Control insects that damage maize ears because wounds can allow fungal infection.',
        'Use resistant/tolerant varieties where available.',
        'If the problem is widespread, obtain a crop-specific diagnosis before selecting a fungicide.'
      ],
      whenToSeekExpert: 'If kernel discoloration exceeds 10% of ears or grain is intended for animal feed, obtain professional mycotoxin testing.',
      imageSource: 'assets/images/corn-ear-rot.jpg',
      isDemoAnalysis: true,
      notes: 'Maize ear with kernel discoloration and deterioration.'
    },
    {
      id: 'CD-FIELD-03',
      timestamp: '2026-09-28T16:15:00.000Z',
      formattedDate: 'Sep 28, 2026, 04:15 PM',
      crop: 'Foliar Crop Specimen',
      scientificCrop: 'Plantae (Foliage)',
      conditionName: 'Leaf Fungal Disease (Necrotic Leaf Spot)',
      scientificName: 'Foliar Necrotic Fungal Pathogen',
      status: 'Possible Disease Detected',
      severity: 'Moderate to High',
      confidence: 93,
      isHealthy: false,
      summary: 'The large brown dead areas indicate a leaf-spot/necrotic fungal problem. The exact disease depends strongly on the crop species.',
      symptoms: [
        'Large, expanding brown to dark necrotic dead areas across the leaf blade',
        'Chlorotic (yellow) halos or margins bordering dead necrotic patches',
        'Brittle, scorched leaf margins curling upward and drying prematurely'
      ],
      nextSteps: [
        'Remove infected leaves and fallen plant debris from beneath the canopy.',
        'Ensure irrigation is directed strictly at the root zone; avoid wetting leaves.',
        'Improve sunlight and air circulation by appropriate spacing/pruning.'
      ],
      prevention: [
        'Remove infected leaves and fallen plant debris.',
        'Avoid watering directly onto foliage.',
        'Improve sunlight and air circulation by appropriate spacing/pruning.',
        'Don\'t over-irrigate.',
        'Use disease-resistant varieties where available.',
        'Apply an appropriate fungicide only after identifying the crop and disease accurately.'
      ],
      whenToSeekExpert: 'If defoliation exceeds 25% of canopy or stem cankers develop, consult local agricultural extension.',
      imageSource: 'assets/images/apple-black-rot.jpg',
      isDemoAnalysis: true,
      notes: 'Large brown dead necrotic areas on foliage.'
    },
    {
      id: 'CD-INIT-001',
      timestamp: '2026-09-27T10:15:00.000Z',
      formattedDate: 'Sep 27, 2026, 10:15 AM',
      crop: 'Tomato',
      scientificCrop: 'Solanum lycopersicum',
      conditionName: 'Tomato Early Blight',
      scientificName: 'Alternaria solani',
      status: 'Possible Disease Detected',
      severity: 'Moderate',
      confidence: 87,
      isHealthy: false,
      summary: 'Early blight is a prevalent fungal disease that targets solanaceous crops. It typically begins on older lower foliage with concentric target-ring spots.',
      symptoms: [
        'Small, brown-to-black necrotic spots on older leaves first',
        'Distinctive concentric rings creating a target-board pattern',
        'Yellow chlorotic halos surrounding lesions'
      ],
      nextSteps: [
        'Prune and dispose of infected lower leaves.',
        'Avoid overhead irrigation; keep water on root zones.',
        'Apply copper-based or bio-fungicide spray in early morning.'
      ],
      prevention: [
        'Practice a 2 to 3-year crop rotation.',
        'Mulch around plant base to prevent soil splash.'
      ],
      whenToSeekExpert: 'If lesions spread to over 30% of the canopy, consult your local agricultural extension service.',
      imageSource: 'assets/images/sample-tomato-blight.svg',
      isDemoAnalysis: true,
      notes: 'Observed on lower leaves near greenhouse perimeter.'
    },
    {
      id: 'CD-INIT-002',
      timestamp: '2026-09-25T14:40:00.000Z',
      formattedDate: 'Sep 25, 2026, 02:40 PM',
      crop: 'Corn (Maize)',
      scientificCrop: 'Zea mays',
      conditionName: 'Healthy Crop Foliage',
      scientificName: 'Normal Vegetative Tissue',
      status: 'Healthy Crop',
      severity: 'Optimal',
      confidence: 96,
      isHealthy: true,
      summary: 'No significant pathogenic foliar symptoms detected. Uniform green coloration and intact venation.',
      symptoms: [
        'Uniform green pigmentation without chlorosis',
        'Absence of fungal spots or lesions',
        'Intact leaf margins'
      ],
      nextSteps: [
        'Continue regular field scouting.',
        'Maintain balanced moisture and avoid drought stress.'
      ],
      prevention: [
        'Proactive field scouting weekly.',
        'Maintain clean machinery.'
      ],
      whenToSeekExpert: 'Routine checkup only. No urgent action needed.',
      imageSource: 'assets/images/sample-healthy-corn.svg',
      isDemoAnalysis: true,
      notes: 'North test plot row 12.'
    },
    {
      id: 'CD-INIT-003',
      timestamp: '2026-09-22T09:10:00.000Z',
      formattedDate: 'Sep 22, 2026, 09:10 AM',
      crop: 'Potato',
      scientificCrop: 'Solanum tuberosum',
      conditionName: 'Potato Early Blight',
      scientificName: 'Alternaria solani',
      status: 'Possible Disease Detected',
      severity: 'Moderate',
      confidence: 84,
      isHealthy: false,
      summary: 'Early blight causes foliar stress and early senescence, reducing tuber bulking.',
      symptoms: [
        'Circular to angular dark brown spots restricted by leaf veins',
        'Concentric ridges within lesions'
      ],
      nextSteps: [
        'Maintain balanced nitrogen and potassium fertilization.',
        'Schedule irrigation in the early morning.'
      ],
      prevention: [
        'Use certified disease-free seed tubers.',
        'Rotate crops for at least 3 years.'
      ],
      whenToSeekExpert: 'Consult an agronomist if tuber rot symptoms develop.',
      imageSource: 'assets/images/sample-potato-blight.svg',
      isDemoAnalysis: true,
      notes: 'Bed 4 early morning scout.'
    }
  ];

  function initStorage() {
    try {
      if (!localStorage.getItem(STORAGE_KEY_USERS)) {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify([DEFAULT_DEMO_USER]));
      }
      if (!localStorage.getItem(STORAGE_KEY_HISTORY)) {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(DEFAULT_SEED_HISTORY));
      }
    } catch (e) {
      console.warn('LocalStorage access is restricted or unavailable:', e);
    }
  }

  initStorage();

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [DEFAULT_DEMO_USER];
    } catch (e) {
      return [DEFAULT_DEMO_USER];
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      return true;
    } catch (e) {
      console.error('Error saving users:', e);
      return false;
    }
  }

  function getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function isLoggedIn() {
    return getCurrentUser() !== null;
  }

  function loginUser(email, password, remember = true) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      return { success: false, message: 'Please provide both email and password.' };
    }

    const users = getUsers();
    const matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!matchedUser) {
      return { success: false, message: 'No account found with this email address.' };
    }

    if (matchedUser.password !== cleanPassword) {
      return { success: false, message: 'Incorrect password. Please verify and try again.' };
    }

    const sessionUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      location: matchedUser.location || 'Field Station',
      preferredCrop: matchedUser.preferredCrop || 'General Crops',
      createdAt: matchedUser.createdAt || new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(sessionUser));
    } catch (e) {
      console.error('Failed to store session:', e);
    }

    return { success: true, user: sessionUser };
  }

  function loginDemoUser() {
    const sessionUser = {
      id: DEFAULT_DEMO_USER.id,
      name: DEFAULT_DEMO_USER.name,
      email: DEFAULT_DEMO_USER.email,
      location: DEFAULT_DEMO_USER.location,
      preferredCrop: DEFAULT_DEMO_USER.preferredCrop,
      createdAt: DEFAULT_DEMO_USER.createdAt
    };

    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(sessionUser));
    } catch (e) {
      console.error('Failed to store session:', e);
    }

    return { success: true, user: sessionUser };
  }

  function registerUser(name, email, password, location = '', preferredCrop = '') {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      return { success: false, message: 'Please complete all required fields.' };
    }

    const users = getUsers();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }

    const newUser = {
      id: 'usr_' + Date.now().toString(36),
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      location: (location || 'Field Station').trim(),
      preferredCrop: (preferredCrop || 'Mixed Crops').trim(),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      location: newUser.location,
      preferredCrop: newUser.preferredCrop,
      createdAt: newUser.createdAt
    };

    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(sessionUser));
    } catch (e) {
      console.error('Failed to store session:', e);
    }

    return { success: true, user: sessionUser };
  }

  function logoutUser() {
    try {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    } catch (e) {
      console.error('Logout error:', e);
    }
    window.location.href = 'index.html';
  }

  function requireAuth() {
    if (!isLoggedIn()) {
      const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
      window.location.href = 'login.html?redirect=' + encodeURIComponent(currentPath);
      return false;
    }
    return true;
  }

  return {
    getCurrentUser,
    isLoggedIn,
    loginUser,
    loginDemoUser,
    registerUser,
    logoutUser,
    requireAuth,
    getUsers,
    saveUsers
  };
})();
