MERN Full-Stack Course Management & AI Recommendation System
📌 Overview

This project is a full-stack MERN application that allows admins to manage course data, upload CSV files, perform search with caching, and get AI-based course recommendations.

It demonstrates:

Authentication (JWT)
CSV data handling
Backend + Frontend caching
API integration
AI recommendation (Gemini - mocked)
🛠️ Tech Stack
Backend
Node.js
Express.js
MongoDB
Redis (for caching)
Frontend
Next.js
React
Tailwind CSS
Tools
Postman (API testing)
MongoDB Compass
🔐 Features
✅ 1. Authentication (Admin Only)
Admin Signup & Login
Password hashing using bcrypt
JWT-based authentication
Protected routes
🤖 2. AI Course Recommendation (Gemini - Mocked)
Endpoint: /api/recommendations
Accepts user input (topic, level)
Returns course suggestions
Gemini API simulated due to API restrictions
📚 3. Course Management
📥 CSV Upload
Upload course data via CSV
Parse using csv-parser
Store in MongoDB
🔍 Search Functionality
Endpoint: /api/courses?search=keyword
Case-insensitive search using regex
⚡ Backend Caching (Redis)
Cache frequently searched data
First request → database
Second request → cache
Example:
{
  "source": "database"
}
{
  "source": "cache"
}
🌐 Frontend Features
🔗 API Integration
Login connected to backend
Course upload integrated
Course listing displayed
AI recommendations shown on separate page
🧠 State Management
Implemented using React useState and localStorage
Lightweight and efficient for this application
⚡ Frontend Caching
Uses localStorage
Stores course data locally
Reduces repeated API calls
🚀 Project Structure
backend/
  ├── controllers/
  ├── routes/
  ├── models/
  ├── middleware/
  ├── utils/
  ├── config/

frontend/
  ├── src/app/
  ├── components/
  ├── pages/
⚙️ Installation & Setup
🔧 Backend
cd backend
npm install
node server.js
💻 Frontend
cd frontend
npm install
npm run dev
🔑 Environment Variables

Create .env in backend:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
REDIS_URL=redis://127.0.0.1:6379
🧪 API Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Register admin
POST	/api/auth/login	Login admin
POST	/api/courses/upload	Upload CSV
GET	/api/courses	Get all courses
GET	/api/courses?search=	Search courses
POST	/api/recommendations	AI recommendations
🧪 Testing
APIs tested using Postman
Verified:
Authentication
CSV Upload
Search functionality
Caching behavior