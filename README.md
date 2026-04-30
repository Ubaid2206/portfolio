# Ubaid Ullah — Portfolio

> Personal portfolio website built with **React + Vite + TypeScript**, converted from the original Nuxt 4 fullstack project. Clean frontend-only setup — no auth, no sockets, no Electron, no Capacitor.



---

## 🚀 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 6 | Build tool & dev server |
| TypeScript | 5.8 | Type safety |
| React Router DOM | 7 | Client-side routing |
| SCSS (Sass) | 1.99 | Styling with variables & mixins |
| Howler.js | 2.2 | Game sound effects |
| canvas-confetti | 1.9 | Win celebration effect |
| react-toastify | 11 | Toast notifications |

---

## 📁 Project Structure

```
portfolio-react/
├── public/
│   ├── imgs/          # Images, SVG icons
│   ├── fonts/         # FiraCode font
│   └── sounds/        # Train & notification sounds
├── src/
│   ├── assets/
│   │   ├── scss/      # Global styles, variables, mixins
│   │   └── sounds/    # Snake game sound files
│   ├── components/
│   │   ├── game/      # SnakeGame + GameContainer
│   │   ├── layout/    # NavBar + FooterComp + Layout
│   │   ├── pages/     # HomePage, AboutPage, ProjectsPage, ContactPage
│   │   └── ui/        # FoldableTab, ProjectsSidebar, SelectedTabs, FilteredProjects
│   ├── data/
│   │   └── projects_info.json   # Projects data
│   ├── App.tsx        # Router setup
│   └── main.tsx       # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📦 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/bader-idris/portfolio-react.git
cd portfolio-react

# Install dependencies
npm install

# Start dev server
npm run dev
```

Dev server will start at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output goes to `dist/` folder. Preview production build:

```bash
npm run preview
```

---

## 🗺️ Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Intro + playable Snake game |
| `/about/personal` | About | Bio, code snippet, contact info |
| `/about/hobbies` | About | Hobbies section |
| `/about/professional` | About | Professional background |
| `/projects` | Projects | Filterable projects grid |
| `/contact` | Contact | Contact form + social links |

---

## 🎮 Snake Game

The home page features a fully playable Snake game:

- **Keyboard:** Arrow keys or WASD
- **Mobile:** On-screen arrow buttons
- **Goal:** Eat all 10 food dots to win
- **Sounds:** Eating, wall hit, victory, game over
- **Win effect:** Confetti 🎉

---

## 🎨 SCSS Architecture

Global variables and mixins are auto-injected into every component via Vite's `additionalData`:

```scss
// Available everywhere via vite.config.ts
$primary1, $primary2, $secondary1, $accent1 ...  // colors
$main-font, $headline-size ...                     // typography
@mixin mobile { ... }                              // breakpoints
@mixin flex-container { ... }                      // layout helpers
```

Key color palette:

| Variable | Value | Use |
|----------|-------|-----|
| `$primary1` | `#010c15` | Page background |
| `$primary2` | `#011221` | Card/navbar background |
| `$secondary1` | `#607b96` | Body text |
| `$secondary4` | `#e5f3ff` | Highlighted text |
| `$accent1` | `#43d9ad` | Green accent (food, links) |
| `$accent2` | `#4d5bce` | Blue-purple (snake body) |
| `$lines` | `#1e2d3d` | Borders |

---

## 🔧 Environment Variables

This is a frontend-only project. No `.env` required for local dev.

If you connect a backend for the contact form, set:

```env
VITE_API_URL=https://your-backend.com
```

Then update the fetch URL in `ContactPage.tsx`:

```ts
const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/received_emails`, { ... })
```

---

## 📬 Contact Form

The contact form POSTs to `/api/v1/received_emails`. This expects a backend (Node.js/Nitro) running alongside. For frontend-only deployments, you can replace it with [EmailJS](https://www.emailjs.com/) or [Formspree](https://formspree.io/).

---



## 📄 License

MIT — see [LICENSE](./LICENSE)

---

## 🤝 Contributing

This is a personal portfolio. Issues and suggestions are welcome via GitHub Issues.
