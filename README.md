# Holidaze - A Modern Accommodation Booking Platform

Holidaze is a modern accommodation booking platform built with **Vue 3** and **Tailwind CSS 4**, offering a smooth and intuitive experience for travelers and venue managers.

The goal of this project is to deliver a high-quality, responsive front-end that demonstrates both strong technical and visual design capabilities.
It connects to the official Holidaze API to manage venues, bookings, and user profiles.

---

## Features

### All Users

- Browse all available venues
- Search for specific venues by name or location
- View detailed venue pages with availability calendars
- Register as a **Customer** or **Venue Manager** using a `stud.noroff.no` email

### Customers

- Log in / Log out
- Create new bookings
- View upcoming bookings
- Update profile avatar

### Venue Managers

- Log in / Log out
- Create, edit and delete venues
- View bookings for their managed venues
- Update profile avatar

---

## Tech Stack

| Technology                  | Purpose                           |
| --------------------------- | --------------------------------- |
| **Vue 3 (Composition API)** | Core front-end framework          |
| **Vue Router**              | Page routing and navigation       |
| **Pinia**                   | State Management                  |
| **Tailwind CSS 4**          | Styling and layout                |
| **Vite**                    | Fats build and development server |
| **Holidaze API**            | Backend and data source           |

---

## Links

Figma Design
https://www.figma.com/design/CIZptA50V5ffryqXbxGIEW/Holidaze?node-id=4-446&t=Anp89nZOZ60OjxLh-1

Project Kanban Board
https://github.com/users/anneloviseramstad/projects/5

Project Roadmap
https://github.com/users/anneloviseramstad/projects/5/views/2


## Installation

### 1. Clone the repository

```bash
git clone https://github.com/anneloviseramstad/project-exam-2.git
```

### 1. Clone the repository

```bash
git clone https://github.com/anneloviseramstad/project-exam-2.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env file

Add your API base URL and other environment variables:

```bash
VITE_API_BASE_URL=https://api.noroff.dev/api/v1/holidaze
```

### 4. Start the development server

```bash
npm run dev
```
