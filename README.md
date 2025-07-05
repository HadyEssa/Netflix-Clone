# Netflix Clone Application
عمليات ال deployment تمت بعد 102 محاوله وكان السبب في ال node js كان اصدار قديم.

This is a Netflix clone application, a full-stack project built with React (Vite) for the frontend and Node.js (Express) for the backend.

**Important Deployment Note:** The deployment process was successfully completed after 102 attempts. A major challenge was an outdated Node.js version which caused significant issues during the deployment phase.

## Project Details

This application aims to replicate key features of the Netflix platform, allowing users to browse content, watch trailers, and manage their profiles.

### Technologies Used

**Frontend:**
*   React (Vite)
*   React Router DOM
*   Axios for API calls
*   React Player for video playback
*   Tailwind CSS for styling
*   Lucide React for icons

**Backend:**
*   Node.js
*   Express.js
*   MongoDB (or a similar NoSQL database, as inferred from the project structure for user data and content)
*   Mongoose (ODM for MongoDB)
*   JWT for authentication

### Features

*   User Authentication (Signup, Login)
*   Browse Movies and TV Shows
*   Watch Trailers (integrated with YouTube)
*   Display detailed information about content
*   Responsive design

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (Node Package Manager)
*   MongoDB instance (local or cloud-based like MongoDB Atlas)

### Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd Netflix-clone
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    # Create a .env file with your environment variables (e.g., MONGODB_URI, JWT_SECRET, PORT)
    npm run dev # Or 'npm start' for production mode
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    # Create a .env file with your environment variables (e.g., VITE_API_BASE_URL=http://localhost:5000)
    npm run dev
    ```

4.  **Run both servers concurrently:**
    For local development, ensure both your backend (e.g., on port 5000 or 8080) and frontend (e.g., on port 5173) are running simultaneously in separate terminal windows.

## Deployment

**Frontend and Backend (Railway):**
*   Deploy both your frontend and backend services to Railway.
*   For the frontend, ensure all static assets (like `video-kids.m4v`, `hero.png`) are correctly referenced in your build process.
*   Set the `VITE_API_BASE_URL` environment variable in your Railway frontend service settings to the **public URL of your deployed backend service**.
*   Retrieve the **public URL** of your deployed backend service from the Railway dashboard (usually in the "Deployments" or "Settings" tab under "Domains" or "Service URL"). This URL is crucial for the frontend to connect to the backend APIs. 