# Final Report — Directorio SAEL

**Subject**: Software Engineering  
**Assignment**: Final Practical Exercise  
**Authors**: Tarik Hadzimusovic  
**Professor**: Antonio Jesús Sánchez Guirado  
**Date**: May 2026

---

## 1. Project description

This project involves the development of a contact directory/agenda application for the Local Entities Assistance Service (SAEL) of the Diputación de Cádiz (Provincial Government of Cádiz, Spain).

The application allows users to view, search, and manage the service's contact directory. It works both as a web application (accessible via URL) and as a mobile application for Android devices (installable APK).

### Requirements fulfilled

- Web application accessible via URL
- Installable mobile application (Android APK)
- Two user profiles: USER (read-only) and ADMIN (full CRUD)
- Initial data loaded from the CSV file provided by the professor
- Mobile integrations: phone calls, email, WhatsApp, and Google Meet
- Complete documentation: user manual, admin manual, and final report

---

## 2. Technology research

Before starting development, the following free alternatives were evaluated:

### 2.1 Options analyzed

| Technology | Advantages | Disadvantages |
|------------|-----------|---------------|
| **Supabase** | Full PostgreSQL, built-in authentication, automatic REST API, generous free plan (2 projects, 500 MB), Row Level Security | Requires internet connection |
| **ODOO** | Complete ERP with contact modules | Excessively complex for a simple directory, steep learning curve, not oriented toward mobile apps |
| **GitHub Pages + JSON** | Completely free, no backend needed | No authentication or write operations (CRUD), static data only |
| **Firebase** | Good documentation, robust authentication | NoSQL database (less suitable for relational data), less predictable pricing model |

### 2.2 Choice: Supabase

**Supabase** was chosen as the backend for the following reasons:

1. **PostgreSQL database**: a full relational database, ideal for structured data such as contacts.
2. **Built-in authentication**: a ready-to-use registration and login system with role support.
3. **Row Level Security (RLS)**: allows defining security policies at the database level, ensuring users can only perform operations permitted by their role.
4. **Automatic REST API**: Supabase automatically generates REST endpoints for all tables, eliminating the need to write server-side code.
5. **Adequate free plan**: the free plan includes 2 projects, 500 MB of database storage, and 1 GB of file storage — more than enough for this project.
6. **Modern ecosystem**: official JavaScript/TypeScript SDK with excellent documentation.

---

## 3. Technology stack

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Frontend** | React 19 + TypeScript | Modern framework, static typing for reliability |
| **Bundler** | Vite 8 | Instant dev startup, optimized production builds |
| **Styling** | Tailwind CSS 4 | Rapid responsive UI development, utility-first approach |
| **Backend** | Supabase (PostgreSQL) | Free BaaS with auth, REST API, and RLS |
| **Routing** | React Router 7 | SPA navigation with protected routes |
| **Icons** | Lucide React | Lightweight and consistent SVG icons |
| **Notifications** | React Hot Toast | Visual feedback for user actions |
| **Mobile** | Capacitor | Packaging the web app as a native Android APK |
| **Hosting** | Vercel | Free deployment with SSL and global CDN |

---

## 4. Application architecture

### 4.1 General structure

```
┌─────────────────────────────────────────┐
│           Client (React SPA)            │
│  ┌─────────┐ ┌──────────┐ ┌─────────┐  │
│  │  Login  │ │ Contact  │ │ Contact │  │
│  │  Page   │ │   List   │ │ Detail  │  │
│  └─────────┘ └──────────┘ └─────────┘  │
│  ┌─────────────────────────────────┐    │
│  │      AuthContext (roles)        │    │
│  └─────────────────────────────────┘    │
└──────────────┬──────────────────────────┘
               │ HTTPS (REST API)
┌──────────────▼──────────────────────────┐
│         Supabase (Backend)              │
│  ┌──────────┐  ┌─────────────────────┐  │
│  │   Auth   │  │    PostgreSQL DB    │  │
│  │  (JWT)   │  │  ┌──────────────┐   │  │
│  └──────────┘  │  │  contactos   │   │  │
│                │  │  user_roles   │   │  │
│                │  └──────────────┘   │  │
│                │  ┌──────────────┐   │  │
│                │  │ RLS Policies │   │  │
│                │  └──────────────┘   │  │
│                └─────────────────────┘  │
└─────────────────────────────────────────┘
```

### 4.2 Data model

**Table `contactos`:**
- `id` (UUID, primary key)
- `nombre`, `apellido_1`, `apellido_2` (text fields for name)
- `num_corto` (extension), `num_largo` (full phone number)
- `mail` (email address)
- `puesto` (position), `servicio` (department)
- `foto` (image URL)
- `created_at` (creation timestamp)

**Table `user_roles`:**
- `id` (UUID, primary key)
- `user_id` (foreign key to auth.users)
- `role` ('user' or 'admin')
- `created_at` (assignment timestamp)

### 4.3 Security

Five Row Level Security policies were implemented:
- `contactos_select`: all authenticated users can read
- `contactos_insert`: only administrators can create
- `contactos_update`: only administrators can modify
- `contactos_delete`: only administrators can delete
- `roles_select_own`: each user can only view their own role

An automatic trigger assigns the 'user' role to every newly registered user.

---

## 5. Implemented features

### 5.1 USER profile

| Feature | Description |
|---------|-------------|
| Registration and login | With email and password |
| Contact list | Card view with name, position, and department |
| Search | By name, surname, email, phone, position, or department |
| Filtering | By department via dropdown |
| Contact detail | Full view with all information |
| Direct calling | `tel:` link that opens the phone dialer |
| Email sending | `mailto:` link that opens the email client |
| WhatsApp | Direct link to WhatsApp Web/App |
| Google Meet | Link to start a video call |
| CSV export | Download filtered contacts in CSV format |
| Dark/light theme | Manual toggle and automatic system detection |

### 5.2 ADMIN profile

All USER profile features, plus:

| Feature | Description |
|---------|-------------|
| Create contact | Complete form with validation |
| Edit contact | Pre-filled form with current data |
| Delete contact | With confirmation dialog |

---

## 6. Improvements implemented

Beyond the basic requirements, the following improvements were added:

1. **CSV export**: allows downloading visible contacts (with applied filters) in CSV format compatible with Excel and Google Sheets.

2. **Dark/light theme**: the application automatically detects the operating system's preference and allows the user to manually switch between themes. The preference is saved in localStorage.

3. **Responsive design (mobile-first)**: the interface adapts to any screen size, from small phones to desktop monitors. It uses a grid system that reorganizes cards based on available space.

4. **PWA (Progressive Web App)**: the application includes a manifest.json that allows it to be installed as an app from the mobile browser, without needing an APK.

5. **Toast notifications**: visual feedback for all actions (creation, editing, deletion, errors) through non-intrusive notifications.

6. **Initials as avatar**: when a contact has no photo, their initials are displayed in a colored circle as an avatar.

---

## 7. Development process

### 7.1 Development phases

1. **Research** (Phase 1): Comparative analysis of free technologies.
2. **Configuration** (Phase 2): Project creation, dependency installation, Supabase configuration.
3. **Backend development** (Phase 3): Database schema design, RLS policies, triggers, and functions.
4. **Frontend development** (Phase 4): Implementation of components, pages, authentication, and routing.
5. **Mobile integration** (Phase 5): Capacitor configuration for APK generation.
6. **Deployment** (Phase 6): Publishing to Vercel with environment variable configuration.
7. **Documentation** (Phase 7): Writing manuals and final report.

### 7.2 Development tools

- **Editor**: Visual Studio Code
- **Version control**: Git
- **Terminal**: zsh (macOS)
- **Browser**: Chrome (with DevTools for debugging)
- **Design**: Tailwind CSS (direct code-based development)

---

## 8. Deployment

### 8.1 Web

The application is deployed on **Vercel** and is accessible at:

**https://agenda-contactos-xi.vercel.app**

Deployment features:
- Automatic SSL/HTTPS
- Global CDN (low latency from any location)
- Automatic deployment with each update
- Securely configured environment variables

### 8.2 Mobile

**Capacitor** was used to package the web application as an Android APK:
- App ID: `es.dipucadiz.sael`
- Name: "Directorio SAEL"
- Scheme: HTTPS (secure)

---

## 9. Conclusions

The project fulfills all specified requirements:

- Functional application for both web and mobile
- Role-based system with two differentiated profiles (USER and ADMIN)
- Full CRUD for administrators
- Mobile integration with phone calls, email, WhatsApp, and Google Meet
- Free and suitable technology for the project
- Complete documentation

The choice of Supabase as the backend proved to be the right decision, as it provided all the necessary functionality (database, authentication, security) at no cost and with minimal configuration. The combination with React and Capacitor allowed developing a single codebase that works on both web and mobile devices.
