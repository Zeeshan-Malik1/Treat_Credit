# Treat Credit

A responsive website with Home, Menu, Order and Contact pages, built with HTML, CSS and JavaScript. All supplied assets stay in `images/`.

Run `npm install`, then `npm start`, and open http://localhost:3000. No build step is required.

Run `npm test` with the server running to check ten viewport sizes and all five menu sheets in Chrome. Run `node tests/responsive.cjs --webkit --open` to also test WebKit and open Chrome; install WebKit first with `npx playwright install webkit`.

Menu content is transcribed in `menu-data.js`. The Ferrero Rocher brownie tray has no visible price in menu5.jpeg, so no price is invented. Opening hours follow contact.jpeg, as confirmed. Shared navigation and hours live in `app.js`.
