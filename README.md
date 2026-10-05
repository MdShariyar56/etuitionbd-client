# E-TuitionBD: Learn · Teach · Grow

A complete tuition management platform where **students** post tuition requirements, **tutors** apply, and **admins** review, verify and monitor everything, with Stripe payments, role based dashboards and a polished light and dark interface.

| | |
|---|---|
| **Live site** | https://etuitionbd-client-eight.vercel.app |
| **Client repository** | https://github.com/MdShariyar56/etuitionbd-client |
| **Server repository** | https://github.com/MdShariyar56/etuitionbd-server |
| **Live API** | https://etuitionbd-server-seven.vercel.app |

![Home page in light mode](docs/screenshots/home-light.jpg)

<table>
  <tr>
    <td><img src="docs/screenshots/home-dark.jpg" alt="Home page in dark mode" /></td>
    <td><img src="docs/screenshots/tuitions.jpg" alt="Tuition listing with filters" /></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/tutors.jpg" alt="Verified tutors listing" /></td>
    <td><img src="docs/screenshots/login.jpg" alt="Login page" /></td>
  </tr>
</table>

<p align="center"><img src="docs/screenshots/home-mobile.jpg" alt="Mobile layout" width="260" /></p>

## Purpose

Solve the real problem of finding qualified tutors and verified tuitions: reduce friction between students and tutors with automated workflows, transparent payments and admin moderation.

## How it works

1. A **student** registers, then posts a tuition requirement (subject, class, location, budget, schedule).
2. An **admin** reviews the post and approves or rejects it. Only approved posts are public.
3. **Tutors** browse approved tuitions and apply with their qualifications, experience and expected salary.
4. The student reviews applicants and accepts one, which opens a **Stripe checkout**.
5. The tutor is marked **approved only after the payment is verified on the server**, and the other pending applications are closed automatically.

## Features

**Authentication**
- Firebase email and password plus Google login, with a forgot password flow.
- Our own JWT (role and expiry verified on every API call) and role based routing.
- Private routes stay signed in after a reload. Tuition and tutor details ask guests to log in and return them to the same page afterwards.

**Student**
- Create, edit (pre-filled form) and delete tuition posts, with a confirmation popup.
- View applied tutors, accept (Stripe checkout) or reject, payment history, profile settings.

**Tutor**
- Apply through a modal (name and email read-only), edit or delete an application until it is approved.
- Ongoing tuitions, revenue history and an editable public profile.

**Admin**
- User management: edit, change role, block or delete.
- Tuition moderation: approve or reject posts.
- Reports and analytics with charts and the full successful transaction history.

**Public pages**
- Home with a hero, live latest tuitions and tutors, How it Works, Why Choose Us and a call to action.
- Tuitions listing with **search, sort (budget and date), advanced filters (class, subject, location, budget) and pagination**.
- Tutors listing and profile, About and Contact.

**Experience**
- Light and dark mode with no flash on load, saved per visitor.
- Framer Motion animations (scroll reveal, page transitions, animated navigation), animated icons and SweetAlert popups for every success, error and confirmation.
- Full-screen branded loader, friendly 404 and error pages, fully responsive down to small phones.

## Tech stack and packages

| Area | Packages |
|---|---|
| Framework | Next.js (App Router), React |
| Styling | Tailwind CSS, DaisyUI |
| Auth | Firebase Authentication |
| Payments | Stripe (`@stripe/stripe-js`, `@stripe/react-stripe-js`) |
| UI | Framer Motion, Recharts, SweetAlert2, react-icons (Lucide) |

The backend (Next.js route handlers, MongoDB, JWT, Stripe) lives in the [server repository](https://github.com/MdShariyar56/etuitionbd-server).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev                  # http://localhost:3000
```

The client talks to the server through `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`), so start the server too.

Only public Firebase and Stripe publishable keys live here (`.env.local`, never committed). Database, JWT and Stripe secrets live in the server project.

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the server |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase web app configuration |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

### Admin account

Register normally with the email set in the server's `ADMIN_EMAIL`. That account is automatically given the **admin** role.

## Deployment checklist

- Set `NEXT_PUBLIC_API_URL` to the deployed server URL, plus the Firebase and Stripe publishable variables from `.env.example`.
- Add the deployed domain to **Firebase → Authentication → Authorized domains**.
- Set `CLIENT_URL` on the server to this site's URL so CORS allows it.
- Stripe test card: `4242 4242 4242 4242`, any future date, any CVC.
