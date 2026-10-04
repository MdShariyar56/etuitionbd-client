# E-TuitionBD — Learn · Teach · Grow

A complete tuition management platform where **students** post tuition requirements, **tutors** apply, and **admins** review, verify and monitor everything, with Stripe payments and role-based dashboards.

**Live URL:** _add after deployment_
**Server repository / API:** see the eTuitionBD server project (separate repo, deployed separately).

## Purpose

Solve the real problem of finding qualified tutors and verified tuitions: reduce friction between students and tutors with automated workflows, transparent payments and admin moderation.

## Features

- **Auth:** Firebase email/password + Google login, own JWT (role + expiry verified on every API call), role-based routing, private routes that survive a reload.
- **Student:** create / edit (pre-filled) / delete tuitions, view applied tutors, accept (Stripe checkout) or reject, payment history, profile settings.
- **Tutor:** apply via modal (name/email read-only), edit/delete applications until approved, ongoing tuitions, revenue history, editable public profile.
- **Admin:** user management (edit, change role, block, delete), tuition approval/rejection, reports & analytics with charts and full transaction history.
- **Payments:** a tutor is approved **only after** the Stripe payment is verified server-side; other pending applications are auto-rejected.
- **Home:** hero, latest tuitions and tutors (fetched live), How it Works, Why Choose Us, Framer Motion animations.
- **Challenges:** search, sort (budget/date), advanced filters (class, subject, location, budget), pagination, JWT role/expiry verification.
- Full-screen loading spinner, 404 page, sticky DaisyUI navbar, responsive layouts, separate dashboard layout.

## Tech stack / packages

Next.js (App Router), React, Tailwind CSS, DaisyUI, Firebase Auth, Stripe (`@stripe/react-stripe-js`), Framer Motion, Recharts, react-hot-toast, SweetAlert2, react-icons.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev                  # http://localhost:3000
```

This is the **client**. It talks to the eTuitionBD server through `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`), so start the server too.

Only public Firebase and Stripe publishable keys live here (`.env.local`, never committed). Database, JWT and Stripe secrets live in the server project.

### Admin account

Register normally with the email set in `ADMIN_EMAIL`; that account is automatically given the **admin** role.

## Deployment checklist

- Set `NEXT_PUBLIC_API_URL` to the deployed server URL, plus the Firebase and Stripe publishable variables from `.env.example`.
- Add the deployed domain to **Firebase → Authentication → Authorized domains**.
- Set `CLIENT_URL` on the server to this site's URL so CORS allows it.
- Stripe test card: `4242 4242 4242 4242`, any future date, any CVC.
