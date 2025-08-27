# Quiz Dashboard Project - Setup
  1️⃣ Clone the repository
  git clone <your-repo-url>
  cd <repo-folder>

# 2️⃣ Backend Setup

  # [
        Navigate to the backend folder (if separate):
      
        cd backend
        
        Install backend dependencies:
        
        npm install cors dotenv express jsonwebtoken mongoose nodemon
        
        
        Create a .env file in backend:
        
        MONGO_URI=<your-mongodb-connection-string>
        PORT=5000
      
      
        Start backend server:
        
        npm run dev
      
        Your backend will run at: http://localhost:5000
  # ]

# 3️⃣ Frontend Setup

 # [ Navigate to frontend folder 

      cd frontend
      
      Install frontend dependencies:
      
      npm install @emotion/react @emotion/styled @mui/icons-material @mui/material axios chart.js react react-dom react-chartjs-2 react-router-dom
      
      
      Create a .env file in frontend:
      
      VITE_BASE_URL=http://localhost:5000
      
      
      Start frontend development server:
      
      npm run dev
      
      
      Your frontend will be live at: http://localhost:5173 (Vite default port)
# ]      
      

✅ Optional: To make the frontend accessible on your local network, Vite usually shows a network URL in the terminal like:

http://192.168.x.x:5173



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
