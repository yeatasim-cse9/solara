# Solara - Modern Agency Landing Page

Solara is a premium, high-performance agency landing page built with React, Vite, and Tailwind CSS. It features a stunning visual design, smooth animations using GSAP and Lenis, and a fully functional dynamic Admin Dashboard powered by Firebase.

## 🚀 Features

- **Dynamic Content Management:** Edit all text, images, and services directly from a built-in admin dashboard.
- **Admin Authentication:** Secure login system using Firebase Auth to protect the admin routes (`/admin`).
- **Premium Animations:** High-end scroll animations, hover states, and dynamic elements using GSAP, Framer Motion, and Three.js.
- **Responsive Design:** Flawless rendering on desktop, tablet, and mobile devices using Tailwind CSS.
- **SEO Optimized:** Best practices implemented for fast load times and search engine visibility.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [GSAP](https://gsap.com/) & [Motion](https://motion.dev/)
- **Scrolling:** [Lenis](https://lenis.studiofreight.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend & Auth:** [Firebase](https://firebase.google.com/) (Auth & Firestore)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Firebase project with Authentication (Email/Password) and Firestore enabled

### 1. Clone the repository

```bash
git clone https://github.com/yeatasim-cse9/solara.git
cd solara
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Populate the `.env` file with your Firebase configuration keys:

```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🔒 Admin Access

To access the admin dashboard:
1. Navigate to `http://localhost:3000/admin`.
2. You will be redirected to the `/login` page if you are not authenticated.
3. Log in with your configured Firebase administrator credentials to access the CMS and update website content in real-time.

## 📜 Available Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Bundles the app into static files for production.
- `npm run lint`: Runs ESLint to check for code quality and TypeScript errors.
- `npm run preview`: Previews the production build locally.

## 📄 License

This project is open-source and available under the MIT License.
