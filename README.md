# 📦 ShopSphere – Scalable E-Commerce Platform  

**ShopSphere** is a cloud-native e-commerce platform built as part of a research project to explore microservices, containerization, and modern frontend design.  
It’s designed to demonstrate how **authentication**, **catalog management**, and an **interactive UI** can work together in a scalable architecture.  

---

## ✨ Features  
- 🔑 **Authentication Service** (Node.js + Express + PostgreSQL)  
  - User registration & login  
  - Secure password hashing with bcrypt  
  - JWT-based authentication  

- 📦 **Catalog Service** (FastAPI + PostgreSQL)  
  - Product creation & listing  
  - Database persistence with auto-migrations  
  - RESTful API with FastAPI  

- 🎨 **Frontend** (React + Vite + TailwindCSS + Framer Motion)  
  - Responsive product grid with animations  
  - Modern UI with hover effects and transitions  
  - Environment-based API integration  

- 🐳 **Containerization with Docker Compose**  
  - Spin up all services with one command  
  - Isolated dev environment  

---

## 🏗️ Architecture  
\`\`\`
+--------------------+         +--------------------+
|   Frontend (React) | <--->   |   Catalog Service  |
|    Tailwind + FM   |         |   FastAPI + Postgres|
+--------------------+         +--------------------+
          |
          v
+--------------------+
| Auth Service       |
| Node.js + Express  |
| JWT + Postgres     |
+--------------------+
\`\`\`

---

## 🚀 Getting Started  

### 1. Prerequisites  
- Node.js (v18 or higher)  
- Docker & Docker Compose installed  

### 2. Clone the repository  
\`\`\`bash
git clone https://github.com/<your-username>/shopsphere.git
cd shopsphere
\`\`\`

### 3. Start backend services  
\`\`\`bash
docker compose up -d --build
\`\`\`
- Auth Service → http://localhost:4000  
- Catalog Service → http://localhost:5001  

Check health:  
\`\`\`bash
curl http://localhost:4000/health
curl http://localhost:5001/health
\`\`\`

### 4. Run frontend  
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
Frontend runs on → http://localhost:5173  

---

## 🖼️ Screenshots  
*(to be added after UI polish)*  
- Landing page with product grid  
- Login/Register flow  
- API health check in terminal  

---

## 📚 Research Value  
This project demonstrates:  
- Microservices with clear separation of concerns  
- Secure authentication & user management  
- A modern UI stack for real-world applications  
- Docker-based reproducibility for consistent environments  

---

## 🤝 Contributing  
Pull requests and suggestions are welcome!  

---

## 📜 License  
MIT – feel free to use and adapt.  
