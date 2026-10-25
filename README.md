# WanderWise — Travel-Tech Web Application

Full-stack travel portal featuring personalized trip planning, curated packages, automated day-by-day itineraries, and secure **Razorpay payment gateway** integration.

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- **Node.js**: v18 or newer (verified with Node v24)
- **Web Browser**: Chrome, Edge, or Firefox

### 2. Run Backend & Frontend (One Command)
Open a terminal in `wanderwise-backend` and start the server:
```powershell
cd wanderwise-backend
npm start
```
*(Or use `node server.js`)*

The server will automatically start on **http://localhost:5000** and serve the frontend at the root:
- **Application URL**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 3. VS Code 1-Click Launch (F5)
Press **F5** in VS Code to run:
- **Start WanderWise Backend (Port 5000)**: Launches the Express backend with debugger attached.
- **Launch Chrome against WanderWise (localhost:5000)**: Opens Chrome with live debugging.
- **Full Stack (Backend + Chrome)**: Launches both simultaneously.

---

## 💳 Razorpay Payment Gateway Integration

WanderWise features a fully functional Razorpay payment checkout workflow:

1. **Order Creation (`POST /api/payment/create-order`)**:
   - Computes amount in paise.
   - If Razorpay live/test credentials are configured in `.env`, creates an official Razorpay order.
   - If keys are not yet configured, automatically provides a safe standard test checkout key (`rzp_test_1DP5mmOlF5G5ag`) so you can test cards, UPI, and wallets locally without errors.

2. **Client Checkout Modal**:
   - Razorpay standard checkout overlay (`https://checkout.razorpay.com/v1/checkout.js`) opens directly when clicking **⚡ Book Now** on any package or itinerary.
   - Seamlessly accepts test UPI IDs and standard test credit/debit cards.

3. **HMAC Signature Verification (`POST /api/payment/verify-payment`)**:
   - Verifies the payment signature using SHA-256 HMAC when `RAZORPAY_KEY_SECRET` is set.
   - Saves confirmed bookings to MongoDB when a database connection is active.
   - Confirms booking in the user interface and registers it under **My bookings** (`#bookings`).

---

## ⚙️ Environment Configuration (`wanderwise-backend/.env`)

Configure your keys in `wanderwise-backend/.env`:
```env
PORT=5000
RAZORPAY_KEY_ID=your_actual_razorpay_key_id
RAZORPAY_KEY_SECRET=your_actual_razorpay_secret
MONGO_URI=your_mongodb_connection_string
```
- **Razorpay Keys**: Obtain from your [Razorpay Dashboard](https://dashboard.razorpay.com/#/access/api_keys) under *Settings → API Keys*.
- **MongoDB URI**: Set your MongoDB connection string (e.g. MongoDB Atlas or `mongodb://localhost:27017/wanderwise`). If omitted or left as placeholder, the app gracefully operates in memory/demo mode without timeout delays.

---

## 📁 Project Architecture

```text
WanderWise/
├── .vscode/
│   └── launch.json                # VS Code 1-click debug & run configs
├── index.html                     # Frontend Single-Page App (SPA)
├── README.md                      # Project documentation
└── wanderwise-backend/            # Node.js / Express Backend
    ├── .env                       # Environment configuration
    ├── package.json               # Backend dependencies and scripts
    ├── server.js                  # Main Express server & static middleware
    ├── routes/
    │   └── payment.js             # Razorpay order creation & signature verification
    └── models/
        └── Booking.js             # Mongoose booking schema & model
```

---

## 🌐 Netlify Deployment (Static Prototype)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop) and drag the root project folder.
2. Form leads (`ww-signup`, `ww-plan`, `ww-booking`, `ww-cancel`, `ww-contact`, `ww-newsletter`) are automatically recorded under **Site → Forms**.
