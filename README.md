# Cargo-First




#live link : https://cargo-first-user.vercel.app/
# MERN Job Board

> Full-stack Job Posting & Customer Analysis dashboard built with the MERN stack (MongoDB, Express, React, Node). Features JWT authentication, responsive dashboard with sidebar navigation, job posting CRUD, and visual customer analysis (charts).

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Live Demo & Deployment](#live-demo--deployment)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Architecture & File Structure](#architecture--file-structure)
6. [Getting Started — Local Development](#getting-started--local-development)

   * [Prerequisites](#prerequisites)
   * [Environment Variables](#environment-variables)
   * [Install & Run](#install--run)
7. [Backend API](#backend-api)

   * [Auth Flow (JWT)](#auth-flow-jwt)
   * [Routes / Endpoints](#routes--endpoints)
   * [Models / Schemas](#models--schemas)
   * [Example Requests](#example-requests)
8. [Frontend](#frontend)

   * [Routing & Pages](#routing--pages)
   * [Components Overview](#components-overview)
   * [Charts / Customer Analysis](#charts--customer-analysis)
9. [Database (MongoDB)](#database-mongodb)
10. [Testing & Seeding Dummy Data](#testing--seeding-dummy-data)
11. [Deployment](#deployment)

    * [Deploy Frontend to Vercel](#deploy-frontend-to-vercel)
    * [Deploy Backend (recommended options)](#deploy-backend-recommended-options)
    * [Environment on Production](#environment-on-production)
12. [Bonus — Edit/Delete Jobs & Improvements](#bonus--editdelete-jobs--improvements)
13. [UX / Responsiveness Notes](#ux--responsiveness-notes)
14. [Troubleshooting](#troubleshooting)
15. [Roadmap](#roadmap)
16. [Contributing](#contributing)
17. [License](#license)

---

## Project Overview

This project is a simple job-posting dashboard where authenticated users can post jobs, view posted jobs, edit/delete them (bonus), and see customer analysis visualizations. The UI is responsive and provides a sidebar navigation with sections:

* Job Posted
* Profile
* Customer Analysis
* Logout

The backend exposes REST APIs secured with JWT. Jobs are persisted in MongoDB.

## Live Demo & Deployment

* Frontend: Deploy to **Vercel** (recommended)
* Backend: Can deploy to **Render**, **Railway**, **Heroku**, or use Vercel serverless functions. This README includes steps for both patterns.

> NOTE: If you want a single-Vercel deployment, consider using Vercel Serverless Functions for the backend. For a classic setup, host backend on Render/Railway and point `REACT_APP_API_URL` in the frontend to the backend URL.

## Features

* JWT-based authentication (signup/login)
* Protected Dashboard route after login
* Sidebar navigation (Job Posted, Profile, Customer Analysis, Logout)
* Job Posting Form (Job Title, Job Description, Last Date for Application, Company Name, Submit)
* Persist posted jobs to MongoDB
* View list of posted jobs on the Job Posted page
* Customer Analysis page with charts (dummy data) using Chart.js / Recharts
* Responsive UI and clean UX
* Bonus: Edit & Delete job functionality (instructions included)

## Tech Stack

* Frontend: React.js (Create React App / Vite), React Router v6, Tailwind CSS or plain CSS, Chart.js or Recharts
* Backend: Node.js, Express.js
* Database: MongoDB (Atlas or local)
* Auth: JWT (jsonwebtoken)
* Dev Tools: Mongoose, Axios, dotenv, bcryptjs

## Architecture & File Structure

Example project layout:

```
mern-jobboard/
├─ backend/
│  ├─ package.json
│  ├─ server.js (or app.js)
│  ├─ config/
│  │  └─ db.js
│  ├─ controllers/
│  │  ├─ authController.js
│  │  └─ jobsController.js
│  ├─ middleware/
│  │  └─ authMiddleware.js
│  ├─ models/
│  │  ├─ User.js
│  │  └─ Job.js
│  ├─ routes/
│  │  ├─ authRoutes.js
│  │  └─ jobRoutes.js
│  └─ utils/
│     └─ seed.js
└─ frontend/
   ├─ package.json
   ├─ src/
   │  ├─ App.jsx
   │  ├─ index.jsx
   │  ├─ api/
   │  │  └─ api.js (axios instance)
   │  ├─ pages/
   │  │  ├─ Login.jsx
   │  │  ├─ Register.jsx
   │  │  ├─ Dashboard.jsx
   │  │  ├─ JobPosted.jsx
   │  │  ├─ Profile.jsx
   │  │  └─ CustomerAnalysis.jsx
   │  ├─ components/
   │  │  ├─ Sidebar.jsx
   │  │  ├─ JobForm.jsx
   │  │  ├─ JobCard.jsx
   │  │  └─ ProtectedRoute.jsx
   │  └─ styles/
   │     └─ tailwind.css or app.css
```

## Getting Started — Local Development

### Prerequisites

* Node.js v16+ / npm or yarn
* MongoDB instance (local or MongoDB Atlas)
* Optional: Postman for testing APIs

### Environment Variables

Create `.env` files in the `backend/` directory with:

```
PORT=****
MONGODB_URI=your_mongodb_connection_******
JWT_SECRET=s*********
JWT_EXPIRES_IN=**
```

In the `frontend/` directory create `.env` (for Create React App prefix `REACT_APP_`):

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Install & Run

**Backend**

```bash
cd backend
npm install
npm run dev   # nodemon server.js (dev) or node server.js
```

**Frontend**

```bash
cd frontend
npm install
npm start    # runs on http://localhost:3000 by default
```

Open `http://localhost:3000` and register/login. After login you will be redirected to `/dashboard`.

## Backend API

### Auth Flow (JWT)

* `POST /api/auth/register` — create a new user (hash password)
* `POST /api/auth/login` — validate credentials; returns `{ token, user }` where `token` is a JWT
* Protected endpoints require `Authorization: Bearer <token>` header

Server returns 401 if token missing/invalid.

### Routes / Endpoints

**Auth**

* `POST /api/auth/register` — body: `{ name, email, password }`
* `POST /api/auth/login` — body: `{ email, password }`

**Jobs** (protected)

* `GET /api/jobs` — returns list of posted jobs (optionally filter by user)
* `POST /api/jobs` — create a new job. body: `{ title, description, lastDate, company }`
* `PUT /api/jobs/:id` — update a job (owner only)
* `DELETE /api/jobs/:id` — delete a job (owner only)

**User**

* `GET /api/users/me` — returns profile for logged-in user

### Models / Schemas (Mongoose)

**User**

```js
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

**Job**

```js
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  lastDate: { type: Date },
  company: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
```

### Example Requests

**Login — cURL**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password123"}'
```

**Create Job (protected)**

```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"title":"Frontend Developer","description":"React experience","lastDate":"2025-12-31","company":"Acme Inc"}'
```

## Frontend

### Routing & Pages

* Public pages: `/login`, `/register`
* Protected page: `/dashboard/*`

  * `/dashboard/jobs` — Job Posted (default)
  * `/dashboard/profile` — Profile page
  * `/dashboard/analysis` — Customer Analysis

Use `react-router` `BrowserRouter` and a `ProtectedRoute` component that checks for a JWT saved in `localStorage` (or better: httpOnly cookie) and redirects to `/login` if missing.

### Components Overview

* `Sidebar.jsx` — fixed left vertical navigation with links for Job Posted, Profile, Customer Analysis, Logout. Collapsible on small screens.
* `JobForm.jsx` — the form with fields:

  * Job Title (text)
  * Job Description (textarea)
  * Last Date for Application (date input)
  * Company Name (text)
  * Submit button — calls `POST /api/jobs` and updates job list
* `JobCard.jsx` — displays a job with edit/delete buttons (if owner)
* `CustomerAnalysis.jsx` — uses Chart.js or Recharts to render dummy data (bar chart, pie chart, line chart)
* `Dashboard.jsx` — layout that contains `Sidebar` and the main content area where the selected page renders

### Charts / Customer Analysis

Use `react-chartjs-2` (Chart.js wrapper) or `recharts`. Example datasets to show:

* Jobs posted per month (bar chart)
* Applicants per job category (pie chart)
* Active vs Closed jobs (doughnut)

Example: dummy data in `CustomerAnalysis.jsx` so you don't need backend data to render visuals.

## Database (MongoDB)

* Use MongoDB Atlas for a hosted DB. Create a free cluster and copy the connection string to `MONGODB_URI`.
* For local development, `mongodb://localhost:27017/mern-jobboard` works.

## Testing & Seeding Dummy Data

Create a small `seed.js` script in `backend/utils/` that connects to the DB and inserts sample users & jobs. Run `node utils/seed.js` to populate.

Example seed: 3 users, 8 jobs with varying `lastDate` values and `postedBy` references.

## Deployment

### Deploy Frontend to Vercel

1. Create a Vercel account and import the `frontend/` folder as a new project.
2. Add the environment variable `REACT_APP_API_URL` in Vercel project settings pointing to your backend URL (e.g. `https://jobboard-api.example.com/api`).
3. Deploy — Vercel will auto-build the React app.

### Deploy Backend (recommended options)

* **Render**: Simple Node/Express deploy, set `PORT`, `MONGODB_URI`, `JWT_SECRET` in Render dashboard.
* **Railway**: Good for prototyping; add MongoDB plugin and deploy from repo.
* **Heroku**: Classic option (set config vars, add buildpack if needed).
* **Vercel Serverless Functions**: Move Express endpoints into `api/` serverless functions in the `frontend` repo — not the easiest for complex apps but works.

Steps (Render example):

1. Push `backend/` to GitHub.
2. Create a new Web Service on Render and connect the repo. Choose `npm start` as the start command.
3. Add environment variables in Render: `MONGODB_URI`, `JWT_SECRET`.
4. Deploy. Use the generated base URL as the `REACT_APP_API_URL` in the Vercel frontend deployment.

### Environment on Production

Make sure to use strong `JWT_SECRET` and secure MongoDB credentials. Consider setting up HTTPS (Render/Vercel handle this automatically).

## Bonus — Edit/Delete Jobs & Improvements

* Implement `PUT /api/jobs/:id` and `DELETE /api/jobs/:id` and enforce that only the `postedBy` user can modify or remove job.
* Frontend: in `JobCard` show Edit & Delete icons visible only when `job.postedBy === currentUser._id`.
* For edit: open a modal prefilled with job data; submit to `PUT /api/jobs/:id` and update UI optimistically.

## UX / Responsiveness Notes

* Use a mobile-first approach: the sidebar collapses into a top hamburger menu on small viewports.
* Use CSS Grid / Flexbox for card layouts and forms.
* Use Tailwind CSS for rapid responsive styling or a component library like Material-UI for polished components.
* Ensure form validation (required fields, valid dates) and show inline error/success messages.

## Troubleshooting

* **CORS errors**: Enable CORS in backend `app.use(cors({ origin: 'http://localhost:3000', credentials: true }))`.
* **JWT token issues**: Ensure time sync on client and server; verify the token signing secret is identical in the server env.
* **Data not persisting**: Check `MONGODB_URI` and network access rules for Atlas (whitelist IP or allow access from anywhere during dev).

## Roadmap

* Add file upload for company logo
* Add search & filters for jobs
* Add applicant flow (apply to job, manage applicants)
* Add role-based access (admin vs regular user)
* Add tests (Jest + Supertest for backend; React Testing Library for frontend)

## Contributing

Contributions are welcome! Please open issues or PRs for bug fixes and features. Follow this workflow:

1. Fork the repo
2. Create a feature branch `feature/my-feature`
3. Commit & push
4. Create a PR describing the changes

## License

This project is released under the MIT License.

---

### Helpful Commands Summary

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start

# Seed DB
node backend/utils/seed.js
```

---
