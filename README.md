<div align="center">

<br />

# ⚡ AutoAgent — Landing Page

### *Your store. Three agents. Zero busywork.*

**AutoAgent** is an autonomous AI system for e-commerce operators — recovering carts, managing inventory, and retaining VIP customers while your team sleeps.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-lime?style=for-the-badge&logo=vercel&logoColor=white&color=84cc16)](https://ismail-2001.github.io/AutoAgent-Landing-Page/)
[![GitHub](https://img.shields.io/badge/Source-GitHub-black?style=for-the-badge&logo=github)](https://github.com/Ismail-2001/AutoAgent-Landing-Page)
[![Built With](https://img.shields.io/badge/Built%20With-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

<br />

</div>

---

## 🚀 What Is This?

This is the **official marketing landing page** for [AutoAgent](https://ecommerce-operation-agent.vercel.app/) — a production-grade agentic AI platform built for Shopify and WooCommerce stores.

The page is engineered to convert — not just inform. Every section, animation, and CTA is intentional:

| Section | Purpose |
|---|---|
| **Hero** | Instant value prop — 3 agents, 0 busywork |
| **Problem** | Mirror the pain of operational chaos |
| **Solution** | Reframe the category: agents, not tools |
| **Dashboard** | Show, don't tell — live UI preview |
| **How It Works** | 3-step simplicity narrative |
| **Tech Stack** | Signal credibility to technical buyers |
| **Testimonials** | Social proof from real store operators |
| **Pricing** | Transparent tiers + interactive ROI calculator |
| **FAQ** | Objection handling at scale |
| **Founder Story** | Human face behind the product |
| **Final CTA** | Close the loop — book a call |

---

## 🤖 The Three Agents

> AutoAgent deploys three specialised autonomous agents that run 24/7, make real decisions, and take real actions — no dashboards to check, no tickets to file.

### 📧 Recovery Agent
Adaptive emails + SMS flows that bring abandoned carts back. Not a drip campaign — a decision-making agent that reads intent signals and personalises every touchpoint.

### 📦 Inventory Agent
Dead-stock alerts, automated reorder suggestions, and dynamic pricing recommendations. Stops money from sitting on your shelves.

### 👑 VIP Agent
Detects your high-LTV customers automatically. Sends personalised thank-yous, handles returns with care, and ensures your best customers feel like founders, not ticket numbers.

---

## 💰 Pricing Model

| Plan | Price | Best For |
|---|---|---|
| **Pilot Program** | $4,995 / 90 days | Teams that want proof before commitment |
| **Growth System** | $8,500 setup + $2,500/mo | Full 3-agent deployment — most popular |
| **Enterprise** | $3,000 + 10% of recovered revenue | Risk-free model for large multi-store ops |

> **ROI Guarantee**: Recover $15K+ in your pilot or get a full refund. The math works at $50K/month revenue — an interactive calculator is built into the page.

---

## 🛠 Tech Stack

This landing page is built with production-quality tooling — no shortcuts:

| Layer | Technology |
|---|---|
| **UI Framework** | React 19 + TypeScript (strict mode) |
| **Build Tool** | Vite 7 (sub-second HMR) |
| **Styling** | Tailwind CSS v3 + shadcn/ui component system |
| **Animations** | GSAP + ScrollTrigger (scroll-driven, pinned sections) |
| **AI Core** | DeepSeek V3 (behind the AutoAgent platform) |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Deployment** | GitHub Pages via `gh-pages` |

> Every section uses scroll-driven GSAP animations with pinning — the UI feels alive, not static.

---

## ⚙️ Local Development

### Prerequisites
- **Node.js** v20+
- **npm** v9+
- **Git**

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Ismail-2001/AutoAgent-Landing-Page.git
cd AutoAgent-Landing-Page

# 2. Install all dependencies
npm install

# 3. Start the dev server (hot reload enabled)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — the site is live with instant HMR.

### Available Commands

```bash
npm run dev        # Start local dev server at localhost:5173
npm run build      # Compile TypeScript + build for production
npm run preview    # Preview the production build locally
npm run deploy     # Build + publish to GitHub Pages (one command)
npm run lint       # Run ESLint across the codebase
```

---

## 📁 Project Structure

```
AutoAgent-Landing-Page/
├── public/                   # Static assets (images, fonts)
│   ├── founder-photo.jpg
│   └── dashboard-hero.jpg
├── src/
│   ├── sections/             # Full-page sections (one file per section)
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── DashboardSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── FounderSection.tsx
│   │   ├── FinalCTASection.tsx
│   │   └── Footer.tsx
│   ├── components/ui/        # 40+ shadcn/ui components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── App.tsx               # Root component + GSAP scroll snap
│   ├── App.css               # Component-level styles
│   ├── index.css             # Global design tokens
│   └── main.tsx              # Entry point
├── index.html                # HTML shell
├── vite.config.ts            # Vite + base path config
├── tailwind.config.js        # Design system configuration
├── tsconfig.app.json         # TypeScript config
└── package.json              # Scripts + dependencies
```

---

## 🌐 Deployment

This project deploys to **GitHub Pages** with a single command:

```bash
npm run deploy
```

This will:
1. Compile TypeScript (`tsc -b`)
2. Bundle with Vite for production
3. Push the `dist/` folder to the `gh-pages` branch automatically

**Live URL**: [https://ismail-2001.github.io/AutoAgent-Landing-Page/](https://ismail-2001.github.io/AutoAgent-Landing-Page/)

> The `vite.config.ts` is pre-configured with `base: '/AutoAgent-Landing-Page/'` in production mode — all asset paths resolve correctly on GitHub Pages.

---

## 🎨 Design Principles

This page was built to feel **premium, not promotional**:

- **Dark-first design** — deep background (`#0a0a0a`) with lime-green (`#B8FF2C`) accents
- **Grain overlay** — subtle film-grain texture adds depth and avoids flat UI syndrome  
- **GSAP scroll-snapping** — pinned sections create a cinematic scroll experience
- **Glassmorphism cards** — `backdrop-filter: blur` + subtle borders throughout
- **Staggered word animations** — headline words animate in independently on load
- **Scroll-driven exits** — sections don't just appear, they also *leave* with intention

---

## 👤 About the Founder

**Ismail Sajid** is the developer and architect behind AutoAgent. After working with 40+ e-commerce stores, he noticed the same three problems destroying revenue at every scale: abandoned carts, dead inventory, and VIP customers treated like everyone else.

AutoAgent is his answer — not another dashboard, not another integration, but actual autonomous agents that make decisions and take actions.

- 📧 [ismail@autoagent.ai](mailto:ismail@autoagent.ai)
- 💼 [LinkedIn](https://linkedin.com/in/ismail-sajid)
- 🐦 [Twitter / X](https://twitter.com/ismailsajid)
- 💻 [GitHub](https://github.com/Ismail-2001/E-commerce-Automation-Agent)

---

## 📄 License

This landing page is proprietary. The AutoAgent core platform is separately licensed.

---

<div align="center">

**Built with precision. Deployed with purpose.**

*© 2025 AutoAgent — All rights reserved.*

</div>
