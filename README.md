# 🚀 MERN Full-Stack Course Management & AI Recommendation System

---

## 📌 Overview

This project is a full-stack MERN application that allows admins to:

- Manage course data  
- Upload CSV files  
- Perform search with caching  
- Get AI-based course recommendations  

---

## 🎯 Key Features

- 🔐 Authentication (JWT)
- 📂 CSV Data Handling
- ⚡ Backend & Frontend Caching
- 🔗 API Integration
- 🤖 AI Recommendation (Gemini - Mocked)

---

## 🛠️ Tech Stack

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Redis (Caching)

### 🔹 Frontend
- Next.js
- React
- Tailwind CSS

### 🔹 Tools
- Postman (API Testing)
- MongoDB Compass

---

## 🔐 Authentication (Admin Only)

- Admin Signup & Login  
- Password hashing using **bcrypt**  
- JWT-based authentication  
- Protected routes  

---

## 🤖 AI Course Recommendation (Gemini - Mocked)

- Endpoint: `/api/recommendations`
- Accepts user input (topic, level)
- Returns course suggestions  

> ⚠️ Gemini API is mocked due to API restrictions

---

## 📚 Course Management

### 📥 CSV Upload

- Upload course data via CSV  
- Parse using `csv-parser`  
- Store in MongoDB  

---

### 🔍 Search Functionality

- Endpoint: `/api/courses?search=keyword`  
- Case-insensitive search using regex  

---

### ⚡ Backend Caching (Redis)

- Cache frequently searched data  
- First request → database  
- Second request → cache  

#### Example:

```json
{
  "source": "database"
}

    Installation & Setup
🔧 Backend
cd backend
npm install
node server.js
💻 Frontend
cd frontend
npm install
npm run dev
❌ Limitations
🐳 Docker

Not implemented due to system memory constraints.

🔴 Redis Cloud

Redis implemented locally only.

💡 Future Improvements
Deploy Redis using cloud (Upstash)
Add pagination
Improve search filters
Use React Query for cachi