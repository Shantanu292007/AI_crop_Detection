# CROP DOCTOR
### AI-Powered Crop Disease Detection System
> *"Smarter crop care, one leaf at a time."*  
> **Brand Label:** `AI FIELD INTELLIGENCE`

Crop Doctor is a responsive, client-side web application created as a student and community agriculture project. It is designed to assist smallholder farmers, agronomists, and gardening communities in identifying possible crop foliar diseases from leaf images and providing simple, practical, farmer-friendly guidance.

---

## 🌾 Design Philosophy & Visual Language

Crop Doctor is built with an **editorial agricultural technology aesthetic**:
- **Warm Off-White/Cream Backgrounds**: `#F7F5EA` and `#EEEBDD`
- **Dark Forest Green Typography**: `#174D3A` and `#1E3329`
- **Deep Green Cards & Primary CTAs**: `#276B52` and `#174D3A`
- **Muted Olive Accents**: `#8FA75C` and `#A7B86A`
- **Subtle Warm Amber/Yellow Highlights**: `#E7AA45`
- **Typography**: Editorial serif headings (`Playfair Display`, `Newsreader`, `Georgia`) paired with clean modern sans-serif body text (`Plus Jakarta Sans`, system-ui)
- **Geometry**: Generous rounded corners (`16px–28px`), subtle drop shadows, and clean borders
- **Mobile First**: 100% responsive without horizontal scrolling on smartphones, tablets, laptops, and desktops.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic markup, accessible labels, clean structure
- **CSS3**: Modern CSS Variables, Flexbox, Grid, smooth animations, zero CSS frameworks
- **Vanilla JavaScript (ES6+)**: Modular architecture, zero external dependencies, no build tools required
- **Web Storage API (`localStorage` & `sessionStorage`)**: Private in-browser demo authentication and diagnosis history
- **Scalable Vector Graphics (SVG)**: Custom vector icons and botanical illustrations for high-DPI displays

---

## 📂 Project Directory Structure

```text
AI_crop_detection/
│
├── index.html               # Premium landing page (Hero, Steps, Features, Mission, CTA)
├── login.html               # Login page with 1-click Demo User access
├── register.html            # Registration page with field validation
├── dashboard.html           # Farmer dashboard (Live statistics, quick actions, recent scans)
├── diagnosis.html           # Leaf upload workspace (Drag & drop, presets, AI scan simulation)
├── result.html              # Comprehensive diagnosis report (Symptoms, steps, prevention, meta)
├── history.html             # Field history (Search by crop, status filters, deletion)
├── profile.html             # Farmer profile & farm plot settings
├── about.html               # Project mission, limitations, and visual AI pipeline timeline
├── contact.html             # Community contact form with demo submission feedback
│
├── css/
│   ├── style.css            # Global theme variables, typography, navigation, buttons, cards, footer
│   ├── auth.css             # Split-panel layout and form control styling for auth pages
│   ├── dashboard.css        # Dropzone, radar scan modal, stats, results, and history tables
│   └── responsive.css       # Mobile drawer menu and media queries across all breakpoints
│
├── js/
│   ├── main.js              # Global navigation, mobile drawer, auth-state navbar, toast alerts
│   ├── auth.js              # LocalStorage authentication, session guard, demo user management
│   ├── ai-service.js        # Independent modular AI detection engine & botanical knowledge base
│   ├── diagnosis.js         # Dropzone file handler, validation, sample leaf loader, scan orchestrator
│   ├── result.js            # Report data binding, printing, and condition status styling
│   ├── history.js           # Search filter, category pills, table rendering, record deletion
│   └── profile.js           # User profile loader and updater
│
├── assets/
│   ├── icons/
│   │   └── logo.svg         # Custom vector logo (botanical leaf with AI aperture brackets)
│   └── images/
│       ├── hero-card-leaf.svg       # High-detail animated leaf scan graphic for hero section
│       ├── sample-tomato-blight.svg # Instant sample leaf (Early Blight)
│       ├── sample-healthy-corn.svg  # Instant sample leaf (Healthy Corn)
│       ├── sample-potato-blight.svg # Instant sample leaf (Late Blight)
│       └── sample-apple-spot.svg    # Instant sample leaf (Frogeye Leaf Spot)
│
└── README.md                # Complete documentation
```

---

## 🚀 How to Run the Application

The application requires **no Node.js**, **no backend server**, and **no build steps**.

### Method 1: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in any modern web browser (Chrome, Edge, Firefox, Safari).

### Method 2: VS Code Live Server (Recommended)
1. Open the project folder (`AI_crop_detection`) in **Visual Studio Code**.
2. Right-click on `index.html` and choose **"Open with Live Server"** (or click the **"Go Live"** button on the bottom status bar).
3. The site will open automatically at `http://127.0.0.1:5500/index.html`.

---

## 🔑 How Demo Authentication Works

Crop Doctor uses a secure, simulated authentication system powered by `localStorage`:
- **Storage Keys**:
  - `cropDoctorUsers`: Array of registered accounts.
  - `cropDoctorCurrentUser`: Active user session object.
- **Default Pre-Configured Demo Account**:
  - **Email**: `farmer.maria@fieldcrop.demo`
  - **Password**: `demoPassword123`
- **1-Click Demo Login**:
  - On `login.html`, click the **"✦ Continue as Demo User"** button to log in immediately without typing.
- **Protected Routes**:
  - `dashboard.html`, `diagnosis.html`, `result.html`, `history.html`, and `profile.html` automatically verify login state via `CropDoctorAuth.requireAuth()`. Unauthenticated visitors are gently redirected to `login.html`.
- **Dynamic Navigation**:
  - When logged in, the global header dynamically replaces guest buttons with a quick "Diagnose" action, user avatar initials, and a "Log Out" button.

---

## 🔬 How Demo AI Detection Works

1. On `diagnosis.html`, the user can:
   - Drag & drop or browse a leaf image (JPG, JPEG, PNG, WEBP up to 10MB).
   - Or click any of the **4 Sample Leaf Presets** (Tomato Blight, Healthy Corn, Potato Blight, Apple Spot).
2. Clicking **"Analyze Crop"** launches an animated scanning radar dialog with a progress indicator and multi-step status updates:
   - *"Reading crop imagery and color spectrum..."*
   - *"Segmenting leaf venation and surface patterns..."*
   - *"Evaluating against botanical neural network (Demo Dataset)..."*
   - *"Synthesizing agronomic recommendations..."*
3. The detection logic executes in `js/ai-service.js`, selecting the diagnostic match from the built-in botanical knowledge base.
4. The generated analysis record is saved to `cropDoctorHistory` in `localStorage` and automatically opens in `result.html?id=[id]`.

### Pre-Configured Conditions in the Demo Knowledge Base:
- **Tomato Early Blight** (*Alternaria solani*)
- **Tomato Late Blight** (*Phytophthora infestans*)
- **Potato Early Blight** (*Alternaria solani*)
- **Potato Late Blight** (*Phytophthora infestans*)
- **Apple Leaf Spot** (*Venturia inaequalis / Botryosphaeria*)
- **Corn Northern Leaf Blight** (*Exserohilum turcicum*)
- **Grape Downy Mildew** (*Plasmopara viticola*)
- **Healthy Crop Foliage** (*Optimal vegetative vigor*)

---

## 🤖 Where the Demo AI Function is Located & How to Connect a Real Model Later

### Location of the AI Inference Logic:
The AI engine is strictly isolated in:
📁 **[`js/ai-service.js`](js/ai-service.js)** inside the function:
```javascript
CropDoctorAIService.analyzeCropImage(imageSource, imageName, onProgress)
```

### How to Connect Your Real AI Model:
Because UI code is completely separated from the AI service, you only need to update `analyzeCropImage()` in `js/ai-service.js` to send an HTTP request to your trained model backend (e.g., Python FastAPI, Flask, PyTorch, or TensorFlow.js).

---

## 🔒 Important Educational Disclaimer

Crop Doctor is built as an educational community project. The diagnoses and remedial guidance are intended for demonstration and visual screening only. They **must not replace certified on-site agronomic assessments**, chemical extension advisories, or accredited laboratory tissue culture testing.

---

## 💡 Future Enhancements

1. **Client-Side TensorFlow.js Inference**: Run quantized MobileNet models fully offline in field areas lacking cellular service.
2. **Progressive Web App (PWA)**: Add service worker caching and home screen installability on iOS and Android.
3. **Multilingual Support**: Provide Spanish, Hindi, French, and regional language translations for smallholder farming communities.
4. **Microclimate Integration**: Correlate foliar visual reads with ambient weather station sensor readings (relative humidity, leaf wetness duration).

---
*© 2026 Crop Doctor. Student Community Project.*
