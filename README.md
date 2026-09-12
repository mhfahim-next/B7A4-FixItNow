# 🔧 FixItNow

### Your Trusted Home Service Platform

<p align="center">
  <strong>A role-based home service marketplace API built with Node.js, Express, TypeScript, Prisma & PostgreSQL.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-api-documentation">API Documentation</a> •
  <a href="https://github.com/mhfahim-next/B7A4-FixItNow/blob/main/FixitNow.postman_collection.json">Postman Collection</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-database-erd">Database ERD</a>
</p>

---

## 📊 Project Status

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge\&logo=express\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)

---

## 🌐 Live API

> 🚀 **Live API:** Replace the URL below with your deployed API.

**[Open Live API](https://fixitnow-chi-three.vercel.app/)**


### Health Check

```http
GET /api/login
```

Example:

```text
YOUR_LIVE_API_URL/api/login
```

---


## 📖 About The Project

**FixItNow** is a backend API for a home services marketplace.

The platform connects customers with professional technicians who provide services such as:

* 🔧 Plumbing
* ⚡ Electrical
* 🧹 Cleaning
* 🎨 Painting
* 🛠️ Other home services

Customers can browse services, find technicians, create bookings, make payments, track booking status, and leave reviews.

Technicians can create professional profiles, manage services, update availability, and handle customer bookings.

Administrators can manage users, bookings, and service categories.

The project implements **authentication, role-based authorization, database relationships, booking management, payment management, and review functionality**.

---

# ✨ Features

## 🔐 Authentication & Authorization

* User registration
* User login
* JWT authentication
* Role-based authorization
* Protected API routes
* Password hashing with bcrypt
* Authenticated user information
* Customer, Technician and Admin roles

---

## 👤 Customer Features

* Register and login
* Browse available services
* Search and filter services
* Browse technicians
* View technician profiles
* Create service bookings
* Select booking date and time
* Track booking status
* Make payments
* View payment history
* Leave reviews after completed jobs
* Manage profile

---

## 🛠️ Technician Features

* Register as technician
* Create technician profile
* Add skills and experience
* Set hourly rate
* Set location
* Manage availability
* Create and manage services
* View incoming bookings
* Accept bookings
* Decline bookings
* Update booking status
* Complete jobs

---

## 👑 Admin Features

* View all users
* Manage customers and technicians
* Ban/unban users
* View all bookings
* Manage service categories
* Create service categories

---

## 💳 Payment System

FixItNow is designed to support:

* **Stripe**
* **SSLCommerz**

Payment records can contain:

* Transaction ID
* Booking ID
* Amount
* Payment method
* Payment provider
* Payment status
* Payment date

---

## ⭐ Review System

Customers can submit reviews after completing a service.

A review is associated with:

* Customer
* Technician
* Booking
* Rating
* Review/comment

---

# 🧰 Tech Stack

| Technology       | Purpose               |
| ---------------- | --------------------- |
| **Node.js**      | JavaScript runtime    |
| **Express.js**   | Backend framework     |
| **TypeScript**   | Type-safe development |
| **PostgreSQL**   | Relational database   |
| **Prisma ORM**   | Database ORM          |
| **JWT**          | Authentication        |
| **bcrypt**       | Password hashing      |
| **Stripe**       | Payment processing    |
| **SSLCommerz**   | Payment processing    |
| **Postman**      | API testing           |
| **Git & GitHub** | Version control       |

---

# 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │       Client        │
                    │   Web / Mobile App  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Express API     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌──────────┐     ┌───────────┐    ┌────────────┐
        │   Auth   │     │  Business │    │  Payments  │
        │  / JWT   │     │   Logic   │    │Stripe/SSLC │
        └──────────┘     └─────┬─────┘    └────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Prisma ORM      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    └─────────────────────┘
```

---

# 🗄️ Database ERD

The main database entities are:

```text
Users
  │
  ├───────────────┐
  │               │
  ▼               ▼
Customer     TechnicianProfile
  │               │
  │               ├──────── Services
  │               │              │
  │               │              ▼
  │               │         Categories
  │               │
  └────── Bookings ──────────────┘
             │
        ┌────┴─────┐
        │          │
        ▼          ▼
     Payments    Reviews
```

## 📐 Prisma ERD

Add your generated Prisma ERD image to:

```text
docs/
└── erd.png
```

Then display it in this README:

```md
## 📐 Prisma ERD

![FixItNow Database ERD](./docs/erd.png)
```

### Recommended README section

```md
## 📐 Prisma ERD

<p align="center">
  <img src="./docs/erd.png" alt="FixItNow Prisma Database ERD" width="100%">
</p>
```

> GitHub supports displaying images stored inside the repository using relative paths.

---

# 🗃️ Database Models

The system contains the following major entities:

### User

Stores:

* Name
* Email
* Password
* Role
* Account status
* Timestamps

### TechnicianProfile

Stores:

* User relationship
* Bio
* Skills
* Experience
* Hourly rate
* Location
* Average rating
* Availability

### Category

Stores service categories.

Examples:

```text
Plumbing
Electrical
Cleaning
Painting
```

### Service

Stores individual services provided by technicians.

### Booking

Stores customer service requests and booking information.

### Payment

Stores payment transactions associated with bookings.

### Review

Stores customer ratings and reviews for technicians.

---

# 🔄 Booking Status Flow

```text
                  ┌──────────────┐
                  │  REQUESTED   │
                  └──────┬───────┘
                         │
                ┌────────┴────────┐
                │                 │
                ▼                 ▼
        ┌──────────────┐   ┌──────────────┐
        │   ACCEPTED   │   │   DECLINED   │
        └──────┬───────┘   └──────────────┘
               │
               ▼
        ┌──────────────┐
        │     PAID     │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │ IN_PROGRESS  │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │  COMPLETED   │
        └──────────────┘
```

Customers can cancel a booking before it reaches `IN_PROGRESS`.

---

# 🔑 API Documentation

## Authentication

| Method | Endpoint             | Access        | Description      |
| ------ | -------------------- | ------------- | ---------------- |
| `POST` | `/api/auth/register` | Public        | Register user    |
| `POST` | `/api/auth/login`    | Public        | Login user       |
| `GET`  | `/api/auth/me`       | Authenticated | Get current user |

---

## Services & Technicians

| Method | Endpoint               | Access | Description            |
| ------ | ---------------------- | ------ | ---------------------- |
| `GET`  | `/api/services`        | Public | Get services           |
| `GET`  | `/api/technicians`     | Public | Get technicians        |
| `GET`  | `/api/technicians/:id` | Public | Get technician profile |
| `GET`  | `/api/categories`      | Public | Get categories         |

---

## Bookings

| Method | Endpoint            | Access   | Description           |
| ------ | ------------------- | -------- | --------------------- |
| `POST` | `/api/bookings`     | Customer | Create booking        |
| `GET`  | `/api/bookings`     | Customer | Get customer bookings |
| `GET`  | `/api/bookings/:id` | Customer | Get booking details   |

---

## Payments

| Method | Endpoint                | Access   | Description     |
| ------ | ----------------------- | -------- | --------------- |
| `POST` | `/api/payments/create`  | Customer | Create payment  |
| `POST` | `/api/payments/confirm` | Customer | Confirm payment |
| `GET`  | `/api/payments`         | Customer | Payment history |
| `GET`  | `/api/payments/:id`     | Customer | Payment details |

---

## Technician

| Method  | Endpoint                       | Access     | Description           |
| ------- | ------------------------------ | ---------- | --------------------- |
| `PUT`   | `/api/technician/profile`      | Technician | Update profile        |
| `PUT`   | `/api/technician/availability` | Technician | Update availability   |
| `GET`   | `/api/technician/bookings`     | Technician | Get bookings          |
| `PATCH` | `/api/technician/bookings/:id` | Technician | Update booking status |

---

## Reviews

| Method | Endpoint       | Access   | Description   |
| ------ | -------------- | -------- | ------------- |
| `POST` | `/api/reviews` | Customer | Create review |

---

## Admin

| Method  | Endpoint                | Access | Description      |
| ------- | ----------------------- | ------ | ---------------- |
| `GET`   | `/api/admin/users`      | Admin  | Get all users    |
| `PATCH` | `/api/admin/users/:id`  | Admin  | Ban/unban user   |
| `GET`   | `/api/admin/bookings`   | Admin  | Get all bookings |
| `GET`   | `/api/admin/categories` | Admin  | Get categories   |
| `POST`  | `/api/admin/categories` | Admin  | Create category  |

---

# 📮 Postman Documentation

All API endpoints can be tested using Postman.

## Postman Collection

[![Run in Postman](https://img.shields.io/badge/Postman-View%20Collection-FF6C37?style=for-the-badge\&logo=postman\&logoColor=white)](https://github.com/mhfahim-next/B7A4-FixItNow/blob/main/FixitNow.postman_collection.json)

### 📚 API Documentation

👉 **[View Postman API Documentation](https://documenter.getpostman.com/view/57161795/2sBYAyt9FE#9fca049c-abf9-41f8-a398-21757eab91c7)**

The Postman documentation should contain collections for:

```text
FixItNow API
│
├── Authentication
│   ├── Register
│   ├── Login
│   └── Get Current User
│
├── Services
│   ├── Get Services
│   └── Service Details
│
├── Technicians
│   ├── Get Technicians
│   ├── Technician Profile
│   └── Technician Bookings
│
├── Bookings
│   ├── Create Booking
│   ├── Get Bookings
│   └── Update Booking Status
│
├── Payments
│   ├── Create Payment
│   ├── Confirm Payment
│   └── Payment History
│
├── Reviews
│   └── Create Review
│
└── Admin
    ├── Users
    ├── Bookings
    └── Categories
```

---

# 🔐 Authentication

Protected routes require a JWT access token.

Add the token to the request header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Example:

```http
GET /api/technician/bookings
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The authenticated user's identity is taken from the JWT rather than trusting a user ID supplied by the client.

---

# 🛡️ Security

The application follows these security practices:

* 🔐 JWT authentication
* 🔑 bcrypt password hashing
* 👥 Role-based authorization
* 🛡️ Protected routes
* 🔒 Environment variables for secrets
* 🚫 Password excluded from API responses
* 🔗 Foreign-key constraints
* 👤 Authenticated user ownership checks
* ✅ Input validation
* 🚫 `.env` excluded from Git

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

## 2. Enter the project directory

```bash
cd FixItNow
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create environment file

Create:

```text
.env
```

Example:

```env
DATABASE_URL="your_postgresql_database_url"

JWT_ACCESS_SECRET="your_jwt_secret"

STRIPE_SECRET_KEY="your_stripe_secret"

SSLCOMMERZ_STORE_ID="your_store_id"

SSLCOMMERZ_STORE_PASSWORD="your_store_password"
```

## 5. Generate Prisma Client

```bash
npx prisma generate
```

## 6. Run Prisma migration

```bash
npx prisma migrate dev
```

## 7. Start development server

```bash
npm run dev
```

---

# 📂 Project Structure

```text
FixItNow/
│
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── user/
│   │   │   ├── technician/
│   │   │   ├── service/
│   │   │   ├── category/
│   │   │   ├── booking/
│   │   │   ├── payment/
│   │   │   └── review/
│   │   │
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── config/
│   ├── app.ts
│   └── server.ts
│
├── prisma/
│   └── schema.prisma
│
├── docs/
│   └── erd.png
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🧪 Testing Flow

A typical customer booking workflow:

```text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Browse Services
   ↓
Browse Technicians
   ↓
Create Booking
   ↓
Technician Accepts
   ↓
Customer Makes Payment
   ↓
Technician Starts Job
   ↓
Technician Completes Job
   ↓
Customer Leaves Review
```

---

# 👨‍💻 Developer

### Mahmudul Hasan Fahim

**Web Developer | Backend & Full-Stack Development**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge\&logo=github)](YOUR_GITHUB_PROFILE_URL)

---

# 📌 Project Links

| Resource                 | Link                                            |
| ------------------------ | ----------------------------------------------- |
| 🌐 Live API              | [Open API](YOUR_LIVE_API_URL)                   |
| 💻 GitHub Repository     | [View Repository](YOUR_GITHUB_REPOSITORY_URL)   |
| 📮 Postman Documentation | [View API Docs](YOUR_POSTMAN_DOCUMENTATION_URL) |
| 📐 Database ERD          | [View ERD](./docs/erd.png)                      |

---

# 📈 Future Improvements

Possible future improvements include:

* Real-time booking notifications
* Email notifications
* SMS notifications
* Technician location tracking
* Advanced service search
* Technician availability calendar
* Automated payment webhooks
* Admin dashboard
* Analytics and reporting
* Customer favorites
* Technician verification
* Service image uploads

---

# 📄 License

This project was developed for educational and project submission purposes.

---

<p align="center">
  <strong>🔧 FixItNow — Making Home Services Easier</strong>
</p>

<p align="center">
  Built with ❤️ using Node.js, Express, TypeScript, Prisma & PostgreSQL.
</p>
