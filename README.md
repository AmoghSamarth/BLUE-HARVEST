# 🐟 Blue Harvest — AI-Powered Aquaculture Mobile Web App

> **Count fish spawn live with your camera.**  
> Blue Harvest helps aquaculture farmers, hatchery technicians, and nursery operators count fish fry, spawn, and fingerlings in real time using lightweight computer vision.

![Blue Harvest Banner](public/fish-icon.svg)

---

## 🌟 Key Features

1. **Pixel-Perfect Mobile Login Interface**
   - Soft-clay / neumorphic sunken input fields with ergonomic touch targets.
   - Interactive password reveal button with floating pill elevation.
   - Dual authentication options: Standard Hatchery credentials and **Continue with Google**.
   - Signature multi-layered oceanic waves matching hatchery nursery environments.

2. **Responsive Art Direction (`/responsive-art-direction` & `/responsive-design`)**
   - **Phone Mode (320px–430px):** Edge-to-edge native mobile app shell with dynamic viewport `100dvh`, zero horizontal overflow, and thumb-zone optimization.
   - **Desktop Showcase Mode:** Realistic smartphone bezel chassis alongside an aquaculture feature summary panel.
   - **Tablet Mode (768px):** iPad / tablet layout for hatchery workstation desks.
   - **Fluid Mode:** Responsive layout adapting across widescreen displays.

3. **Live AI Fish Fry Counter Experience**
   - Onboard YOLOv8-Fry bounding box detection simulation.
   - Live telemetry: Fry Count, Density (fry/cm²), Average Length (mm), and Health Index.
   - Real-time device camera integration (`navigator.mediaDevices.getUserMedia`) with graceful fallback to simulated sample trays.
   - Batch export to Hatchery ledger.

4. **Complete User Flows**
   - **Log in** with validation and quick demo autofill.
   - **Register Hatchery** flow with location and pond assignment.
   - **Forgot Password** recovery modal with verification code feedback.
   - Interactive guides for fish farmers.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

Open your browser at:
```
http://localhost:5173/
```

### 3. Production Build
```bash
npm run build
```

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Vanilla CSS with custom tokens & neumorphic lighting effects
- **Icons:** Lucide React & Custom SVG Vector Graphics
- **Typography:** Nunito & Plus Jakarta Sans via Google Fonts

---

## 📄 License

MIT © [Amogh Samarth](https://github.com/AmoghSamarth)
