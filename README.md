# 🧑‍💼 Admin Dashboard

A modern admin dashboard built with **React, Vite, TypeScript, Tailwind CSS, and Supabase**.
Designed for performance, scalability, and a clean developer experience.

---

## 🚀 Features

- ⚡ Fast development with Vite
- 🟦 Fully typed with TypeScript
- 🎨 Styled using Tailwind CSS
- 🔐 Authentication & backend powered by Supabase
- 🛡️ Role-based access control (RBAC)
- 🌙 Dark mode support
- 📊 Interactive charts with Recharts
- 🔄 Data fetching & caching using React Query
- 🔔 Toast notifications
- 🧭 Client-side routing with React Router
- ❌ Custom 404 page handling

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase
- **State Management:** React Query
- **Routing:** React Router DOM
- **Charts:** Recharts

---

## 🔐 Role-Based Access Control

The application implements RBAC to restrict access based on user roles.

Example roles:

- **Admin** → Full access
- **User** → Read-only or restricted access

Routes and UI components are protected accordingly.

---

## 🌙 Dark Mode

- Toggle between light and dark themes
- Persisted user preference (e.g., localStorage)
- Fully styled using Tailwind CSS

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/admin-dashboard.git
cd admin-dashboard
```

Install dependencies:

```bash
npm install
```

---

## 💻 Development

Run the development server:

```bash
npm run dev
```

App will be available at:

```
http://localhost:5173
```

---

## 🏗️ Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🌐 Deployment (Netlify)

### Build settings:

- **Build command:**

  ```
  npm run build
  ```

- **Publish directory:**

  ```
  dist
  ```

### SPA Redirect (Important)

Create:

```
public/_redirects
```

Add:

```
/* /index.html 200
```

---

## 📁 Project Structure

```
ADMIN-DASHBOARD-MAIN/
├─ dist/                 # Production build output
├─ node_modules/         # Dependencies
├─ public/               # Static assets (e.g., vite.svg, _redirects)
├─ src/
│   ├─ assets/           # Images, icons, static files
│   ├─ components/       # Reusable React components
│   ├─ context/          # React Context providers
│   ├─ hooks/            # Custom hooks
│   ├─ pages/            # Full pages/screens (Home, Users, NotFound)
│   ├─ routes/           # Route configuration (optional)
│   ├─ services/         # API or backend service calls
│   ├─ App.css
│   ├─ App.tsx
│   ├─ index.css
│   └─ main.tsx
├─ .env                  # Environment variables (Supabase keys)
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ netlify.toml          # Netlify build config
├─ package.json
├─ package-lock.json
├─ README.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

---

## ⚠️ Environment Variables

Create a `.env` file:

```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

---

## ✨ Future Improvements

- Audit logs for admin actions
- Advanced analytics dashboard
- Multi-language support
- Performance optimizations

---

## 👤 Author

Your Name
GitHub: https://github.com/pulijedemko

---

## Live Demo

## Check out the live version of this project [here](https://celadon-bubblegum-17d9bf.netlify.app/).

## 📄 License

This project is licensed under the MIT License.
