# 🌾 HarvestHub — Farm to Customer Fruit Ordering System

<div align="center">

### 🍎 Fresh Fruits. Direct from Farm. Delivered to Your Door.

## 🌐 Live Demo
[Open HarvestHub](https://harvest-hub-umber.vercel.app)

## 💻 GitHub Repository
[View Source Code](https://github.com/Pragati3677/HarvestHub)

</div>

---

🚩 Problem Statement

To design and implement a MERN-based Fruit Ordering System that connects farmers directly with customers and automates:

- 👤 User registration and login
- 🍎 Fruit browsing and management
- 🛒 Cart and order processing
- 💳 Online payment integration
- 📦 Order tracking and management
- 💬 Feedback and contact handling

This system reduces manual selling efforts, improves accessibility for farmers, and provides customers with a smooth online fruit purchasing experience.
---

📌 Introduction

**HarvestHub is a modern online Fruit Ordering System developed to create a direct connection between farmers and customers. Traditional fruit selling methods often involve middlemen, delayed communication, and limited customer reach.**

This system provides an efficient digital platform for:

- 🍎 Browsing fresh fruits online
- 🛒 Adding products to cart and placing orders
- 💳 Secure online payments using Razorpay
- 📦 Managing customer orders
- 💬 Collecting customer feedback and contact queries

The project is developed using React.js for the frontend, Node.js and Express.js for backend services, MongoDB Atlas for database management, and Razorpay for payment integration.

HarvestHub simplifies fruit purchasing, enhances farmer visibility, and delivers a user-friendly shopping experience.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|---|---|---|
| 🎨 Frontend | React.js, CSS3 | User interface and styling |
| ⚙️ Backend | Node.js, Express.js | Server-side logic and APIs |
| 🗄️ Database | MongoDB Atlas | Data storage and management |
| 💳 Payment | Razorpay | Online payment integration |
| 🔧 Tools | Git, GitHub, VS Code | Development and version control |

---

## 🏗️ System Architecture Diagram

<div align="center">

  ### 🌐 HarvestHub System Architecture
  <img width="611" height="470" alt="Harvesthub 1 drawio" src="https://github.com/user-attachments/assets/cc0b6d27-4694-4223-a4b3-45b37b9ef5ef" />

---
  ### 🛒 Customer Flow Diagram
   <img width="427" height="762" alt="Harvesthub 2 drawio" src="https://github.com/user-attachments/assets/2f1f3fc1-8d3b-4212-bc47-6912500f81c0" />

---
  ### 📊 Admin Management Flow
<img width="571" height="412" alt="Harvesthub 3 drawio" src="https://github.com/user-attachments/assets/4c4122cc-74e1-4ea2-adee-4c3797b24c37" />

---
</div>

## 📸 Website Snapshots

<div align="center">

### 🏠 Home Page
<img width="1600" height="807" alt="image" src="https://github.com/user-attachments/assets/51b5f838-0616-469c-b965-fcddef3a8d2b" />

### 🍎 Fruits Page 
<img width="1910" height="967" alt="image" src="https://github.com/user-attachments/assets/e17ef674-8460-4484-83a5-607a724a7453" />

### 🛒 Cart
<img width="1912" height="969" alt="image" src="https://github.com/user-attachments/assets/14b897c3-7751-4d76-bf71-a960b50a4050" />

### 💳 Checkout & Payment
<img width="1911" height="963" alt="image" src="https://github.com/user-attachments/assets/2c1ccb95-9b66-49d3-9738-f4686b62c79f" />
<img width="1904" height="968" alt="image" src="https://github.com/user-attachments/assets/8f79c0be-fde7-4022-b415-f94106103918" />

### 📊 Admin Dashboard
<img width="1919" height="975" alt="image" src="https://github.com/user-attachments/assets/08942686-d198-4375-930e-34c96b3c73e4" />

### 📋 Admin Orders
<img width="1907" height="962" alt="image" src="https://github.com/user-attachments/assets/98847c94-241e-4fa1-8edf-805f664b21b7" />

### 📜 Customer Order History
<img width="1906" height="959" alt="image" src="https://github.com/user-attachments/assets/f79a6516-7e7a-4474-b6ec-441928fe831e" />

### 🎉 Order Placed Successfully
<img width="1919" height="964" alt="image" src="https://github.com/user-attachments/assets/e344f428-f72c-4d68-85c0-53f93eb0b824" />

</div>

---

## ✨ Key Features

### 🛒 Customer Module

| Feature | Description |
|--------|-------------|
| 🔐 Auth System | Register, Login, Logout with session management |
| 🍎 Fruit Catalog | Browse fresh fruits with real farm images |
| 🔍 Search & Filter | Search by name, sort by price, filter by max price |
| 🛒 Smart Cart | Add/remove fruits with quantity controls |
| 💳 Checkout | Delivery address, phone, payment method selection |
| 📦 Order Placement | COD and Razorpay online payment |
| 📜 Order History | View all past orders with status tracking |
| 🔒 Protected Routes | Fruits page accessible only after login |

### 🔐 Admin Module

| Feature | Description |
|--------|-------------|
| 📊 Analytics Dashboard | Real-time charts — orders, revenue, top fruits |
| ➕ Add Fruit | Add new fruits with image URL, price, description |
| ✏️ Edit Fruit | Update any fruit details with live preview |
| 🗑️ Delete Fruit | Remove fruits from catalog instantly |
| 📋 Order Management | View all orders, filter by status |
| ✅ Delivery Management | Mark orders as Delivered / Pending |

### 💳 Payment Gateway

| Method | Support |
|--------|---------|
| 📱 UPI | PhonePe, Google Pay, Paytm, BHIM |
| 💳 Cards | Debit & Credit Cards |
| 🏦 Net Banking | All major banks |
| 👛 Wallets | Paytm, Mobikwik and more |
| 💵 COD | Cash on Delivery |

---

## 📊 Key Achievements & Impact

| Metric | Achievement |
|--------|------------|
| 🧑‍🌾 Farmer Benefit | Eliminates middlemen — farmers earn direct revenue |
| 🚀 Order Flow | Complete order lifecycle from cart to delivery tracking |
| 💰 Payment | Real Razorpay integration with multiple payment modes |
| 📊 Analytics | Live dashboard with Chart.js for business insights |
| 🔐 Security | Route protection, session management, env-based secrets |
| 📱 Responsive | Mobile-friendly UI across all pages |

---

## 🗂️ Project Structure

```
HarvestHub/
├── 📁 backend/
│   ├── 📁 models/
│   │   ├── Fruit.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── 📁 routes/
│   │   ├── fruitRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   ├── seedFruits.js
│   └── package.json
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   └── Navbar.js
│   │   ├── 📁 pages/
│   │   │   ├── 📁 admin/
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   ├── AdminLogin.js
│   │   │   │   ├── AdminOrders.js
│   │   │   │   ├── AddProduct.js
│   │   │   │   ├── EditProduct.js
│   │   │   │   └── ViewProduct.js
│   │   │   ├── Home.js
│   │   │   ├── FruitList.js
│   │   │   ├── Checkout.js
│   │   │   ├── OrderHistory.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   └── Feedback.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Razorpay account

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Pragati3677/HarvestHub.git
cd HarvestHub
```

**2. Setup Backend**
```bash
cd backend
npm install
```

**3. Setup Frontend**
```bash
cd frontend
npm install
```

**4. Create Environment Files**

`backend/.env`
```env
MONGO_URI=mongodb+srv://your_connection_string
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
PORT=5000
```

`frontend/.env`
```env
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```
**5. Add Fruits to Database**

Option A — Use Admin Panel (Recommended):
- Login at /admin/login
- Go to Add Fruit and add fruits manually

Option B — Use Seed Script:
cd backend
node seedFruits.js
⚠️ Warning: This will delete existing fruits!

**6. Run the Application**

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

**7. Access the App**
```
🌐 Frontend:  http://localhost:3000
⚙️ Backend:   https://harvesthub-backend-xh5u.onrender.com

👤 User:  Register at /register
🔐 Admin: admin@farmer.com / admin123
```

---

## 🎯 Use Cases

- 🧑‍🌾 **Farmers** — Sell directly to customers without middlemen
- 👨‍👩‍👧 **Customers** — Get fresh organic fruits delivered at farm prices
- 🏪 **Farm Owners** — Manage inventory, track orders and revenue
- 🎓 **Students** — Reference project for full-stack MERN development

---

## 👩‍💻 Author

**Pragati Shendage** 🌱

`Full Stack Developer`

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Pragati3677)

---

<div align="center">

🌾 Empowering Farmers Through Technology 🚜💚

**🍎 Fresh • 🌿 Organic • 🚚 Direct from Farm**

</div>
