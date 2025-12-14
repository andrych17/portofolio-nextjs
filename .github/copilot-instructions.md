# Portfolio Website - Andry Huang

## Project Overview
A modern, animated portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure
```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page
└── components/
    ├── Navbar.tsx       # Navigation bar
    ├── Hero.tsx         # Hero section with typewriter effect
    ├── About.tsx        # About section with experience timeline
    ├── Skills.tsx       # Skills section with progress bars
    ├── Projects.tsx     # Projects showcase with filtering
    ├── Contact.tsx      # Contact form and info
    └── Footer.tsx       # Footer component
```

## Features
- Smooth scroll navigation
- Animated background particles and gradient orbs
- Typewriter effect for role titles
- Experience timeline with animations
- Skills progress bars with categories
- Project filtering by category
- Interactive project showcase slider
- Contact form with validation
- Responsive design for all devices

## Running the Project
```bash
npm run dev
```

## Customization Notes
- Replace profile image placeholder in About.tsx
- Add actual project images in Projects.tsx
- Update contact form to connect to backend/email service
- Add actual GitHub and project links
