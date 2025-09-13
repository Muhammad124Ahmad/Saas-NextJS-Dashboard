# Saaslytic

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-%23007ACC?logo=vercel&logoColor=white)](https://saas-next-js-dashboard.vercel.app/)

**Saaslytic** is a modern, production-ready SaaS analytics dashboard built with Next.js, Supabase, and Tailwind CSS. It features real authentication, customer management, payments, analytics, and a beautiful responsive UI.

![Saaslytic Logo](public/saaslytic-logo.svg)

## Features

- 🔒 **Authentication**: Secure sign up, login, and logout with Supabase Auth.
- 👤 **Customer Management**: Add, edit, and manage customers and their plans.
- 💳 **Payments**: Record and track customer payments.
- 📊 **Analytics Dashboard**: View active users, signups, revenue, churn, and user growth.
- 📝 **Recent Activity**: See a log of recent actions and events.
- ⚡ **Role-Based Access**: Protected routes for authenticated users.
- 📱 **Responsive Design**: Works beautifully on desktop and mobile.
- 🎨 **Modern UI**: Built with Tailwind CSS for easy customization.
- 🟦 **Open Source**: MIT licensed.

## Demo

[https://saas-next-js-dashboard.vercel.app/](https://saas-next-js-dashboard.vercel.app/)

## Screenshots

<!-- Add dashboard screenshots here if available -->

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Muhammad124Ahmad/Saas-NextJS-Dashboard.git
cd Saas-NextJS-Dashboard/saas-dashboard
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Supabase

- Create a [Supabase](https://supabase.com/) project.
- Copy your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

- Set up the following tables in Supabase:
  - `customers` (id: uuid, name, plan, status, created_at)
  - `payments` (id: uuid, user_id, amount, created_at)
  - `activities` (id: serial, description, created_at)
  - `profiles` (id: uuid, name, email, theme)
  - Add RLS policies for secure access.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `src/app/` — Next.js app directory (pages, layout, dashboard, etc.)
- `src/components/` — Reusable UI components (Sidebar, TopBar, AuthForm, etc.)
- `src/supabaseClient.ts` — Supabase client setup
- `public/saaslytic-logo.svg` — App logo

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Lint the codebase

## Customization

- Change branding in `Sidebar.tsx`, `layout.tsx`, and `public/saaslytic-logo.svg`.
- Update colors and styles in `tailwind.config.js` and CSS files.
- Add more analytics, charts, or integrations as needed.

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

## License

[MIT](LICENSE)
