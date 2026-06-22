# FIFA World Cup Quiz 🏆

An interactive full-stack web application that tests your FIFA World Cup knowledge — covering every tournament from 1930 to the ongoing 2026 World Cup in USA, Canada & Mexico. Features a floating AI assistant powered by Google Gemini, real-time leaderboard, admin panel, and a professional stadium-themed dark UI.

---

## Features

- **Quiz** — 20 randomized questions drawn from a bank of 120, with A/B/C/D options, live timer, and progress bar
- **AI Chat Assistant** — Floating chat widget powered by Google Gemini 2.5 Flash; answers any FIFA World Cup question from 1930–2026
- **Leaderboard** — Real-time rankings with gold/silver/bronze podium for top 3
- **Admin Panel** — Add, edit, and delete quiz questions (admin role only)
- **Authentication** — JWT-based register/login with bcrypt password hashing and strict email validation
- **Dark Stadium Theme** — Floodlit pitch atmosphere across all pages using CSS custom properties

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **Vite 5** | Build tool and dev server |
| **React Router DOM 6** | Client-side routing |
| **Axios** | HTTP requests to backend API |
| **CSS Custom Properties** | Global dark stadium theme & variables |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **MongoDB Atlas** | Cloud NoSQL database |
| **Mongoose** | MongoDB ODM / schema modeling |
| **JSON Web Token (JWT)** | User authentication & session management |
| **bcryptjs** | Password hashing |
| **Helmet** | HTTP security headers |
| **express-rate-limit** | API rate limiting (100 req / 15 min) |
| **dotenv** | Environment variable management |

### AI
| Technology | Purpose |
|---|---|
| **Google Gemini 2.5 Flash** | Powers the FIFA AI chat assistant |
| **@google/generative-ai** | Official Google AI Node.js SDK |

### DevOps & Deployment
| Tool | Purpose |
|---|---|
| **Render** | Cloud hosting — backend (Web Service) + frontend (Static Site) |
| **GitHub** | Version control and CI/CD trigger for Render |
| **MongoDB Atlas** | Managed cloud database (free tier M0) |

---

## Project Structure

```
fifa-worldcup-quiz/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authControllers.js     # Register / Login logic
│   │   ├── chatController.js      # Google Gemini AI chat
│   │   ├── leaderboardController.js
│   │   └── questionController.js
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification
│   │   └── adminMiddleware.js     # Admin role guard
│   ├── models/
│   │   ├── User.js
│   │   ├── questions.js
│   │   └── score.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── leaderboardRoutes.js
│   │   └── questionRoutes.js
│   ├── seed/
│   │   └── seedQuestions.js       # Seeds 120 quiz questions
│   ├── server.js
│   └── .env                       # Not committed — set on Render
│
└── frontend/
    ├── components/
    │   ├── ChatWidget.jsx          # Floating AI chat bubble
    │   └── Timer.jsx
    ├── pages/
    │   ├── login.jsx
    │   ├── Register.jsx
    │   ├── Quiz.jsx
    │   ├── Result.jsx
    │   ├── Leaderboard.jsx
    │   └── Admin.jsx
    ├── services/
    │   └── api.js                  # Axios instance with base URL
    ├── app.jsx
    ├── index.css                   # Global stadium dark theme
    └── index.html
```

---

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_ai_studio_key
AI_MODEL=gemini-2.5-flash
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google AI Studio API key — [aistudio.google.com](https://aistudio.google.com)

### 1. Clone the repository
```bash
git clone https://github.com/Sumant-crty/fifaQuiz.git
cd fifaQuiz
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create .env with the variables listed above
npm run dev
```

### 3. Seed the database (first time only)
```bash
cd backend
node seed/seedQuestions.js
```

### 4. Setup Frontend
```bash
cd frontend
npm install
# Create .env with VITE_API_URL=http://localhost:5000
npm run dev
```

---

## Deployment on Render

**Backend — Web Service**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node server.js`
- Add all backend environment variables in Render dashboard

**Frontend — Static Site**
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Add `VITE_API_URL` pointing to your backend Render URL

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login | Public |
| GET | `/api/questions?random=true&limit=20` | Get random questions | Public |
| POST | `/api/questions` | Add question | Admin |
| PUT | `/api/questions/:id` | Update question | Admin |
| DELETE | `/api/questions/:id` | Delete question | Admin |
| GET | `/api/leaderboard` | Get top scores | Public |
| POST | `/api/leaderboard` | Save score | Public |
| POST | `/api/chat` | AI chat message | Public |

---

## Author

**Sumant** — © 2026. All rights reserved.
