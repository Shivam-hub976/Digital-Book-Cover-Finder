# Digital Book Cover Finder

**Live Demo:** https://bookcoverfinder.netlify.app/

## Project Overview

This project is a front-end web application developed for **Independent Bookstore** to modernize their inventory management. Previously, staff relied on manual paper systems and text-only Excel sheets, leading to inefficiencies and data loss.

The Digital Book Cover Finder provides a fast, mobile-responsive interface for floor staff to instantly retrieve and verify book covers, streamlining the process of locating specific physical editions in the store.

## Features & Edge Case Handling

This application was built with strict adherence to Enterprise Technical Requirements (TRD), focusing heavily on the "Unhappy Path" and resilient engineering:

- **Robust API Fetching:** Utilizes native `fetch()` and `async/await` to pull data asynchronously.
- **Input Validation:** Prevents empty submissions and highlights missing data with visual red borders.
- **Network Resilience:** Displays a smooth CSS loading spinner during asynchronous operations to account for spotty 3G connections.
- **Graceful Empty States:** If a search yields no results (or if the network fails), the app renders a clean "No data found" or error message rather than a blank screen.
- **Security:** Implements DOM-based XSS sanitization to neutralize malicious inputs before processing.
- **Telemetry Simulation:** Logs analytics data to the console upon successful completion of a search action.

## Tech Stack

- **HTML5:** Semantic architecture with strict ARIA labeling.
- **CSS3:** Mobile-first, responsive grid layout utilizing a strict monochromatic corporate design system (CSS variables, no rogue hex colors).
- **Vanilla JavaScript (ES6+):** Zero-framework implementation for DOM manipulation and API integration.
- **API Data Source:** [Gutendex API](https://gutendex.com/) (Project Gutenberg).

## Search Indication & Testing Criteria

**Important Note on Data Availability:**
This application interfaces with the Project Gutenberg database, which strictly indexes **Public Domain literature**.

To successfully test the data retrieval and UI rendering, please search for classic literature whose copyright has expired (typically published before 1928).

**Recommended Test Searches (The "Happy Path"):**

- _English:_ "Frankenstein", "Dracula", "Pride and Prejudice"
- _French:_ "Les Misérables"
- _Spanish:_ "Don Quijote"
- _Hindi/Sanskrit:_ "Mahabharata", "Gitanjali"

**Modern Books (The "Unhappy Path"):**
Searching for modern, copyrighted books (e.g., _"Harry Potter"_, _"Atomic Habits"_, _"The Hunger Games"_) will correctly trigger the application's **"No data found"** edge-case state, as these do not exist in the public domain archive.

_Note: As this relies on volunteer-archived historical data, some specific editions may lack digitized JPEG covers._

## Accessibility & Performance

- Achieves a **100% Lighthouse Accessibility Score**.
- Fully keyboard navigable.
- Screen-reader friendly via `aria-live`, `aria-label`, and `.sr-only` utility classes.
- Responsive CSS Grid ensures pixel-perfect rendering across mobile, tablet, and desktop devices.

---

_Engineered for Independent Book Store_
