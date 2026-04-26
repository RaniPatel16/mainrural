# ruralRich – Smart Rural Delivery System 🚚

[![Full-Stack](https://img.shields.io/badge/Full--Stack-MERN-blue.svg)](https://github.com/RaniPatel16/assignment1)
[![UI/UX](https://img.shields.io/badge/UI%2FUX-High--Fidelity-gradient.svg)](https://github.com/RaniPatel16/assignment1)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

##  Project Overview
**RuralReach** is a specialized logistics solution designed to bridge the "Last-Mile" gap in rural communities. In regions where traditional addressing systems fail and infrastructure is sparse, RuralReach provides a technologically advanced supply chain ecosystem. 

This project solves the challenge of rural delivery by connecting local agents, utilizing smart GPS-based addressing, and implementing community-verified delivery protocols, ensuring that online ordering becomes a reality for everyone, regardless of their location.

---

##  Problem Statement
Traditional logistics companies often avoid rural areas due to:
*   **Unreliable Doorstep Delivery**: High failure rates due to difficult terrain.
*   **Lack of Address Systems**: Absence of house numbers or standardized street names.
*   **Locational Ambiguity**: Delivery agents struggle to find exact drop-off points.
*   **Low Profitability**: High costs of individual deliveries in sparse populations.

---

##  The Solution
RuralReach transforms rural logistics into a viable and efficient service through:
*   **Smart Address System**: Utilizing GPS coordinates, landmarks, and photo evidence for pinpoint accuracy.
*   **Localized Agent Network**: Empowering local members of the community to manage their own territories.
*   **Community Verification**: Secure neighbor handovers using OTP (One-Time Password) validation.
*   **Operational Transparency**: A unified command hub for administrators to monitor and optimize shipment flows.

---

##  Features

###  User Features
*   **Interactive Onboarding**: Role-based registration for Customers and Agents.
*   **Smart Address Manager**: Create digital addresses with GPS and landmarks.
*   **Real-time Tracking**: Monitor shipment progress from regional hubs to your doorstep.
*   **Order History**: Comprehensive log of all past deliveries and digital receipts.
*   **Community Drop-off**: Request delivery to a trusted neighbor with secure OTP verification.

###  Agent Features
*   **Earnings Dashboard**: Track commissions, payouts, and performance metrics.
*   **Route Optimizer**: AI-driven pathfinding for complex rural roads.
*   **Proof of Delivery (PoD)**: Mandatory photo upload and GPS logging for ogni successful handover.
*   **Queue Management**: Organize and prioritize daily delivery tasks.

###  Admin Features (Management Hub)
*   **Fleet Oversight**: Monitor the activity of all active delivery agents.
*   **Order Dispatching**: Manually or automatically assign shipments to local agents.
*   **User Management**: Control and verify the customer base and operational staff.
*   **Regional Analytics**: View heatmaps of order volume and logistics efficiency.

---

##  Unique Innovations
- **Smart ID System**: Every rural location is assigned a unique digital ID based on geographic data.
- **Delivery Clustering**: Groups orders by village sectors to maximize agent efficiency.
- **Neighbor Verification**: A fallback security system that uses secondary contacts for successful first-attempt deliveries.
- **Premium Light Theme**: A high-fidelity, light-themed SaaS UI/UX designed for modern enterprise standards.

---

##  Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Redux Toolkit, Lucide Icons |
| **Styling** | Vanilla CSS (Modern Design System), Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT (JSON Web Tokens), Bcrypt.js |
| **Logistics** | GPS-Coordinate Mapping |

---

##  Installation & Setup

### 1. Prerequisites
*   Node.js (v16+)
*   MongoDB Atlas Account or Local MongoDB

### 2. Clone the Repository
```bash
git clone https://github.com/RaniPatel16/assignment1.git
cd rural
```

### 3. Setup Backend
```bash
cd backend
npm install
# Create a .env file with:
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_secret_key
# PORT=5000
npm run dev
```

### 4. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 5. Seed Admin Account (Optional)
```bash
cd ../backend
node seed.js
```
*   **Default Admin**: `admin@ruralreach.com` / `admin123`

---

## 🎨 UI/UX Design Resources
The high-fidelity UI/UX prototype for this project was designed in Figma, focusing on a clean SaaS aesthetic and intuitive multi-role workflows.

*   **Figma Prototype**: [View Design on Figma](https://www.figma.com/design/jxdjf4Gy8GGIGlDkfCaAZi/Custom-Login-page-and-Signup-page-UI--Community-?node-id=0-1&t=vYgdDbaRZsbvguBn-1)

---

## 🔗 Project Structure
```text
rural/
├── backend/
│   ├── models/        # Database Schemas (User, Address, Order, Delivery)
│   ├── controllers/   # Business Logic
│   ├── routes/        # API Endpoints
│   ├── middleware/    # Auth & File Upload Logic
│   └── public/        # Uploaded Assets
└── frontend/
    ├── src/
    │   ├── features/  # Redux Slices (State Management)
    │   ├── pages/     # Component Pages (Dashboard, Auth, Landing)
    │   ├── components/# Reusable UI Elements (Sidebar, Navbar)
    │   └── assets/    # Static Images
```

---

##  Authentication & Security
*   **JWT-based Auth**: Secure stateless authentication for all API requests.
*   **Role-Based Access Control (RBAC)**: Strict permissions for `User`, `Agent`, and `Admin`.
*   **Data Integrity**: Password hashing via Bcrypt and form validation via frontend/backend guards.

---



## Author
**Rani Patel**
*   [GitHub](https://github.com/RaniPatel16)

---

##  Final Note
This project demonstrates a scalable, full-stack solution to one of the most persistent logistics challenges in developing regions. It showcases clean architecture, modern UI/UX design, and complex problem-solving skills across the MERN stack.

---
*Empowering rural communities, one delivery at a time.*
