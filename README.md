# Quiz Dashboard Project - Setup
      1️⃣ Clone the repository
      git clone <your-repo-url>
      cd <repo-folder>

# 2️⃣ Backend Setup

  # [
        Navigate to the backend folder
      
        cd backend
        
        Install backend dependencies:
        
        npm install cors dotenv express jsonwebtoken mongoose nodemon
        
        
        Create a .env file in backend:
        
        DB_url=<your-mongodb-connection-string>
        PORT=5000
      
      
        Start backend server:
        
        nodemon index.js
      
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

[click for Live link](https://studentquizs.netlify.app/)


