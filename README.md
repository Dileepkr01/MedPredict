# 🏥 MedPredict – Predictive Analysis for Hospital Resource Management System

MedPredict is a full-stack MERN application integrated with Machine Learning to manage hospital resources and predict future patient load. It helps hospitals efficiently manage patients, doctors, appointments, and beds while enabling proactive decision-making using AI.

---

## 🚀 Live Demo

* 🌐 Frontend: https://medpredict.vercel.app
* ⚙️ Backend: https://medpredict-snyb.onrender.com

---

## 📌 Features

* 🔐 Role-based Authentication (Admin, Doctor, Reception)
* 🧑‍🤝‍🧑 Patient Management
* 👨‍⚕️ Doctor Management
* 📅 Appointment Scheduling
* 🛏️ Bed Management
* 📊 Dashboard Analytics
* 🤖 AI-based Patient Load Prediction

---

## 🧠 Machine Learning Module

* Uses **Linear Regression**
* Built with Python and Scikit-learn
* Predicts future patient count based on historical data

**Example Output:**

```
Predicted Patients: 75
Moderate Load Expected
```

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### AI/ML

* Python
* Scikit-learn
* Pandas

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## ⚙️ Project Structure

```
MedPredict/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── ml/
│   └── model.py
│
└── README.md
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/Dileepkr01/MedPredict.git
cd MedPredict
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

### 4️⃣ ML Setup

```
pip install pandas scikit-learn
python ml/model.py
```

---

## 🔄 API Example

```
GET /api/predictions/ml
Authorization: Bearer TOKEN
```

---

## 📊 System Workflow

User → React Frontend → Node.js Backend → MongoDB
↓
Python ML
↓
Prediction Output

---

## 🔐 Security

* JWT Authentication
* Role-based Authorization
* Password hashing using bcrypt

---

## 🚧 Challenges Faced

* Integrating Python ML with Node.js backend
* Handling deployment of ML model
* Managing role-based access control

---

## 🔮 Future Enhancements

* Advanced ML models
* Real-time prediction using database
* ICU and emergency prediction
* Mobile application

---

## 👨‍💻 Author

Dileep Kumar

---

## 📢 Conclusion

MedPredict demonstrates how Machine Learning can be integrated into real-world applications to improve efficiency and decision-making in healthcare systems.

---

⭐ If you like this project, give it a star on GitHub!
