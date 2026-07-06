# 🏥 VitalSync - AI Powered Healthcare Management System

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-green" />
  <img src="https://img.shields.io/badge/React-Vite-blue" />
  <img src="https://img.shields.io/badge/Node.js-Express-success" />
  <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</p>

---

## 📖 Overview

VitalSync is a full-stack Healthcare Management System built using the MERN Stack that enables patients and doctors to manage healthcare digitally.

The platform allows patients to monitor vital signs, book appointments, access prescriptions, manage medical records, and maintain a digital wallet. Doctors can efficiently manage appointments, patient records, prescriptions, consultations, hospital beds, blood inventory, and conduct video consultations.

---

# 🌐 Live Demo

**🚀 Live Application:** https://vitalsync-new.onrender.com/index.html

# ✨ Features

## 👤 Patient Module

- Secure Authentication (JWT)
- Dashboard with Health Analytics
- AI Health Risk Indicator
- Add & Track Vitals
- Medical Records History
- Book Appointments
- Live Appointment Status
- Prescription Management
- Download Prescription PDF
- Digital Wallet
- Medical Bills
- Interactive Hospital Map
- Medication Reminder
- Health Trends

---

## 👨‍⚕️ Doctor Module

- Doctor Dashboard
- Appointment Management
- Confirm / Reject Appointments
- Video Consultation (Jitsi Meet)
- Medical Record Management
- Voice Dictation (Speech Recognition)
- Prescription Management
- Patient Risk Analysis
- Patient Vitals Monitoring
- Blood Bank Management
- Bed Allocation Management
- Wallet Dashboard

---

## 🤖 Smart Features

- AI Health Risk Analysis
- Voice-to-Text Medical Notes
- Medication Reminder System
- Real-time Dashboard
- Interactive Charts
- Hospital Facility Map
- Video Consultation
- PDF Prescription Generator

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- React Hook Form
- Lucide React
- React Hot Toast
- Socket.io Client
- React Leaflet
- jsPDF

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io
- Express Validator
- Cookie Parser
- Morgan

---

## Database

- MongoDB Atlas

---

# 📁 Project Structure

```
VitalSync
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── services
│   │   ├── hooks
│   │   ├── context
│   │   ├── utils
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── socket
│   ├── utils
│   ├── server.js
│   └── app.js
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/DhruvTalati/VitalSync.git
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# ⚙️ Environment Variables

## Server (.env)

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

NODE_ENV=development
```

---

## Client (.env)

```
VITE_API_URL=http://localhost:5000/api

VITE_SOCKET_URL=http://localhost:5000
```

---

# 📊 Major Modules

✔ Authentication

✔ Patient Dashboard

✔ Doctor Dashboard

✔ Appointment Management

✔ Medical Records

✔ Prescriptions

✔ Wallet

✔ Bed Allocation

✔ Blood Inventory

✔ Video Consultation

✔ Health Analytics

✔ AI Risk Analysis

---


# 🔮 Future Enhancements

- AI Disease Prediction
- OCR Prescription Scanner
- Wearable Device Integration
- Email & SMS Notifications
- Multi-Hospital Support
- Doctor Availability Scheduling
- Payment Gateway Integration
- Mobile Application

---

# 👨‍💻 Developer

**Dhruv Talati**

B.Tech Information Technology

Aspiring Full Stack Developer

GitHub

https://github.com/DhruvTalati


# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the MIT License.
