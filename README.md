# igen.ai 🎙️🤖

An intelligent, voice-enabled mock interview platform that simulates realistic technical and behavioral interviews, evaluates your responses in real time, and helps you overcome interview anxiety before the real deal.

**Live Website URL** https://igen-ai.vercel.app/

---

## Why I Built This

Preparing for tech interviews is stressful. Practicing alone in front of a mirror or reading through LeetCode solutions doesn't recreate the real pressure of an actual conversation. On the other hand, booking human mock interviewers often costs too much.

I built **igen.ai** to bridge that gap. It acts as an interactive, adaptive technical interviewer that:
- Listens to your voice and transcribes answers in real time.
- Asks context-aware follow-up questions tailored to your chosen role and experience level.
- Analyzes your resume so you get grilled on your actual projects rather than generic trivia.
- Evaluates your responses against communication clarity, correctness, and confidence, delivering a downloadable PDF performance dossier at the end.

---

## Key Features

- **Role & Seniority Calibration**: Supports 30+ roles (Frontend, Backend, Full Stack, Data Science, DevOps, etc.) from Fresher to Senior levels.
- **Speech-to-Text Voice Engine**: Speak your answers directly via your microphone with live transcription.
- **Resume-Specific Interviews**: Upload your PDF resume to have the AI parse your tech stack and past projects.
- **Timed Simulations**: Realistic timer countdowns to simulate genuine interview pressure.
- **STAR-Method Evaluation**: AI scores communication, technical depth, and delivery confidence on a 1-to-10 scale.
- **Downloadable PDF Dossier**: Instant auto-generated PDF report containing detailed feedback, question-by-question breakdown, and actionable growth tips.
- **Dark Mode by Default**: Built with a sleek dark theme, glassmorphism cards, and an instant toggle to light mode.
- **Interview History**: Keep track of every session and monitor your score improvements over time.
- **Credits & Razorpay Integration**: Seamless starter credits and payment flow for additional mock sessions.

---

## Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (Custom Glassmorphism & Animations)
- **State Management**: Redux Toolkit
- **Motion & UI**: Framer Motion, React Circular Progressbar, Recharts
- **PDF Generation**: jsPDF + jspdf-autotable
- **Authentication**: Firebase (Google OAuth)

### Backend
- **Runtime**: Node.js + Express
- **Database**: MongoDB + Mongoose (with custom Atlas SRV DNS fallback)
- **AI Intelligence**: OpenRouter / Google Gemini API
- **Payments**: Razorpay SDK
- **Security**: JWT & Cookie-parser

---

## Project Structure

```text
igen.ai/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # UI components (Navbar, Footer, Step1, Step2, Step3, etc.)
│   │   ├── context/        # ThemeContext (Dark/Light mode persistence)
│   │   ├── pages/          # Home, Auth, InterviewPage, History, Pricing
│   │   ├── redux/          # Redux user slice & store
│   │   └── utils/          # Firebase & helper utilities
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── config/             # MongoDB connection & Atlas DNS resolver
│   ├── controllers/        # Auth, Interview, User, Payment controllers
│   ├── models/             # Mongoose schemas (User, Interview)
│   ├── routes/             # Express API routes
│   ├── services/           # AI OpenRouter/Gemini integration
│   └── package.json
└── README.md
```

---

## Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB instance
- A Firebase project for Google Authentication
- An OpenRouter or Google Gemini API Key

---

### 1. Clone the Repository

```bash
git clone https://github.com/developerujjwalraj/igen.ai.git
cd igen.ai
```

---

### 2. Configure Backend (`server/`)

Create a `.env` file inside the `server/` directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_jwt_key
OPENROUTER_API_KEY=your_openrouter_or_gemini_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIENT_URL=http://localhost:5173
```

Install dependencies and start the backend:

```bash
cd server
npm install
npm run dev
```

The server should be running on `http://localhost:8000`.

---

### 3. Configure Frontend (`client/`)

Create a `.env` file inside the `client/` directory:

```env
VITE_SERVER_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Install dependencies and launch Vite:

```bash
cd ../client
npm install
npm run dev
```

Open your browser at **`http://localhost:5173`**.

---

## Helpful Tips & Troubleshooting

- **Microphone Permissions**: Make sure you allow microphone access in your browser when entering the interview room so speech recognition works properly.
- **Windows MongoDB SRV Resolution**: If you ever run into a Windows DNS `querySrv ECONNREFUSED` error when connecting to MongoDB Atlas, the backend includes an automated fallback in `server/config/connectDb.js` that directly routes to your cluster's primary and secondary shards.
- **Theme Preference**: Your chosen theme (Dark / Light) is saved to `localStorage`, so your preference stays intact when reloading.

---

## Contributing

Suggestions and pull requests are welcome! If you have ideas for new interview roles, specialized rubrics, or UI improvements:
1. Fork the project
2. Create a feature branch (`git checkout -b feature/cool-idea`)
3. Commit your changes (`git commit -m "Add some cool idea"`)
4. Push to the branch (`git push origin feature/cool-idea`)
5. Open a Pull Request

---

Made with ❤️ by Ujjwal
