# 🚀 Jobby Application

A Full Stack Job Portal Web Application where users can register, login, search jobs with filters, view job details, and explore similar job opportunities.

This project demonstrates authentication, protected routing, REST API integration, dynamic filtering, and full-stack architecture.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- CSS3
- JWT Authentication
- js-cookie
- React Icons

## Backend

- Node.js
- Express.js
- JWT Authentication
- REST APIs
- Environment Variables (.env)
- Protected Route Middleware

---

# 📁 Application Routes

- Register Route
- Login Route
- Home Route
- Jobs Route
- Job Item Details Route
- Not Found Route

---

# 🔐 Authentication Flow

- User can register with valid details
- User can login with registered credentials
- On successful login, JWT token is generated
- JWT token is stored in cookies
- Protected routes verify JWT before granting access
- Unauthenticated users are redirected to Login
- Authenticated users cannot access Login/Register routes
- Logout removes JWT token and redirects to Login
- Logout confirmation popup appears before logging out

---

# 🌐 Frontend Functionalities

## 📝 Register Route

- User can create a new account
- Validates input fields
- On successful registration, user is redirected to Login
- Displays error message if registration fails
- Authenticated users cannot access Register route

---

## 🔑 Login Route

- Displays error message for invalid credentials
- Navigates to Home on valid credentials
- Stores JWT token in cookies
- Redirects authenticated users to Home

---

## 🏠 Home Route

- Accessible only for authenticated users
- Clicking "Find Jobs" navigates to Jobs Route

---

## 💼 Jobs Route

When authenticated user opens Jobs Route:

### Profile API

- HTTP GET request is made to Profile API
- Loader displayed while fetching
- On success → Profile data displayed
- On failure → Failure View displayed
- Retry button re-fetches Profile API

---

### Jobs API

Initial API Call:

https://apis.ccbp.in/jobs?employment_type=&minimum_package=&search=

- Loader displayed while fetching
- On success → Jobs list displayed
- On failure → Failure View displayed
- Retry button re-fetches Jobs API

---

### Search Functionality

- GET request with search query
- JWT token sent via cookies
- Loader displayed
- Jobs list updated dynamically

---

### Employment Type Filter

- Multiple employment types supported
- Values are comma separated

Example:

employment_type=FULLTIME,PARTTIME

---

### Salary Range Filter

- Selected salary id passed as minimum_package

---

### Multiple Filters Example

https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=

---

### Edge Cases

- If API returns empty list → No Jobs View displayed
- Multiple filters combine dynamically
- Clicking a job navigates to Job Item Details Route

---

## 📄 Job Item Details Route

- GET request with job id
- JWT token sent in cookies
- Loader displayed while fetching
- On success → Job details displayed
- Similar jobs displayed
- On failure → Failure View displayed
- Retry button re-fetches API
- Visit button opens company website in new tab

---

## ❌ Not Found Route

- Invalid URL redirects to Not Found page

---

## 🧭 Header Functionalities

- Logo click → Home Route
- Home link → Home Route
- Jobs link → Jobs Route
- Logout button → Confirmation popup → Login Route

---

# 🗂️ Static Data Structures

## employmentTypesList

| Key              | Data Type |
| ---------------- | --------- |
| employmentTypeId | String    |
| label            | String    |

---

## salaryRangesList

| Key           | Data Type |
| ------------- | --------- |
| salaryRangeId | String    |
| label         | String    |

---

# ⚙️ Backend Functionalities

## 📝 Register API

POST /register

- Validates user input
- Hashes password
- Stores user in database
- Prevents duplicate email registration
- Returns success or error response

---

## 🔐 Login API

POST /login

- Validates credentials
- Generates JWT token
- Sends token in response
- Returns error message for invalid credentials

---

## 👤 Profile API

GET /profile

- Protected route
- Requires valid JWT token
- Returns authenticated user profile data

---

## 💼 Jobs API

GET /jobs

Query Parameters:

- employment_type
- minimum_package
- search

Features:

- Dynamic filtering
- Multiple employment types support
- Salary range filtering
- Search by job title
- Returns filtered job list

---

## 📄 Job Details API

GET /jobs/:id

- Returns complete job details
- Includes similar jobs
- Protected route

---

# 🛡️ Security Features

- JWT-based authentication
- Password hashing
- Middleware for route protection
- Environment variables for sensitive data
- .gitignore configured to hide:
  - node_modules
  - .env
  - build folders

---

# 🔧 Environment Setup

Create a `.env` file inside backend folder:

PORT=5000  
JWT_SECRET=your_secret_key

---

# ▶️ Running the Project

## Backend

npm install  
npm start

## Frontend

npm install  
npm start

---

# 📌 Features Implemented

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Dynamic Job Filtering
- Search Functionality
- Loader & Failure Views
- No Jobs View
- Similar Jobs Section
- Logout Confirmation Popup
- Responsive Design
- Environment Configuration

---

# 📈 Future Improvements

- Pagination
- Save Jobs Feature
- User Profile Editing
- Admin Dashboard
- Real Database Integration
- Deployment (Render / Vercel)

---

# 👨‍💻 Author

Developed as a Full Stack Project demonstrating:

- React Routing
- API Integration
- JWT Authentication
- Backend Architecture
- Secure Environment Configuration
- Professional Project Structuring
