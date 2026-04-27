# Vaultix - Banking Ledger System

Vaultix is a backend-focused banking transaction system built using Node.js and MongoDB. It simulates real-world financial operations such as secure money transfers, account management, and transaction tracking with a focus on backend architecture, data consistency, and security.

---

## Features

### Authentication & Security

* User Registration & Login (JWT-based authentication)
* Password hashing using bcrypt
* Secure cookie handling
* Logout with token blacklisting

### Email Integration

* Automated email notifications using Nodemailer
* Registration confirmation emails
* Transaction-related alerts

### Account Management

* Create and manage user accounts
* Fetch account balance
* Check account status

### Transactions System

* Money transfer between accounts
* Transaction creation with pending state
* Transaction history tracking

### Ledger System (Advanced)

* Dedicated Ledger model for tracking all balance changes
* Balance derived using aggregation pipeline
* Designed to mimic real-world banking systems

### Idempotency Handling

* Prevents duplicate transactions
* Ensures safe retries of financial operations

---

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (Authentication)
* Bcrypt
* Nodemailer
* Cookie-parser
* Dotenv

---

## Project Structure

```
Vaultix/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
│
├── .env
├── package.json
└── README.md
```

---

## Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/CodeWithAks/Vaultix
cd Vaultix/backend
```

### 2. Install Dependencies

```
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 4. Run Server

```
npm start
```

---

## API Overview

### Auth

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/logout

### Account

* POST /api/account/create
* GET /api/account/balance
* GET /api/account/status

### Transactions

* POST /api/transactions/transfer
* GET /api/transactions/history

---

## Project Status

Actively under development

### Completed

* Authentication system (JWT + bcrypt)
* User and Account models
* Initial transaction and ledger structure
* Email integration setup

### In Progress

* Transaction flow completion
* Balance calculation using ledger
* Idempotency handling

### Planned

* React frontend dashboard
* UI for account and transaction management
* Additional security improvements

---

## Key Highlights

* Real-world inspired banking logic using ledger system
* Focus on backend architecture and data consistency
* Implementation of idempotency for safe transactions
* Scalable and modular project structure

---

## Author

Akshara Goyal
