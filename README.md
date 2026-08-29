# SenseIT 👁️🎙️

> **See. Understand. Interact.**

SenseIT is an assistive web application designed to help users understand and interact with their surroundings through **camera-based visual analysis and voice interaction**.

The project combines a **React + TypeScript frontend** with a **Node.js + Express backend** to provide visual analysis, voice interaction, text-to-speech narration, and real-time backend status monitoring.

---

## ✨ Features

- 📷 **Camera-Based Visual Input**
  - Uses the browser camera to capture the user's surroundings.

- 👁️ **Visual Scene Analysis**
  - Sends captured visual information to the backend for analysis.

- 🎙️ **Voice Interaction**
  - Supports voice-based commands and interaction.

- 🔊 **Voice Narration**
  - Converts responses into spoken audio using browser speech capabilities.

- ⚡ **Modern Frontend**
  - Built using React, TypeScript, and Vite.

- 🔌 **Backend API**
  - Node.js and Express backend for application services.

- ❤️ **Backend Health Monitoring**
  - Checks whether the backend service is online and available.

- 🔐 **GitHub Authentication**
  - Supports GitHub-based authentication.

---

# 🖥️ Application Workflow

```text
                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
                  ┌────────┴────────┐
                  │                 │
              📷 Camera          🎙️ Voice
                  │                 │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ React Frontend  │
                  │    :5173        │
                  └────────┬────────┘
                           │
                       API Calls
                           │
                           ▼
                  ┌─────────────────┐
                  │ Node.js Backend │
                  │    :3001        │
                  └────────┬────────┘
                           │
                    Visual Analysis
                           │
                           ▼
                  ┌─────────────────┐
                  │    Response     │
                  └────────┬────────┘
                           │
                           ▼
                     🔊 Narration
🏗️ Project Structure
SenseIT/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Logo.tsx
│   │   │   └── Toggle.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useCamera.ts
│   │   │
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── detectionService.ts
│   │   │   └── ttsService.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   │
│   ├── package.json
│   ├── index.html
│   └── vite.config.ts
│
├── test-page.html
├── README.md
├── package.json
└── ...
🛠️ Technologies Used
Frontend
React
TypeScript
Vite
CSS
Backend
Node.js
Express
JavaScript
Browser APIs
MediaDevices / Camera API
Speech Recognition API
Speech Synthesis API
Development Tools
Git
GitHub
Visual Studio Code
npm
🚀 Getting Started
Prerequisites

Make sure the following are installed:

Node.js
npm
Git
1. Clone the Repository
git clone https://github.com/datlaroshini2025-bit/SenseIT.git
cd SenseIT
🔌 Backend Setup

The backend runs on port 3001.

From the project root:

npm install
npm start

The backend should start at:

http://localhost:3001

A successful startup should indicate that the backend is running on port 3001.

Backend Health Check

To verify that the backend is running, open:

http://localhost:3001/health

A successful response should look like:

{
  "status": "ok"
}

If the response is received successfully, the backend is online.

⚡ Frontend Setup

Open a second terminal.

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the Vite development server:

npm run dev

The frontend will normally be available at:

http://localhost:5173

Open the address in your browser.

⚙️ Environment Variables

The frontend connects to the backend using:

VITE_API_URL

Create the following file:

frontend/.env

Add:

VITE_API_URL=http://localhost:3001

⚠️ Important: Never commit private API keys, passwords, tokens, or other secrets to GitHub.

📷 Camera Permissions

SenseIT requires access to the browser camera.

When the browser asks for camera permission:

Select Allow.

If the camera does not start:

Open browser site permissions.
Find localhost:5173.
Make sure camera access is allowed.
Reload the application.
Start the camera again.
🎙️ Voice Interaction

SenseIT uses browser voice capabilities for voice interaction and narration.

Depending on the browser, microphone permission may be required.

Make sure:

Your microphone is connected.
Microphone permissions are enabled.
The browser supports the required Speech APIs.
🧪 Test Page

A separate standalone test page is included in the repository.

👉 Open the SenseIT Test Page

The test page is located at the root of the repository:

SenseIT/
│
├── frontend/
├── test-page.html
└── README.md

The test page is kept separate from the main React frontend and can be used for testing and demonstration.

🔌 API

The frontend communicates with the backend through REST API endpoints.

Health Check
GET /health

Used to verify that the backend is online.

Response
{
  "status": "ok"
}
Visual Analysis
POST /analyze

Used by the frontend to send visual analysis requests to the backend.

🔄 Application Flow
Camera / Voice Input
        ↓
React Frontend
        ↓
API Request
        ↓
Node.js + Express Backend
        ↓
Visual Analysis
        ↓
Response
        ↓
Voice Narration
📌 Current Status

🚧 Active Development

SenseIT is currently under development.

Current development areas include:

Camera interaction
Visual analysis
Voice commands
Text-to-speech narration
Frontend UI/UX
Backend API integration
Authentication
Accessibility improvements
Error and backend status handling
🔮 Future Improvements

Planned or potential improvements include:

🧠 Advanced scene understanding
🎯 Improved object detection
🗣️ More natural conversational interaction
⚡ Faster visual analysis
📱 Improved mobile support
♿ Additional accessibility features
🗺️ Location-aware assistance
🔔 Improved system notifications
🌐 Deployment for public access
🧑‍💻 Development

