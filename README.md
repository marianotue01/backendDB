# 🌐 CV-MARIANO

Proyecto personal para mostrar mi **Currículum Vitae** en formato web interactivo, con un diseño minimalista y funcionalidades de chatbot con IA.

## 🚀 Tecnologías utilizadas

- **React + Vite** – Frontend
- **Tailwind CSS** – Estilos
- **Node.js + Express** – Backend (API)
- **OpenRouter** – Integración con modelo de IA
- **Vercel** – Hosting / despliegue

## 📂 Estructura del proyecto
cv-mariano/
│
├─ package.json
├─ .env.local                  # Aquí tu OPENROUTER_API_KEY
├─ public/
│  ├─ sombreronegro.jpg
│  ├─ sombreromarron.jpg
│  ├─ sombreroazul.jpg
│  └─ welcome.mp3
│
├─ src/
│  ├─ index.js                 # Punto de entrada principal (ReactDOM.render)
│  ├─ App.jsx                  # Rutas y layout principal
│  │
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ Hats.jsx
│  │  └─ Amplitude.jsx
│  │
│  ├─ components/
│  │  ├─ ChatBot.jsx
│  │  ├─ CvSummary.jsx
│  │  ├─ AudioPresentation.jsx
│  │  ├─ ExperienceTimeline.jsx
│  │  └─ Section.jsx
│  │
│  ├─ data/
│  │  ├─ data.js
│  │  └─ ChatPrompt.js        # generateSystemPrompt
│
└─ api/
   └─ chat.js                  # backend serverless

## ⚡ Instalación y ejecución local
```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/cv-mariano.git

# Entrar en la carpeta
cd cv-mariano

# Instalar dependencias
npm install

# Levantar servidor local
npm start

🎨 Características
Página principal con información profesional
Línea de tiempo de experiencias laborales
ChatBot con IA entrenado con mi experiencia
Diseño claro y minimalista

🌍 Deploy
Este proyecto está desplegado en Vercel:
👉 cv-mariano.vercel.app