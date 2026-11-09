# Oussama Khaldi — Portfolio

Personal portfolio of **Oussama Khaldi**, AI R&D Engineer and MSc Machine Learning for Data Science student at Université Paris Cité.

The site is built to look and feel like VS Code: pages open as editor tabs, there is a file explorer, an activity bar, a status bar, an interactive terminal, and switchable color themes.

## Credits

This project is a fork of [DiegoBravoH/DiegoBravoH.github.io](https://github.com/DiegoBravoH/DiegoBravoH.github.io) by Diego Bravo, released under the MIT License. The layout, VS Code–style components and themes come from that template; the content, data and some pages have been adapted for my own profile.

## Pages

| Tab             | Route       | Content                                                    |
| --------------- | ----------- | ---------------------------------------------------------- |
| `home.jsx`      | `/`         | Introduction, specialization, education and experience     |
| `resume.html`   | `/resume`   | CV viewer with PDF download                                 |
| `contact.yml`   | `/contact`  | Email, LinkedIn, GitHub, Google Scholar, ORCID, ResearchGate |
| `projects.py`   | `/projects` | Research, LLM/RAG, AI platform and data science projects   |
| `papers.json`   | `/papers`   | Publications                                                |
| `github.md`     | `/github`   | Live repositories and contribution calendar                |

A settings page (`/settings`) lets visitors switch between eight editor themes.

## Tech stack

- [Next.js](https://nextjs.org/) and React
- CSS Modules with theme variables
- [react-pdf](https://github.com/wojtekmaj/react-pdf) for the CV viewer
- [react-github-calendar](https://github.com/grubersjoe/react-github-calendar) and the GitHub REST API
- [tsParticles](https://particles.js.org/) for the home page background

## Project structure

```
components/   UI components (titlebar, sidebar, explorer, tabs, terminal, cards)
context/      Terminal open/close state
data/         All site content as JSON (experience, papers, projects)
lib/          Helpers (asset path prefixing for the basePath)
pages/        One file per route
public/       Images, icons, CV and theme previews
styles/       CSS Modules and theme definitions
```

## Editing content

| What               | Where                                                            |
| ------------------ | ---------------------------------------------------------------- |
| Experience         | `data/experience.json`                                           |
| Papers             | `data/published-papers.json`                                     |
| Projects           | `data/research-projects.json`, `ai-projects.json`, `platform-projects.json`, `data-projects.json` |
| Photo / CV         | `public/oussama.jpg`, `public/CV_Oussama_Khaldi.pdf`             |
| Contact links      | `pages/contact.jsx`, `components/Bottombar.jsx`                  |

Citation counts are hidden for now. To show them, set `SHOW_CITATIONS = true` in `pages/papers.jsx` and fill in the `citations` field of each paper.

The GitHub page uses the `RobotTopDZ` account by default; set `NEXT_PUBLIC_GITHUB_USERNAME` to use another one.

## Running locally

Requires Node.js 22.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out (served under /portfolio)
```

## Deployment

The site is deployed to GitHub Pages at **https://robottopdz.github.io/portfolio/** by the workflow in `.github/workflows/nextjs.yml`, which builds and publishes `./out` on every push to `main`.

Production builds use `basePath: '/portfolio'` (see `next.config.js`). Files in `public/` must be referenced through `lib/asset.js` (e.g. `asset('/oussama.jpg')`) so they get that prefix; `next/link` handles page links automatically. If the repository is renamed, update `basePath` in `next.config.js`.

## License

MIT. See [LICENSE](LICENSE).
