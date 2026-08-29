# Sense IT Frontend

A React + TypeScript + Vite implementation of the Sense IT voice-first accessibility UI.

## Run

```bash
npm install
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

## Connect the existing backend

Start the existing SenseIT Express backend separately:

```bash
npm start
```

The frontend defaults to `http://localhost:3001`. To change it, create `.env` from `.env.example` and set:

```env
VITE_API_URL=http://localhost:3001
```

## Current pipeline

Camera → JPEG frame → `/analyze` → Gemini description → browser Text-to-Speech.

The UI and service boundaries are prepared for a future real YOLO/ONNX detector. No fake detections are generated.

## Mobile camera

For phone deployment, camera access generally requires HTTPS (localhost is allowed during development).