# Sparrow Messenger Website

Static bilingual (English & German) website for [Sparrow](https://github.com/cbgm/Sparrow), ready to deploy to GitHub Pages under `Sparrow-Messenger/sparrow-messenger`.

## Features

- **Authentic Sparrow Dark Theme**: Uses Sparrow's exact dark palette (`#071A2E`, `#0B2035`, `#102A46`, `#35E6FF`, `#4FD3A3`).
- **Animated Sparrow Mark**: Faithful Canvas2D port of `StartupArtwork.kt`'s `SparrowAnimation` (flight entrance, wing-to-shield morph, repeating pulse ring, and click-to-pulse recoil).
- **Interactive Onion Routing Visualizer**: Animated multi-hop circuit diagram (`2`, `3`, or `5` hops) with onion layer peeling, optional decoy envelopes, and Control Plane discovery.
- **Bilingual (`EN` / `DE`)**: Automatic browser language detection with manual header/footer switcher and `localStorage` persistence.
- **Privacy-Friendly Product Video**: Uses a click-to-load `youtube-nocookie.com` facade alongside a direct YouTube link.
- **Zero Build Required**: Plain HTML5, CSS3, and ES modules.

## Configuring Placeholder Links

Edit [`config.js`](config.js) to replace the placeholder links before publishing:

- `betaTest`: Beta signup or distribution URL (change `isPlaceholder: false`)
- `buyMeACoffee`: Your Buy Me a Coffee / Ko-fi URL (`isPlaceholder: false`)
- `supporter`: Your GitHub Sponsors / Liberapay / recurring support URL (`isPlaceholder: false`)
- `contact`: Your collaboration email (`mailto:...`) or contact page (`isPlaceholder: false`)

## Preview in VS Code

1. Open this folder in VS Code.
2. Run the task **Terminal → Run Task → Preview Sparrow Website (HTTP Server)** (starts `python -m http.server 4173 --bind 127.0.0.1`).
3. Open **Command Palette** (`Ctrl+Shift+P`) → **Simple Browser: Show** → `http://127.0.0.1:4173` (or install the recommended **Live Preview** extension).

## Deploy to GitHub Pages

1. Push this repository to `https://github.com/Sparrow-Messenger/sparrow-messenger` (`main` branch).
2. In the GitHub repository settings, go to **Settings → Pages** and set **Source** to **GitHub Actions** (the workflow is included at [`.github/workflows/pages.yml`](.github/workflows/pages.yml)).
