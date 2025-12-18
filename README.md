# GardenGuru 🌿

GardenGuru is a comprehensive web application designed for plant enthusiasts to manage their personal gardens, track plant care, receive AI-powered gardening advice, and connect with a community of like-minded gardeners.

Built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and integrated with **Google Gemini AI**.

---

## 🚀 Features

-   **🌱 Smart Garden Management**: Add plants to your personal dashboard and track their specific needs (Water, Sunlight, Fertilizer).
-   **🤖 AI Gardener**: A built-in chatbot powered by **Google Gemini AI** to answer all your gardening queries instantly.
-   **📊 Analytics Dashboard**: Visual charts using `Recharts` to monitor your garden's diversity and care stats.
-   **🔔 Care Reminders**: Set and manage reminders for watering, pruning, and fertilizing.
-   **👥 Community Feed**: Share updates, photos, and tips with other gardeners.
-   **🛡️ Admin Panel**: specialized dashboard for administrators to manage the master plant database and alerts.
-   **🔐 Secure Authentication**: Full Login/Register system using JWT (JSON Web Tokens).

---

## 🛠️ Technology Stack

### **Frontend**
-   **React.js (Vite)**: Fast and modern UI library.
-   **React Router DOM**: For seamless page navigation.
-   **Axios**: For handling HTTP requests to the backend.
-   **Recharts**: For data visualization and graphs.
-   **React Icons**: For beautiful UI iconography.
-   **CSS3**: Custom glassmorphism and responsive design.

### **Backend**
-   **Node.js & Express.js**: Robust REST API architecture.
-   **MongoDB & Mongoose**: NoSQL database for flexible data modeling.
-   **Google Generative AI (Gemini)**: For the intelligent chatbot feature.
-   **JWT (JSON Web Tokens)**: For secure user authentication.
-   **Bcrypt.js**: For password hashing and security.
-   **Multer**: For handling file uploads (images).

---

## ⚙️ Usage & Installation Guide

Follow these steps to set up the project locally on your machine.

### **1. Prerequisites**
Make sure you have the following installed:
-   [Node.js](https://nodejs.org/) (v16+)
-   [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)

### **2. Cloning the Repository**
```bash
git clone https://github.com/yourusername/GardenGuru.git
cd GardenGuru
```

### **3. Backend Setup**
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

**Environment Variables (.env)**
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

**Seed the Database (Optional)**
Populate the database with sample users and plants:
```bash
npm run seed
```

**Start the Server**
```bash
npm start
# Server runs on http://localhost:5001
```

### **4. Frontend Setup**
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```

**Start the React App**
```bash
npm run dev
# App runs on http://localhost:5173 (or similar)
```

---

## 📂 Project Structure

```bash
GardenGuru/
│
├── backend/            # Node.js API
│   ├── config/         # DB connection
│   ├── controllers/    # Request logic
│   ├── models/         # Mongoose Schemas (User, Plant, CareLog)
│   ├── routes/         # API Routes
│   ├── middleware/     # Auth checks
│   ├── server.js       # Entry point
│   └── seed.js         # Data seeder
│
└── frontend/           # React Client
    ├── src/
    │   ├── components/ # Reusable UI components (Navbar, Chatbot)
    │   ├── pages/      # Full pages (Dashboard, Login, Plants)
    │   └── App.jsx     # Main Routing
    └── vite.config.js  # Vite configurations
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
