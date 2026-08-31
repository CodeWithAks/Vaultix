# Vaultix — Banking Ledger System

Vaultix is a backend-focused banking transaction system built with Node.js, Express.js, MongoDB, and Mongoose. It simulates core banking operations such as account management, secure money transfers, transaction tracking, and ledger-based balance calculation.

The project focuses on real-world backend concepts including JWT authentication, data consistency, transaction integrity, idempotency, and auditability.

---

##  Overview

Financial systems require more than simply moving a number from one account to another.

A reliable transaction system needs to consider:

* Authentication and authorization
* Secure password storage
* Reliable money transfers
* Transaction states
* Duplicate request prevention
* Accurate balance calculation
* Transaction history
* Auditability of balance changes
* Failure and retry scenarios

Vaultix is built as a learning project around these backend engineering concepts.

The goal is to build a system that goes beyond basic CRUD operations and explores how a **transaction-oriented backend** can be structured.

---

##  Features

###  Authentication & Security

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Secure cookie handling
* Logout functionality
* Token blacklisting
* Protected API routes

---

###  Account Management

* Create banking accounts
* Associate accounts with users
* Fetch account information
* Check account status
* Retrieve account balance
* Account-based transaction operations

---

###  Money Transfers

Vaultix supports the core concept of transferring money between accounts.

A transfer is designed around a transaction lifecycle rather than simply updating two balances.

Example flow:

```text
Transfer Request
      │
      ▼
Authenticate User
      │
      ▼
Validate Request
      │
      ▼
Validate Source Account
      │
      ▼
Validate Destination Account
      │
      ▼
Check Available Balance
      │
      ▼
Create Transaction
      │
      ▼
Create Ledger Entries
      │
      ▼
Update Transaction State
      │
      ▼
Send Notification
```

---

###  Ledger System

One of the main architectural concepts behind Vaultix is the **ledger**.

Instead of treating the account balance as the only source of truth, the ledger records balance-changing events.

Conceptually:

```text
Account
   │
   ├── Ledger Entry: +₹10,000
   ├── Ledger Entry: -₹2,000
   ├── Ledger Entry: -₹500
   └── Ledger Entry: +₹1,500
                │
                ▼
        Current Balance
```

The balance can then be calculated using MongoDB aggregation.

This approach makes it possible to maintain a history of balance changes and provides a foundation for building more auditable financial operations.

---

###  Transaction States

Transactions are designed to move through defined states.

Example:

```text
PENDING
   │
   ├──► COMPLETED
   │
   └──► FAILED
```

This provides a foundation for handling successful transfers, failures, retries, and transaction history.

---

###  Idempotency

Financial APIs must be able to safely handle repeated requests.

For example, imagine a client sends:

```http
POST /api/transactions/transfer
```

and the network times out.

The client may retry the same request.

Without idempotency, the same transfer could potentially be processed more than once.

Vaultix is being designed to support **idempotent transaction requests**, allowing the system to recognize duplicate operations and prevent accidental duplicate transfers.

Conceptually:

```text
Client
  │
  │ Transfer + Idempotency Key
  ▼
Vaultix
  │
  ├── First request ──► Process transaction
  │
  └── Duplicate request ──► Return existing transaction
```

---

###  Email Notifications

Vaultix integrates **Nodemailer** for transactional email communication.

Current/planned notifications include:

* Registration confirmation
* Transaction notifications
* Transfer-related alerts

---

##  Architecture

Vaultix follows a modular backend structure:

```text
                    ┌──────────────────┐
                    │      Client      │
                    │ React / Postman  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Express API    │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐   ┌───────────┐  ┌───────────┐
        │   Auth   │   │  Account  │  │Transaction│
        │Controller│   │Controller │  │ Controller│
        └────┬─────┘   └─────┬─────┘  └─────┬─────┘
             │               │              │
             └───────────────┼──────────────┘
                             ▼
                    ┌──────────────────┐
                    │     Mongoose     │
                    │      Models      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   MongoDB Atlas  │
                    └──────────────────┘
```

---

##  Project Structure

```text
Vaultix/
│
├── backend/
│   │
│   ├── config/
│   │   └── Database configuration
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── account.controller.js
│   │   └── transaction.controller.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Account.js
│   │   ├── Transaction.js
│   │   └── Ledger.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── account.routes.js
│   │   └── transaction.routes.js
│   │
│   ├── middleware/
│   │   └── Authentication / authorization middleware
│   │
│   ├── utils/
│   │   ├── Email utilities
│   │   └── Other backend utilities
│   │
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

> The structure may evolve as the project continues to be developed.

---

##  Core Data Models

Vaultix is centered around four major entities.

### User

Represents an authenticated application user.

```text
User
 ├── name
 ├── email
 ├── password
 └── authentication-related data
```

Passwords are never intended to be stored in plain text and are hashed using bcrypt.

---

### Account

Represents a user's banking account.

```text
Account
 ├── user
 ├── account information
 └── status
```

An account can have multiple transactions and ledger entries associated with it.

---

### Transaction

Represents a transfer operation.

```text
Transaction
 ├── sender
 ├── receiver
 ├── amount
 ├── status
 └── idempotency information
```

Transactions provide a higher-level representation of financial operations.

---

### Ledger

Represents individual balance-changing entries.

```text
Ledger
 ├── account
 ├── amount
 ├── transaction
 └── entry information
```

The ledger provides the foundation for deriving an account's balance and maintaining a history of balance changes.

---

##  Transaction & Ledger Relationship

A simplified transfer can be represented as:

```text
User A
  │
  │ Transfer ₹1,000
  ▼
Transaction
  │
  ├───────────────┐
  ▼               ▼
Ledger Entry   Ledger Entry
  -₹1,000         +₹1,000
  │               │
  ▼               ▼
Account A       Account B
```

This separation allows the transaction to describe **what happened**, while ledger entries describe **how the accounts' balances changed**.

---

##  API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login`    | Authenticate user   |
| `POST` | `/api/auth/logout`   | Logout user         |

---

### Account

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| `POST` | `/api/account/create`  | Create an account   |
| `GET`  | `/api/account/balance` | Get account balance |
| `GET`  | `/api/account/status`  | Get account status  |

---

### Transactions

| Method | Endpoint                     | Description                  |
| ------ | ---------------------------- | ---------------------------- |
| `POST` | `/api/transactions/transfer` | Transfer money               |
| `GET`  | `/api/transactions/history`  | Retrieve transaction history |

> API endpoints may change as the backend architecture evolves.

---

## 🛠️ Tech Stack

### Backend

* **Node.js** — JavaScript runtime
* **Express.js** — REST API framework
* **Mongoose** — MongoDB object modeling
* **MongoDB Atlas** — Database
* **JWT** — Authentication
* **bcrypt** — Password hashing
* **Nodemailer** — Email notifications
* **cookie-parser** — Cookie handling
* **dotenv** — Environment variable management

### Development & Testing

* **Git & GitHub**
* **Postman**
* **MongoDB Atlas**

### Planned Frontend

* React
* Vite
* Tailwind CSS

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB Atlas account
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/CodeWithAks/Vaultix.git
```

Navigate into the backend:

```bash
cd Vaultix/backend
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### Environment Variables

| Variable     | Description                           |
| ------------ | ------------------------------------- |
| `PORT`       | Port on which the backend server runs |
| `MONGO_URI`  | MongoDB Atlas connection string       |
| `JWT_SECRET` | Secret used for JWT signing           |
| `EMAIL_USER` | Email account used by Nodemailer      |
| `EMAIL_PASS` | Email authentication credential       |

**Never commit your `.env` file or expose your secrets publicly.**

---

### 4. Start the Server

```bash
npm start
```

The API should start on:

```text
http://localhost:5000
```

---

## 🧪 API Testing

The backend can be tested using tools such as **Postman**.

A typical workflow is:

```text
1. Register User
       ↓
2. Login
       ↓
3. Authenticate Request
       ↓
4. Create Account
       ↓
5. Check Balance
       ↓
6. Transfer Money
       ↓
7. Check Transaction History
       ↓
8. Verify Ledger Entries
```

---

##  Security Considerations

Vaultix focuses on several security-related backend concepts:

### Password Security

Passwords are hashed using **bcrypt** rather than being stored directly.

### JWT Authentication

Protected endpoints require authentication through JWT-based sessions.

### Cookie Handling

Authentication tokens can be handled through secure cookies.

### Token Blacklisting

Logout functionality includes token invalidation through blacklisting.

### Idempotent Transactions

Transaction requests are designed to support idempotency so that retries do not unintentionally create duplicate transfers.

### Environment Secrets

Sensitive configuration such as database credentials, JWT secrets, and email credentials are kept in environment variables.

---

##  Engineering Concepts Explored

Vaultix is primarily a project for exploring backend engineering concepts that appear in real-world financial systems.

### 1. Ledger-Based Accounting

Instead of relying exclusively on a mutable balance field, balance changes can be represented as ledger entries.

### 2. Data Consistency

Money transfers involve multiple pieces of state that need to remain consistent.

### 3. Transaction Lifecycle

Transfers are represented as transactions with states such as:

```text
PENDING → COMPLETED
       ↘
        FAILED
```

### 4. Idempotency

Repeated requests should not accidentally execute the same financial operation multiple times.

### 5. Auditability

Ledger entries provide a history of balance-changing events.

### 6. Separation of Concerns

Controllers, models, routes, middleware, configuration, and utilities are separated to keep the backend maintainable.

---

## 🗺️ Roadmap

Vaultix is actively being developed.

### Backend

* [x] User authentication
* [x] JWT authentication
* [x] Password hashing
* [x] User model
* [x] Account model
* [x] Initial transaction model
* [x] Initial ledger structure
* [x] Email integration setup
* [ ] Complete transaction processing flow
* [ ] Complete ledger-based balance calculation
* [ ] Complete idempotency implementation
* [ ] Strengthen transaction validation
* [ ] Improve error handling
* [ ] Add comprehensive API validation
* [ ] Add automated backend tests
* [ ] Improve transaction failure/retry handling
* [ ] Add better audit logging

### Frontend

* [ ] React dashboard
* [ ] Authentication UI
* [ ] Account dashboard
* [ ] Balance overview
* [ ] Money transfer interface
* [ ] Transaction history
* [ ] Account status interface
* [ ] Responsive UI

### Infrastructure & Production Readiness

* [ ] Production deployment
* [ ] API documentation
* [ ] Rate limiting
* [ ] Improved logging and monitoring
* [ ] Security hardening
* [ ] Automated testing pipeline

---

##  Why I Built Vaultix

Vaultix was created to go deeper into backend development beyond conventional CRUD applications.

The project provides an opportunity to explore:

* REST API design
* Authentication and authorization
* MongoDB data modeling
* Financial transaction flows
* Ledger-based architectures
* Idempotency
* Data consistency
* Error handling
* Secure backend development
* Scalable project organization

The long-term goal is to turn Vaultix into a more complete banking simulation while continuing to improve its reliability, security, and architecture.

---

## 📚 What This Project Demonstrates

Vaultix demonstrates practical experience with:

```text
                    Vaultix
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   Authentication   Accounts      Transactions
        │              │              │
        ▼              ▼              ▼
       JWT         Account Model   Transaction Model
       bcrypt           │              │
                        │              ▼
                        │           Idempotency
                        │              │
                        └──────┬───────┘
                               ▼
                           Ledger
                               │
                               ▼
                       Balance Calculation
```

It is intended to demonstrate **backend engineering thinking**, not to represent a production banking platform.

---

##  Contributing

Vaultix is currently a personal learning project, but suggestions, feedback, and discussions are welcome.

If you notice an architectural improvement or have an idea for making the transaction system more reliable, feel free to open an issue or start a discussion.

---

##  Disclaimer

Vaultix is an educational software project and **not a real banking application**.

It should not be used to process real money, store real financial information, or manage actual financial accounts.

---

##  Author

**Akshara Goyal**

---

##  If You Find This Project Interesting

Feel free to explore the repository, follow the development, or share feedback.

More features and improvements are being added as Vaultix evolves.
