<div align="center">

<img src="https://img.shields.io/badge/CityConnect-Managing%20Cities-blue
" alt="CityConnect" />

# CityConnect

### A Smart Civic Engagement and Community Management Platform

*Empowering citizens, streamlining governance, and building stronger communities through a unified digital ecosystem*

<br/>

[![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

<br/>

[**🚀 Live Demo**](https://mascertify-live.onrender.com/) · [**📖 Docs**](#api-endpoints) · [**🐛 Report Bug**](../../issues) · [**✨ Request Feature**](../../issues)

<br/>

</div>

---

## 🎯 What is CityConnect?

CityConnect is a centralized MERN stack web application designed to bridge the gap between urban residents and municipal authorities. It replaces fragmented, manual paperwork with a transparent digital dashboard for managing city-wide services. 
From reporting broken roads to organizing local events or finding life-saving blood donors, CityConnect integrates critical civic functions into one seamless interface.

```
Citizen reports issue → Gov Agency tracks & resolves → Citizen receives real-time update
```

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🏛️ Civic & Admin Tools
- **Complaint Management — Submit issues with images, categories, and locations. 
- **Real-time Tracking — Follow status from "Submitted" to "Resolved".  
- **Reporting & Analytics — Generate insights on city-wide civic performance. 

</td>
<td width="50%">

### 🤝 Community & Support
- **Complaint submission - Report complaints for problems across city with location and evidence.
- **Event Coordination — Post and browse city events with volunteer registration. 
- **Volunteer Management — Dedicated dashboard for event organizers. 
- **Blood Donation Module — Search donors by group/location and manage availability. 
- **Emergency Contact System — Rapid coordination for urgent blood needs.

</td>
</tr>
</table>

### 🔐 Security & Trust
- Role-Based Access Control (RBAC) — Specialized interfaces for Citizens, Volunteers, Donors, Organizers, and Gov Agencies. 
- JWT Authentication — Secure, token-based login and session management. 
- Automated Notifications — In-app or email alerts for status updates and requests.e

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas + Mongoose |
| **Auth** | JSON Web Tokens (JWT) + bcryptjs |
| **Cloud Storage** | Cloudinary (Uploads & Assets) |
| **Notifications** | react-hot-toast |

---

## 🚀 Quick Start

### Prerequisites

- Node.js `v18+`
- A [MongoDB Atlas](https://cloud.mongodb.com/) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/isKaushik2/CityManagement.git
cd citymanagement
```

### 2. Install dependencies

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 3. Configure environment

```bash
cp server/.env.example server/.env
```

Open `server/.env` and fill in your values:

```env
PORT=8000
DATABASE_URL=your_mongo_uri
JWT_SECRET=your_secret
ALLOWED_ORIGIN="http://localhost:5173"

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
```bash
cp client/.env.example client/.env
```

Open `client/.env` and fill in your values:

```env
VITE_API_BASE_URL="http://localhost:8000"
```


### 4. Run the application

Open **two terminals**:

```bash
# Terminal 1 — Backend API (port 8000)
cd server && npm run dev

# Terminal 2 — Frontend (port 5173)
cd client && npm run dev
```

Then open → **http://localhost:5173** 🎉

---

## 📡 API Endpoints

### Auth Routes — `/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/signup` | — | Register a new user → Login → returns JWT token |
| `POST` | `/login` | — | Login → returns JWT token |
| `POST` | `/logout` | 🔒 JWT | Get current user + org data |
| `PUT` | `/profile` | 🔒 JWT | Update name / org details |

### Complaint Routes — `/complaint`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/submit` | 🔒 User | Create & save a new complaint |
| `GET` | `/list` | 🔒 Admin | List all complaints |
| `GET` | `/list/:id` | 🔒 Admin | Get a complaint by a user id |
| `PUT` | `/list/:id` | 🔒 Admin | Update a complaint status |
| `DELETE` | `/list/:id` | 🔒 Admin | Permanently delete a complaint |
| `GET` | `/stats` | - | Get the stats regarding complaints |

### Donor Routes — `/donors`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | - | List all donors |
| `GET` | `/counts` | 🔒 User | Get counts for each blood group |
| `GET` | `/me` | 🔒 User | Get user's donor profile |
| `POST` | `/` | 🔒 User | Register a donor |
| `PATCH` | `/me/availability` | 🔒 User | Update user's availability |

### Event Routes — `/api`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/events` | - | List all events |
| `POST` | `/events` | - | Create an event |
| `DELETE` | `/events/:id` | - | Delete an event |

### Volunteer Routes — `/app`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/volunteers` | 🔒 User | Create & save a new volunteer |
| `GET` | `/volunteers/check` | 🔒 User | Checks if user is enrolled in any event |
| `GET` | `/volunteers/check/:eventId` | 🔒 User | Checks if user is enrolled in an event |
| `GET` | `/volunteers/:eventId` | 🔒 Admin | Get all volunteers for an event |
| `PATCH` | `/volunteers/:id/status` | 🔒 User | Update volunteer status |
| `DELETE` | `/volunteers/:id` | - | Delete a volunteer |

### Activity Routes — `/activity`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/create` | 🔒 JWT | Create & save a new activity |
| `GET` | `/list` | 🔒 User | Lists all activities of user |

---

## 🔑 User Roles

| Role | Access |
|------|--------|
| `user` | Submit Complaint, Register as a donor, Find donors, Enroll as volunteer for events |
| `admin` | Access analytics, Review Complaints, Change complaint status, Create Events, Review Blood Donors|

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch — `git checkout -b feature/amazing-feature`
3. Commit your changes — `git commit -m 'Add amazing feature'`
4. Push to the branch — `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Built with ❤️ using the MERN Stack**

</div>