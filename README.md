# Harsh Vardhan Arya — Portfolio

Personal portfolio website. Built with vanilla HTML5, CSS3, and JavaScript (ES6+). No build tools — open `index.html` and it works.

---

## Quick Start

```bash
# Option 1: open directly
open index.html

# Option 2: serve locally (avoids any CORS issues)
npx serve .
# or
python3 -m http.server 8000
```

---

## File Structure

```
portfolio/
├── index.html              ← All sections live here
├── css/
│   ├── style.css           ← Design system + component styles
│   ├── animations.css      ← Keyframes + scroll-reveal + entrance
│   └── responsive.css      ← Breakpoints (mobile/tablet/desktop)
├── js/
│   ├── main.js             ← Loader, navbar, cursor, scroll, easter egg
│   ├── animations.js       ← Intersection Observer, skill filter, particles
│   └── typing.js           ← Typewriter effect
├── assets/
│   ├── icons/              ← Place any custom SVG icons here
│   └── images/             ← Place project screenshots or profile photo here
└── README.md
```

---

## How to Update Content

Every editable zone is marked with `✏️ EDIT:` in the source. Search for that string to find every place that needs a real value.

### Personal Info
| What | Where |
|------|-------|
| Name | `index.html` — hero `<h1>` and footer |
| Email | `index.html` — hero socials, contact section (two places each) |
| LinkedIn URL | `index.html` — hero socials, about, contact |
| GitHub URL | `index.html` — hero socials, about, contact |
| Resume link | `index.html` — navbar `Resume` button and hero `Download Resume` button |
| Loader initials | `index.html` — `.loader__initials` |
| Nav logo initials | `index.html` — `.navbar__logo` |

### Typewriter Roles
Edit the `ROLES` array in `js/typing.js`:
```js
const ROLES = [
  'Backend Engineer',
  'Distributed Systems',
  'AWS Architect',
  'Problem Solver',
];
```

### Stat Cards (About section)
Update `data-count` attribute on `.stat-card__number` elements in `index.html`. The JS counter animates to that number on scroll.

### Skills
- **Add a skill:** Copy a `.skill-pill` block in `index.html`. Set `data-category` to one of `backend | cloud | frontend | databases`.
- **Add a category:** Add a `<button class="skills__tab" data-filter="newcat">` and set `data-category="newcat"` on related pills.
- **Find devicon class names:** https://devicon.dev

### Projects
Each project card is a `.project-card` block in `index.html`. To add a new project:
1. Copy an existing card block
2. Update: category, title, description, `.project-card__tag` items, GitHub/demo links
3. Add `project-card--featured` class + badge markup if it's a highlight project
4. Adjust `reveal delay-N` for entrance animation timing

### Timeline (Experience & Education)
Each entry is a `.timeline__item` block. To add an entry:
1. Copy an existing block
2. Alternate `data-side="left"` and `data-side="right"` for the alternating layout
3. Use `timeline__dot--work` (blue) for jobs, `timeline__dot--edu` (purple) for education
4. Match the badge class: `timeline__type-badge--work` or `--edu`

### Contact Form
The form uses Formspree by default. To activate:
1. Sign up at https://formspree.io
2. Create a form → get your form ID
3. Replace `YOUR_FORM_ID` in the `action` attribute:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

Alternatively, use `mailto:` for a simple email fallback:
```html
<form action="mailto:your@email.com" method="get" enctype="text/plain">
```

### Easter Egg
The terminal content is in `#easterEggModal` in `index.html`. Update the `.terminal__output` lines.
Trigger: Konami Code — `↑ ↑ ↓ ↓ ← → ← → B A`

---

## Theming

All colors, fonts, and spacing are CSS custom properties in `css/style.css` under `:root`. Change them there and the whole site updates.

```css
/* Example: swap accent to green/teal */
--clr-accent-1: #059669;  /* was purple */
--clr-accent-2: #0d9488;  /* was blue */
--clr-accent-3: #34d399;  /* was cyan */
```

---

## GitHub Pages Deployment

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. Your site will be live at `https://username.github.io/repo-name`
5. Update `og:url` in `index.html` with the live URL

All paths are relative — no config needed.

---

## CDN Dependencies

| Library | Purpose | CDN |
|---------|---------|-----|
| Tailwind CSS | Utility classes | `cdn.tailwindcss.com` |
| Google Fonts | Inter, Plus Jakarta Sans, JetBrains Mono | `fonts.googleapis.com` |
| Devicons | Skill/tech stack icons | `cdn.jsdelivr.net/gh/devicons/devicon` |