<h1 align="center">Tech Bridge</h1>
<p align="center">
</p>

<a href="https://hack36.in"> <img src="https://postimage.me/images/2025/04/19/built-at-hack36.png" height=24px> </a>
# Tech-Bridge

> A platform for tech enthusiasts to showcase their projects, find collaborators, and raise funds.

---

## Badges

<!-- Core Tech Stack -->
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF?logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.7.0-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.13.2-47A248?logo=mongodb&logoColor=white)

<!-- Auth & Payments -->
![Clerk](https://img.shields.io/badge/Clerk-5.28.2-3A8BBB?logo=clerk&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-18.0.0-635BFF?logo=stripe&logoColor=white)

<!-- Infrastructure -->
![Cloudinary](https://img.shields.io/badge/Cloudinary-2.6.0-F8B400?logo=cloudinary&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-6.10.1-4B484B?logo=nodemailer&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-5.1.1-F8D90F?logo=bcrypt&logoColor=black)

<!-- Dev Tools -->
![ESLint](https://img.shields.io/badge/ESLint-9.22.0-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.5.3-F7B93E?logo=prettier&logoColor=black)
![Nodemon](https://img.shields.io/badge/Nodemon-3.1.9-76D04B?logo=nodemon&logoColor=black)

---

## Contributors:
- [Sakaray Varsha](https://github.com/Varshasakaray)
- [Vivek Kumar](https://github.com/thefearlesscoder)
- [Varun Kumar Sahu](https://github.com/vks-07)
- [Kunal Sonkar](https://github.com/Kunalsonkar07)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [In-app APIs](#in-app-apis)
- [Key Libraries & Tools](#key-libraries--tools)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Tech-Bridge** empowers developers and innovators to present their work, connect with like-minded collaborators, and attract funding for their ideas. The platform combines a modern user interface, secure backend, and seamless payment integration, creating a unique tech community experience.

---

## Features

- 🚀 **Project Showcasing:** List and manage technology projects with media, descriptions, and tags.
- 🤝 **Collaboration:** Find, connect, and partner with other developers or contributors.
- 💸 **Fundraising:** Integrated Stripe payments to help projects receive funding.
- 🔒 **Authentication:** Secure user registration and login (including social sign-in with Google).
- 📧 **Notifications & Email:** Receive updates and communications within the app and via email.
- 🏷️ **Search & Filtering:** Easily discover projects and contributors with smart filters.
- 🖼️ **Media Uploads:** Upload project screenshots or demo videos (via Cloudinary).
- 📈 **Dashboard:** Personalized dashboard for users to manage their projects, funds, and collaborations.

---

## Tech Stack

### Frontend

- **React 19** – Modern, component-based UI development
- **Vite** – Lightning-fast build tool and dev server
- **Redux Toolkit** – State management
- **Tailwind CSS** – Utility-first CSS framework
- **React Router DOM** – Declarative routing
- **AOS (Animate On Scroll)** – Animation effects
- **Clerk** – User authentication & session management
- **Stripe.js & react-stripe-js** – Payment integration

### Backend

- **Node.js** (ES Modules)
- **Express 5** – REST API server
- **MongoDB & Mongoose** – NoSQL database & ORM
- **Cloudinary** – Media storage and serving
- **Nodemailer** – Email services
- **Stripe** – Payment processing
- **Bcrypt** – Password hashing
- **JWT** – Authentication tokens

---

## Project Structure

```
Tech-Bridge/
├── backend/
│   ├── package.json
│   ├── src/
│   └── ...
├── frontend/
│   ├── package.json
│   ├── src/
│   └── ...
└── README.md
```
- **backend**: Express API, authentication, user/project management, payments.
- **frontend**: React app, UI components, state management, API integration.

---

## Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database (local or Atlas)
- Stripe & Cloudinary accounts for integration

### Backend

```bash
cd backend
npm install
# Create a .env file with environment variables (see below)
npm run dev
```

#### Example `.env` for Backend

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
STRIPE_SECRET_KEY=your_stripe_key
EMAIL_HOST=smtp.example.com
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Example `.env` for Frontend

```
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

---

## In-app APIs

> Below are some of the core API endpoints (expand as needed):

- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/google`
- **Projects:** `/api/projects/` (CRUD operations)
- **Users:** `/api/users/` (profile, dashboard)
- **Funding:** `/api/fundings/` (Stripe integration)
- **Media:** `/api/media/upload` (Cloudinary)
- **Collaboration:** `/api/collaborators/`

> **Note:** For a complete list, see the API documentation or explore the `backend/src` folder.

---

## Key Libraries & Tools

- **Frontend:**
  - `react`, `redux`, `tailwindcss`, `vite`, `@clerk/clerk-react`, `@stripe/react-stripe-js`, `react-router-dom`, `axios`, `aos`, `react-hot-toast`
- **Backend:**
  - `express`, `mongoose`, `bcrypt`, `jsonwebtoken`, `cloudinary`, `nodemailer`, `stripe`, `multer`, `cors`, `dotenv`
- **Dev Tools:**
  - ESLint, Prettier, Nodemon

---

## Contributing

We welcome contributions! Please fork the repo, create a branch, and submit a pull request.
- Follow the code style (Prettier/ESLint).
- Include clear commit messages.
- Update documentation with any changes.

---

## License

This project is licensed under the [ISC License](LICENSE).

---

## Links

- [Live Demo]((https://drive.google.com/file/d/1ERm0XWgl0j9uSkbO6aSftoh7THhzsTWY/view?usp=drive_link)) <!-- Add link if deployed -->
- [Issues](https://github.com/thefearlesscoder/Tech-Bridge/issues)
- [Pull Requests](https://github.com/thefearlesscoder/Tech-Bridge/pulls)

---


<a href="https://hack36.in"> <img src="https://postimage.me/images/2025/04/19/built-at-hack36.png" height=24px> </a>
