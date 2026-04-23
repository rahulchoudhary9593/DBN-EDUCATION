<div align="center">
  <img width="120" src="https://res.cloudinary.com/dtcz7vwk2/image/upload/v1774551434/LOGO_qwsifp.svg" alt="Dayanand Education Group Logo" />
  <h1>Dayanand Education Group</h1>
  <p><strong>Official Web Portal for School (Nursery to 12th) & Degree College (B.A, B.Sc, B.Com)</strong></p>
</div>

## 🚀 Overview

This is the official web application for **Dayanand Education Group**, located in Maharana, Rajasthan. It serves as a comprehensive administrative and informational portal for our institutions, admissions, faculty, and campus life.

Built with extreme performance and complete SEO optimization in mind, this project leverages the cutting-edge **Next.js 15 App Router**, **React 19**, and modern **Tailwind CSS**.

## ✨ Features

- **Blazing Fast Performance**: Highly optimized server-side rendered and static pages.
- **State-of-the-Art SEO**: Implements JSON-LD rich snippets, optimized Meta tags, and dynamic Open Graph images out-of-the-box.
- **Admissions Portal**: Fast, secure application forms with backend integration.
- **Responsive Design**: Flawlessly adapts to mobile, tablet, and desktop screens using native Tailwind utility classes.
- **Image Optimization**: Powered by Next.js `<Image>` component integrations with Cloudinary and Google Drive.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://motion.dev/)
- **Hosting**: [Vercel](https://vercel.com/)

---

## 💻 Run Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites
Make sure you have **Node.js 20.x or later** installed.

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
The project requires a few environment variables to function fully. Copy the template:
```bash
cp .env.example .env.local
```
Inside `.env.local`, configure your required keys:
- `APP_URL`: Set this to `http://localhost:3000` for local development.

### 3. Start Development Server
Boot up the local Next.js server:
```bash
npm run dev
```
Your app will now be running and accessible at [http://localhost:3000](http://localhost:3000).

---

## ☁️ Deployment (Vercel)

This project has been fully audited and optimized for seamless deployment on **Vercel** with zero custom configuration necessary.

1. Push your code to a GitHub repository.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
3. Import your GitHub repository. Vercel automatically detects the Next.js framework.
4. Expand the **Environment Variables** section and inject your production `APP_URL` (`https://yourdomain.com`).
5. Click **Deploy**.

*Vercel takes care of all serverless API routing, build settings, static file serving, and Edge network distribution automatically.*
