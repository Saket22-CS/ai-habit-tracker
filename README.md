# 🎯 AI Habit Tracker

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-8.5-47A248?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Active-success?style=for-the-badge)

**A full-stack MERN application powered by Google Gemini AI for intelligent habit coaching, streak analytics, and personalized daily motivation.**

[Live Demo](#) · [API Docs](#api-documentation) · [Report Bug](#troubleshooting) · [Request Feature](#roadmap)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Data Flow & Workflows](#data-flow--workflows)
- [Database Schema](#database-schema)
- [AI Features Deep Dive](#ai-features-deep-dive)
- [API Documentation](#api-documentation)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Analytics & Calculations](#analytics--calculations)
- [Performance Optimization](#performance-optimization)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

---

## 🎯 Overview

**AI Habit Tracker** is a sophisticated, full-stack habit management system built on the MERN stack with Google Gemini 2.5 Flash AI at its core. It goes far beyond a simple to-do list — it's a personal coaching platform that:

- Tracks habits with automatic streak calculations and visual heatmaps
- Generates personalized AI weekly reports grounded in your actual data
- Provides intelligent streak recovery when you slip up
- Delivers daily morning motivation mentioning your specific habits
- Suggests new habits tailored to your goals and patterns
- Answers natural language questions about your habit performance

The application was designed with a **glass morphism UI**, full **dark/light theme** support, smooth animations, confetti celebrations, and a responsive layout that works seamlessly on mobile and desktop.

---

## ✨ Key Features

### 🗂 Habit Management
- Create, edit, archive, and delete habits
- 9 categories: Health, Fitness, Learning, Mindfulness, Productivity, Social, Finance, Creative, Other
- Daily and weekly frequency support with customizable target days (1–7)
- Rich emoji + color customization per habit
- Drag-to-reorder habits (desktop)

### 🔥 Streak Tracking
- Automatic current streak and all-time best streak calculation
- Visual streak badges on every habit card
- Streak recovery system auto-triggers for broken streaks on habits with 7+ day history
- Confetti celebration when all daily habits are completed

### 🤖 AI-Powered Features (Google Gemini 2.5 Flash)
- **Weekly Report** — 120–180 word coaching analysis of last 7 days
- **Morning Motivation** — Daily 30–60 word personalized message with user-scoped caching
- **Habit Suggestions** — 3 AI-recommended habits based on goals, productive times, and struggles
- **Recovery Plans** — 3-day step-by-step guidance for broken streaks
- **AI Chat** — Natural language Q&A about your habit data

### 📊 Analytics Dashboard
- 90-day GitHub-style completion heatmap
- Summary cards: total habits, active streaks, best streak, weekly rate
- Circular progress ring for daily completion (0–100%)
- 4-week bar chart for trend visualization
- Monthly completion bar chart
- Category distribution pie chart
- Per-habit statistics cards

### 🎨 User Experience
- Dark/light theme with system-preference detection
- Fully responsive — mobile-first with adaptive layouts
- Smooth slide-up, fade-in animations and floating icons
- Real-time UI updates on habit toggle
- Settings panel for name and motivation preferences

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.5 | UI framework |
| Vite | 8.0.10 | Build tool & dev server |
| React Router DOM | 6.25.1 | Client-side routing |
| Tailwind CSS | 4.0.0 | Utility-first styling |
| Recharts | 2.12.7 | Data visualization |
| Lucide React | 0.411.0 | Icon library |
| Axios | 1.7.2 | HTTP client with interceptors |
| date-fns | 3.6.0 | Date utilities |
| @dnd-kit | latest | Drag-and-drop reordering |
| canvas-confetti | latest | Celebration animations |
| react-markdown | 10.1.0 | Markdown rendering for AI output |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express.js | 4.19.2 | Web framework |
| MongoDB | 8.5.1 | NoSQL database |
| Mongoose | 8.5.1 | ODM for MongoDB |
| jsonwebtoken | 9.0.2 | JWT authentication |
| bcryptjs | 2.4.3 | Password hashing |
| Google Generative AI SDK | 1.50.1 | Gemini AI integration |
| cors | 2.8.5 | Cross-origin resource sharing |
| dotenv | 16.4.5 | Environment variable management |
| Nodemon | 3.1.4 | Dev hot-reload |

### Infrastructure
| Layer | Tool | Notes |
|---|---|---|
| Database | MongoDB Atlas | Free tier, cloud-hosted |
| AI | Google Gemini 2.5 Flash | Free tier available |
| Frontend Deploy | Vercel / Netlify | Auto-build from GitHub |
| Backend Deploy | Render / Railway / Fly.io | Environment variables in platform |

---

## 🏗️ System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph CLIENT["🌐 Client Layer (React + Vite)"]
        UI[React UI Components]
        CTX[Context API<br/>Auth + Theme]
        AX[Axios Instance<br/>JWT Interceptors]
    end

    subgraph SERVER["⚙️ Server Layer (Node.js + Express)"]
        MW[Auth Middleware<br/>JWT Verification]
        CTRL[Controllers<br/>Auth · Habits · Logs · AI]
        SVC[AI Service<br/>Gemini Prompts]
        ERR[Error Handler<br/>Global Middleware]
    end

    subgraph DATA["🗄️ Data Layer (MongoDB Atlas)"]
        U[(Users)]
        H[(Habits)]
        L[(HabitLogs)]
        AI_C[(AIInsights)]
    end

    subgraph EXTERNAL["🔌 External Services"]
        GEM[Google Gemini<br/>2.5 Flash API]
    end

    UI --> CTX
    CTX --> AX
    AX -->|HTTP + Bearer Token| MW
    MW --> CTRL
    CTRL --> SVC
    SVC -->|Prompt + User Data| GEM
    GEM -->|Generated Content| SVC
    CTRL -->|Mongoose ODM| DATA
    ERR --> AX
```

### Component Architecture (Frontend)

```mermaid
graph TD
    APP[App.jsx<br/>Route Root]

    APP --> LAND[Landing.jsx]
    APP --> AUTH[Login / Register]
    APP --> PROTECTED[ProtectedRoute]

    PROTECTED --> LAYOUT[AppLayout.jsx]

    LAYOUT --> SIDEBAR[Sidebar.jsx<br/>Navigation + Settings]
    LAYOUT --> MOBILE[MobileNav.jsx]

    LAYOUT --> DASH[Dashboard.jsx]
    LAYOUT --> HABITS[Habits.jsx]
    LAYOUT --> WEEKLY[Weekly.jsx]
    LAYOUT --> INSIGHTS[Insights.jsx]
    LAYOUT --> STATS[Stats.jsx]

    DASH --> MM[MorningMotivation.jsx<br/>User-scoped cache]
    DASH --> THC[TodayHabitCard.jsx]
    DASH --> PR[ProgressRing.jsx]
    DASH --> SC[SummaryCards.jsx]
    DASH --> SRC[StreakRecoveryCard.jsx]

    STATS --> HC[HeatmapChart.jsx]
    STATS --> WBC[WeeklyBarChart.jsx]
    STATS --> MBC[MonthlyBarChart.jsx]
    STATS --> CPC[CategoryPieChart.jsx]
    STATS --> WG[WeeklyGrid.jsx]

    INSIGHTS --> AWR[AIWeeklyReport.jsx]
    INSIGHTS --> AIC[AIChat.jsx]
    INSIGHTS --> HSM[HabitSuggestionModal.jsx]
```

### Backend Module Architecture

```mermaid
graph LR
    subgraph ENTRY["Entry Point"]
        SRV[server.js]
    end

    subgraph CONFIG["Config"]
        DB[config/db.js<br/>MongoDB Connection]
    end

    subgraph ROUTES["Routes Layer"]
        RA[routes/auth.js]
        RH[routes/habit.js]
        RL[routes/log.js]
        RAI[routes/ai.js]
    end

    subgraph CONTROLLERS["Controllers"]
        CA[authController.js]
        CH[habitController.js]
        CL[logController.js]
        CAI[aiController.js]
    end

    subgraph MIDDLEWARE["Middleware"]
        MAUTH[auth.js<br/>JWT Verify]
        MERR[errorHandler.js]
    end

    subgraph MODELS["Models"]
        MU[User.js]
        MH[Habit.js]
        ML[HabitLog.js]
        MAI[AIInsight.js]
    end

    subgraph UTILS["Utils"]
        AI_SVC[aiService.js<br/>Gemini Prompts]
        DH[dateHelpers.js<br/>Streak Calc]
    end

    SRV --> DB
    SRV --> ROUTES
    ROUTES --> MIDDLEWARE
    ROUTES --> CONTROLLERS
    CONTROLLERS --> MODELS
    CONTROLLERS --> UTILS
    AI_SVC --> MODELS
```

---

## 📁 Project Structure

```
ai_habit_tracker/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx            # Public landing with aurora + solar system animation
│   │   │   ├── Login.jsx              # JWT login form
│   │   │   ├── Register.jsx           # Account creation
│   │   │   ├── Dashboard.jsx          # Today's focus view
│   │   │   ├── Habits.jsx             # Full habit management
│   │   │   ├── Weekly.jsx             # Week-at-a-glance
│   │   │   ├── Insights.jsx           # AI reports + suggestions
│   │   │   └── Stats.jsx              # Analytics + heatmaps
│   │   │
│   │   ├── components/
│   │   │   ├── AppLayout.jsx          # Shell: sidebar + main content
│   │   │   ├── Sidebar.jsx            # Navigation + settings panel
│   │   │   ├── MobileNav.jsx          # Responsive mobile menu
│   │   │   ├── ProtectedRoute.jsx     # JWT auth guard
│   │   │   ├── Modal.jsx              # Reusable modal wrapper
│   │   │   ├── LoadingSpinner.jsx     # Async loading state
│   │   │   │
│   │   │   ├── # Dashboard Components
│   │   │   ├── MorningMotivation.jsx  # Daily AI message (user-scoped cache)
│   │   │   ├── TodayHabitCard.jsx     # Habit toggle card
│   │   │   ├── ProgressRing.jsx       # Circular % indicator
│   │   │   ├── SummaryCards.jsx       # Stat tiles
│   │   │   ├── StreakRecoveryCard.jsx # Auto-triggered recovery prompt
│   │   │   │
│   │   │   ├── # Chart Components
│   │   │   ├── HeatmapChart.jsx       # 90-day GitHub-style grid
│   │   │   ├── WeeklyGrid.jsx         # 7-day overview
│   │   │   ├── WeeklyBarChart.jsx     # 4-week trend
│   │   │   ├── MonthlyBarChart.jsx    # Monthly rates
│   │   │   ├── CategoryPieChart.jsx   # Category distribution
│   │   │   │
│   │   │   ├── # AI Components
│   │   │   ├── AIWeeklyReport.jsx     # Report card UI
│   │   │   ├── AIChat.jsx             # Floating chat bubble
│   │   │   ├── HabitSuggestionModal.jsx  # 3-step suggestion wizard
│   │   │   └── OrbitingHabits.jsx     # Landing page animation
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Global auth state + login/logout
│   │   │   └── ThemeContext.jsx       # Dark/light toggle + localStorage
│   │   │
│   │   ├── api/
│   │   │   └── axios.js               # Axios instance + JWT interceptors + 401 handler
│   │   │
│   │   └── utils/
│   │       ├── dateHelpers.js         # Streak calculations, date keys
│   │       └── confetti.js            # Celebration trigger logic
│   │
│   ├── .env                           # VITE_API_URL
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── models/
│   │   ├── User.js                    # Auth, preferences, avatar
│   │   ├── Habit.js                   # Habit definition + metadata
│   │   ├── HabitLog.js                # Daily completion records
│   │   └── AIInsight.js               # AI response cache
│   │
│   ├── controllers/
│   │   ├── authController.js          # Register, login, me, profile update
│   │   ├── habitController.js         # CRUD, archive, reorder
│   │   ├── logController.js           # Mark complete/incomplete, range, heatmap
│   │   └── aiController.js            # Gemini feature endpoints
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── habit.js
│   │   ├── log.js
│   │   └── ai.js
│   │
│   ├── middleware/
│   │   ├── auth.js                    # JWT decode + user attach
│   │   └── errorHandler.js            # Centralized error responses
│   │
│   ├── config/
│   │   └── db.js                      # Mongoose connect + retry logic
│   │
│   ├── utils/
│   │   ├── aiService.js               # Gemini client + system prompts
│   │   └── dateHelpers.js             # Streak algorithms, date formatting
│   │
│   ├── scripts/
│   │   └── seed.js                    # 8 habits + 500+ logs over 90 days
│   │
│   └── server.js                      # Express bootstrap + routes mount
│
└── README.md
```

---

## 🔄 Data Flow & Workflows

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User Browser
    participant R as React App
    participant A as Auth Context
    participant API as Express API
    participant DB as MongoDB

    U->>R: Enter credentials
    R->>API: POST /auth/login {email, password}
    API->>DB: Find user by email
    DB-->>API: User document
    API->>API: bcrypt.compare(password, hash)
    API->>API: jwt.sign(userId, secret, 30d)
    API-->>R: {user, token}
    R->>A: setUser(user), localStorage.setItem(token)
    A-->>R: isAuthenticated = true
    R->>U: Redirect to /dashboard

    Note over R,API: All subsequent requests
    R->>API: GET /habits (Authorization: Bearer <token>)
    API->>API: jwt.verify(token, secret)
    API->>DB: Query by req.userId
    DB-->>API: User's habits
    API-->>R: Habit array
```

### Habit Completion Flow

```mermaid
sequenceDiagram
    participant U as User
    participant THC as TodayHabitCard
    participant AX as Axios
    participant LC as logController
    participant DB as MongoDB
    participant CONF as Confetti

    U->>THC: Click habit checkbox
    THC->>THC: Optimistic UI update (toggle)
    THC->>AX: POST /logs {habitId, date}
    AX->>LC: Request + JWT verified
    LC->>DB: Check existing log (compound unique index)
    alt No log exists
        LC->>DB: Create HabitLog
        DB-->>LC: Created log
        LC-->>AX: 201 Created
    else Log exists (uncheck)
        LC->>DB: Delete HabitLog
        DB-->>LC: Deleted
        LC-->>AX: 200 OK
    end
    AX-->>THC: Response
    THC->>THC: Recalculate daily progress
    alt All habits completed
        THC->>CONF: Trigger confetti 🎉
    end
```

### AI Insight Generation Flow

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant AIC as aiController
    participant DB as MongoDB
    participant SVC as aiService.js
    participant GEM as Gemini 2.5 Flash

    FE->>AIC: POST /ai/weekly-report
    AIC->>DB: Fetch last 7 days logs
    AIC->>DB: Fetch user's habits
    AIC->>DB: Fetch streak data
    DB-->>AIC: Aggregated user data
    AIC->>SVC: buildWeeklyReportPrompt(userData)
    SVC->>SVC: Construct system prompt + data context
    SVC->>GEM: generateContent(prompt)
    GEM-->>SVC: AI-generated report text
    SVC->>DB: Save AIInsight {userId, type, content}
    SVC-->>AIC: Report content
    AIC-->>FE: {content: "...report..."}
    FE->>FE: Render via react-markdown
```

### Morning Motivation Caching Flow

```mermaid
flowchart TD
    A[Dashboard Loads] --> B{morningMotivation enabled?}
    B -- No --> Z[Show nothing]
    B -- Yes --> C{Check localStorage<br/>morning-seen:userId}
    C -- Today's date found --> D[Read morning-content:userId]
    D --> E[Display cached message]
    C -- Not found / different date --> F[Fetch GET /ai/morning]
    F --> G[Gemini generates<br/>30-60 word message]
    G --> H[Cache in localStorage<br/>morning-seen:userId = today<br/>morning-content:userId = msg]
    H --> I[Display new message]
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        String name
        String email
        String password
        String avatar
        Boolean morningMotivation
        Date createdAt
        Date updatedAt
    }

    HABIT {
        ObjectId _id PK
        ObjectId userId FK
        String name
        String description
        String category
        String frequency
        Number targetDays
        String color
        String icon
        Boolean isArchived
        Number order
        Date createdAt
        Date updatedAt
    }

    HABITLOG {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId habitId FK
        String completedDate
        String notes
        Date createdAt
    }

    AIINSIGHT {
        ObjectId _id PK
        ObjectId userId FK
        String type
        String content
        Mixed meta
        Date generatedAt
        Date createdAt
    }

    USER ||--o{ HABIT : "owns"
    USER ||--o{ HABITLOG : "records"
    USER ||--o{ AIINSIGHT : "generates"
    HABIT ||--o{ HABITLOG : "tracked by"
```

### Model Details

**User**
```javascript
{
  _id:                 ObjectId,
  name:                String (required, trim),
  email:               String (required, unique, lowercase),
  password:            String (bcrypt-hashed, 10 salt rounds),
  avatar:              String (default: first letter of name),
  morningMotivation:   Boolean (default: false),
  createdAt, updatedAt: Date (auto)
}
// Indexes: email (unique)
```

**Habit**
```javascript
{
  _id:         ObjectId,
  userId:      ObjectId (ref: User, indexed),
  name:        String (required, trim),
  description: String,
  category:    enum["Health","Fitness","Learning","Mindfulness",
                    "Productivity","Social","Finance","Creative","Other"],
  frequency:   enum["daily","weekly"] (default: "daily"),
  targetDays:  Number 1–7 (default: 7),
  color:       String hex (default: "#6366f1"),
  icon:        String emoji (default: "🎯"),
  isArchived:  Boolean (default: false),
  order:       Number (drag-to-reorder position),
  createdAt, updatedAt: Date
}
// Indexes: userId, isArchived
```

**HabitLog**
```javascript
{
  _id:           ObjectId,
  userId:        ObjectId (ref: User, indexed),
  habitId:       ObjectId (ref: Habit, indexed),
  completedDate: String "YYYY-MM-DD",
  notes:         String,
  createdAt:     Date
}
// Indexes: compound UNIQUE on (userId, habitId, completedDate)
// Prevents duplicate completions per habit per day
```

**AIInsight**
```javascript
{
  _id:         ObjectId,
  userId:      ObjectId (ref: User, indexed),
  type:        enum["weekly","suggestion","recovery","chat","morning"],
  content:     String (generated text or JSON),
  meta:        Mixed (flexible metadata per type),
  generatedAt: Date (default: now),
  createdAt:   Date
}
// Indexes: userId, type
```

---

## 🤖 AI Features Deep Dive

### Prompt Engineering Strategy

Each AI feature uses a purpose-built system prompt that:
1. Defines the AI's persona and tone
2. Injects real user data (habit names, streaks, completion rates)
3. Specifies exact output format and word count
4. Grounds the response in actual numbers to prevent hallucination

| Feature | Tone | Output Format | Length |
|---|---|---|---|
| Morning Motivation | Warm friend | Plain text | 30–60 words |
| Weekly Report | Habit coach | Plain text / Markdown | 120–180 words |
| Habit Suggestions | Helpful advisor | JSON array (3 objects) | Structured |
| Recovery Plan | Compassionate guide | 3-day plan (Markdown) | ~150 words |
| AI Chat | Data analyst | Plain text | Max 120 words |

### AI Feature Architecture

```mermaid
graph TD
    subgraph ENDPOINTS["API Endpoints"]
        E1[GET /ai/morning]
        E2[POST /ai/weekly-report]
        E3[POST /ai/suggest-habits]
        E4[POST /ai/recovery-plan]
        E5[POST /ai/chat]
    end

    subgraph CONTROLLER["aiController.js"]
        C1[Fetch user habits + logs]
        C2[Calculate stats in Node.js]
        C3[Build data context object]
    end

    subgraph SERVICE["aiService.js"]
        S1[Lazy Gemini client init]
        S2[System prompt templates]
        S3[Data injection layer]
        S4[Response parser + fallbacks]
    end

    subgraph GEMINI["Google Gemini 2.5 Flash"]
        G1[generateContent API]
    end

    subgraph CACHE["AIInsight Model"]
        DB1[Store response]
        DB2[Serve cached content]
    end

    ENDPOINTS --> CONTROLLER
    CONTROLLER --> SERVICE
    SERVICE --> GEMINI
    GEMINI --> SERVICE
    SERVICE --> CACHE
    CACHE --> ENDPOINTS
```

### Habit Suggestion Wizard Flow

```mermaid
flowchart LR
    W1[Step 1\nWhat are your goals?] --> W2[Step 2\nBest productive time?]
    W2 --> W3[Step 3\nWhat do you struggle with?]
    W3 --> AI[POST /ai/suggest-habits\ngols + time + struggles]
    AI --> PARSE[Parse JSON response\n3 habit objects]
    PARSE --> CARD[Display suggestion cards\nwith reasoning]
    CARD --> ADD[One-click\nAdd to My Habits]
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication

All protected endpoints require:
```http
Authorization: Bearer <jwt_token>
```

---

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | ❌ | Create new account |
| POST | `/auth/login` | ❌ | Login, receive JWT |
| GET | `/auth/me` | ✅ | Get current user |
| PUT | `/auth/profile` | ✅ | Update name/preferences |

**Register / Login Response:**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "avatar": "J",
    "morningMotivation": false,
    "createdAt": "2024-05-13T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Habit Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/habits` | ✅ | List all habits (`?includeArchived=true`) |
| POST | `/habits` | ✅ | Create new habit |
| PUT | `/habits/:id` | ✅ | Update habit |
| DELETE | `/habits/:id` | ✅ | Delete habit |
| PUT | `/habits/:id/archive` | ✅ | Toggle archive status |
| PUT | `/habits/reorder` | ✅ | Save drag-and-drop order |

**Create Habit Request:**
```json
{
  "name": "Morning Meditation",
  "description": "5-minute mindfulness session",
  "category": "Mindfulness",
  "frequency": "daily",
  "targetDays": 7,
  "color": "#6366f1",
  "icon": "🧘"
}
```

---

### Log Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/logs/today` | ✅ | Get today's completion logs |
| GET | `/logs/range?start=&end=` | ✅ | Logs for date range |
| GET | `/logs/heatmap` | ✅ | 90-day aggregated data |
| GET | `/logs/stats/:habitId` | ✅ | Stats for a specific habit |
| POST | `/logs` | ✅ | Mark habit complete |
| DELETE | `/logs` | ✅ | Mark habit incomplete |

**Heatmap Response:**
```json
[
  { "date": "2024-05-13", "count": 3, "habits": ["id1", "id2", "id3"] },
  { "date": "2024-05-12", "count": 5, "habits": ["id1", ...] }
]
```

---

### AI Endpoints

All require `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/ai/morning` | Personalized daily motivation |
| POST | `/ai/weekly-report` | 7-day performance analysis |
| POST | `/ai/suggest-habits` | 3 personalized habit suggestions |
| POST | `/ai/recovery-plan` | 3-day streak recovery guide |
| POST | `/ai/chat` | Natural language Q&A about habits |

**Suggest Habits Request:**
```json
{
  "goals": "Better health and mental clarity",
  "productiveTime": "mornings",
  "struggles": "Staying consistent with exercise"
}
```

**Suggest Habits Response:**
```json
{
  "suggestions": [
    {
      "name": "20-min Morning Run",
      "description": "Jog around the neighborhood before breakfast",
      "frequency": "daily",
      "category": "Fitness",
      "icon": "🏃",
      "reason": "Targets your fitness goals during your peak productive window"
    }
  ]
}
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 18+ and npm
- **MongoDB Atlas** account (free tier)
- **Google Gemini API** key ([ai.google.dev](https://ai.google.dev))
- **Git**

---

### Backend Setup

```bash
# 1. Clone repository
git clone https://github.com/Saket22-CS/ai-habit-tracker.git
cd ai_habit_tracker/backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Edit .env with your values (see Environment Variables section)

# 4. Start development server
npm run dev
# Server starts at http://localhost:8000

# 5. Health check
curl http://localhost:8000/api/health
# Expected: { "status": "ok", "time": "..." }

# 6. (Optional) Seed demo data
npm run seed
# Creates 8 habits + 500+ logs over 90 days
```

---

### Frontend Setup

```bash
# 1. Navigate to frontend
cd ../frontend

# 2. Install dependencies
npm install

# 3. Create environment file
echo "VITE_API_URL=http://localhost:8000/api" > .env

# 4. Start development server
npm run dev
# App starts at http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend `.env`

```env
# Server
PORT=8000

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp

# Auth
JWT_SECRET=your-minimum-32-character-random-secret-here
JWT_EXPIRES_IN=30d

# AI
GEMINI_API_KEY=AIzaSyD...
GEMINI_MODEL=gemini-2.5-flash

# CORS
CLIENT_URL=http://localhost:5173
```

| Variable | Required | Description |
|---|---|---|
| `PORT` | ✅ | Express server port |
| `MONGO_URI` | ✅ | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Min 32 chars. Generate: `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | ✅ | Token lifetime: `30d`, `7d`, `24h` |
| `GEMINI_API_KEY` | ✅ | From [ai.google.dev](https://ai.google.dev) |
| `GEMINI_MODEL` | ✅ | `gemini-2.5-flash` recommended |
| `CLIENT_URL` | ✅ | Frontend origin for CORS |

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 📈 Analytics & Calculations

### Streak Algorithm

```mermaid
flowchart TD
    A[Load all logs for habit] --> B[Sort by date descending]
    B --> C{Log for today?}
    C -- Yes --> D[streak = 1\ncheck yesterday]
    C -- No --> E{Log for yesterday?}
    E -- Yes --> D
    E -- No --> F[currentStreak = 0]
    D --> G{Log for previous day?}
    G -- Yes --> H[streak++\ngo to next day]
    H --> G
    G -- No --> I[currentStreak = streak]
    I --> J[Scan entire history\nfor longestStreak peak]
```

### Heatmap Intensity Levels

| Completions/day | Color Intensity | CSS Class |
|---|---|---|
| 0 | Empty grey | `opacity-10` |
| 1–2 | Light green | `opacity-30` |
| 3–4 | Medium green | `opacity-60` |
| 5+ | Full green | `opacity-100` |

### Weekly Completion Rate

```
Rate (%) = (Total logs this week) / (Total active habits × 7) × 100
```

---

## ⚡ Performance Optimization

### Frontend
- **Route-based code splitting** via React Router lazy loading
- **`useMemo`** for expensive streak derivation computations
- **User-scoped localStorage caching** for morning motivation (prevents repeat API calls on same day)
- **Optimistic UI updates** — habit toggle reflects instantly before API confirms
- **Emoji icons** over image assets to eliminate image HTTP requests

### Backend
- **Compound unique index** on `(userId, habitId, completedDate)` — fast lookups, enforces data integrity
- **Parallel data fetching** with `Promise.all()` in dashboard-heavy endpoints
- **Lazy Gemini client initialization** — only instantiates when first AI request arrives
- **MongoDB projection** — only selected fields returned per query
- **Centralized error middleware** — prevents unhandled promise rejections from crashing server

### Database Indexes Summary

| Collection | Index | Type | Purpose |
|---|---|---|---|
| users | email | Unique | Fast login lookup |
| habits | userId | Single | Filter user's habits |
| habits | isArchived | Single | Filter active habits |
| habitlogs | userId | Single | User's logs |
| habitlogs | habitId | Single | Per-habit queries |
| habitlogs | (userId, habitId, completedDate) | Compound Unique | Prevent duplicates, fast range queries |
| aiinsights | userId | Single | User's insight history |
| aiinsights | type | Single | Filter by insight type |

---

## 🔒 Security

### Authentication & Authorization
- **JWT tokens** signed with HS256, 30-day expiry stored in `localStorage`
- **bcrypt** password hashing with 10 salt rounds (~100ms hash time)
- **Auth middleware** verifies every protected route; attaches `req.userId`
- **Role separation** — users can only access their own data (userId filter on all queries)

### CORS Configuration
```javascript
// Allows requests from:
// - No origin (curl, server-to-server)
// - localhost:* (any port, development)
// - Origins listed in CLIENT_URL env var
// Credentials and Authorization headers permitted
```

### Input Validation
- Mongoose schema validation on all model fields
- Enum constraints on category, frequency, insight type
- Compound unique index prevents log duplication attacks
- JWT expiry limits exposure window from stolen tokens

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB connection fails**
```bash
# Check: IP whitelist in MongoDB Atlas includes your machine (or 0.0.0.0/0 for dev)
# Check: credentials in MONGO_URI are correct
# Check: cluster is active (free tier pauses after 60 days inactivity)
node -e "require('mongoose').connect(process.env.MONGO_URI).then(()=>console.log('OK')).catch(console.error)"
```

**AI endpoints return errors**
```bash
# Verify Gemini key is valid and has quota:
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

**CORS errors in browser**
```
Error: Access to XMLHttpRequest blocked by CORS policy
Fix: Ensure CLIENT_URL in backend .env exactly matches frontend origin
     e.g. CLIENT_URL=http://localhost:5173 (no trailing slash)
```

**Morning motivation not appearing**
```
1. Enable via Settings > "Morning motivation" toggle
2. Confirm GEMINI_API_KEY is set in backend .env
3. Check browser localStorage is not blocked
4. Check Network tab > GET /ai/morning for error details
```

**JWT verification fails / logged out unexpectedly**
```bash
# Regenerate secret (this invalidates all existing tokens):
openssl rand -hex 32
# Update JWT_SECRET in .env and clear localStorage in browser
```

**Port already in use**
```bash
# Linux/Mac
lsof -i :8000 | awk 'NR>1{print $2}' | xargs kill -9
# Or change PORT in backend .env
```

**Vite cache issues**
```bash
rm -rf frontend/node_modules/.vite
npm run dev
```

---

## 🚢 Deployment

### Architecture Diagram (Production)

```mermaid
graph LR
    subgraph CDN["CDN / Static Host"]
        VER[Vercel / Netlify\nReact Build]
    end

    subgraph CLOUD["Cloud Platform"]
        REN[Render / Railway\nNode.js Server]
    end

    subgraph DB["Database Cloud"]
        MDB[MongoDB Atlas\nM0 Free Tier]
    end

    subgraph AI["AI API"]
        GEM[Google Gemini\n2.5 Flash]
    end

    USER[👤 User] --> VER
    VER -->|HTTPS API Calls| REN
    REN --> MDB
    REN --> GEM
```

### Frontend (Vercel)

```bash
# 1. Push code to GitHub
# 2. Connect repo to Vercel
# 3. Set environment variable:
#    VITE_API_URL = https://your-backend.render.com/api
# 4. Deploy — Vercel auto-detects Vite
```

### Backend (Render)

```bash
# 1. Connect GitHub repo to Render
# 2. Set build command: npm install
# 3. Set start command: node server.js
# 4. Add all env vars from .env (PORT, MONGO_URI, JWT_SECRET, GEMINI_API_KEY, etc.)
# 5. Set CLIENT_URL = https://your-frontend.vercel.app
```

### Production Checklist

- [ ] `NODE_ENV=production` set on backend
- [ ] MongoDB Atlas IP whitelist includes backend server IP (or 0.0.0.0/0)
- [ ] `CLIENT_URL` points to production frontend domain
- [ ] `JWT_SECRET` is a long, random, unique value
- [ ] Gemini API key has sufficient quota for expected usage
- [ ] HTTPS enabled on both frontend and backend

---

## 🤝 Contributing

1. **Fork** the repository
2. **Branch**: `git checkout -b feature/your-feature-name`
3. **Code** — follow existing patterns and file structure
4. **Test** manually: auth, habits, logs, AI endpoints, mobile layout, dark mode
5. **Commit**: `git commit -m 'feat: add export to CSV'`
6. **Push**: `git push origin feature/your-feature-name`
7. **Pull Request** — describe what changed and why

### Commit Convention

| Prefix | Use for |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `docs:` | Documentation updates |
| `style:` | CSS/UI changes |
| `refactor:` | Code restructuring |
| `perf:` | Performance improvements |

---

## 🗺️ Roadmap

### v1.1 (Q3 2025)
- [ ] Export habit data to CSV
- [ ] Custom date ranges for AI reports
- [ ] Email digests (weekly summary)
- [ ] Habit sharing with friends

### v1.2 (Q4 2025)
- [ ] React Native mobile app
- [ ] Push notifications (streak reminders)
- [ ] Community habit challenges
- [ ] Fitness tracker integrations (Apple Health, Google Fit)

### v2.0 (2026)
- [ ] Habit templates library
- [ ] Team / family accounts
- [ ] Webhook integrations
- [ ] GraphQL API option
- [ ] Advanced AI coaching (voice, images)

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev) for powering intelligent habit insights
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for reliable cloud database
- [Recharts](https://recharts.org) for beautiful, composable chart components
- [Tailwind CSS](https://tailwindcss.com) for rapid, consistent UI development
- [Vite](https://vitejs.dev) for blazing-fast development experience
- [canvas-confetti](https://github.com/catdad/canvas-confetti) for celebration animations

---

<div align="center">

**Built with ❤️ using React, Node.js, MongoDB, and Google Gemini AI**

⭐ Star this repo if it helped you build something cool!

</div>