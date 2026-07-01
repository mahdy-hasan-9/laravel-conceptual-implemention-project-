# Advanced Laravel API & React Ecosystem

[![Laravel Version](https://img.shields.io/badge/Laravel-11.x-FF2D20?logo=laravel)](https://laravel.com)
[![React Version](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A robust, -ready conceptual implementation demonstrating architectural best practices in modern web development. This project couples a high-performance **Laravel API** backend with a dynamic, server-side rendered **React.js** frontend powered by **Ant Design**.

---

## 🚀 Key Architectural Concepts Implemented

### 🏙️ Backend Architecture (Laravel API)
* **Service-Layer Pattern:** Decoupled business logic from controllers into dedicated `Service Classes` for clean, maintainable, and testable CRUD operations.
* **RESTful API Resources:** Structured API responses using Laravel Eloquent Resources to ensure strict data mutation and consistency.
* **Advanced Eloquent Relations:** Complex database modeling featuring robust **One-to-Many** and **Many-to-Many** relationships.
* **Database Seeding & Factories:** Comprehensive database seeders for rapid local environment setup and testing.

### ⚡ Real-Time & Asynchronous Operations
* **Laravel Reverb & Pusher.js:** Native WebSockets infrastructure driving real-time frontend updates.
* **Event-Driven Architecture:** Decoupled workflows utilizing internal **Events** and **Listeners**.
* **Background Queue Workers:** Offloaded heavy processing (such as automated **Email Sending**) to asynchronous background jobs to optimize request-response lifecycles.
* **System Notifications:** Multi-channel system notifications keeping users informed in real time.

### 🔍 Security & Search Performance
* **Granular RBAC:** -grade Role-Based Access Control implemented via the **Spatie Role & Permission** package.
* **Instant Full-Text Search:** High-performance, lightning-fast global search powered by **Meilisearch**.

### 💻 Frontend Architecture (React.js)
* **Ant Design (AntD):** A polished, professional  UI kit handling complex states and inputs layout.
* **Server-Side Rendered Data Tables:** Server-optimized datatables capable of handling large-scale pagination, sorting, and filtering directly through API requests.

---

## 🛠️ Tech Stack & Ecosystem

| Layer | Technologies Used |
| :--- | :--- |
| **Backend Framework** | Laravel (PHP) |
| **Frontend Library** | React.js |
| **UI Framework** | Ant Design (AntD) |
| **Real-Time WebSockets** | Laravel Reverb / Pusher.js |
| **Search Engine** | Meilisearch |
| **Access Control** | Spatie Laravel Permissions |

---

## 📂 Repository Structure Note

> 💡 **Important:** The complete production-ready codebase, including all backend API logic, migrations, and React components, is fully maintained inside the `latest` branch.

---

## ⚙️ Getting Started & Installation

### Prerequisites
* PHP >= 8.2
* Node.js & NPM
* Composer
* Meilisearch Instance

### Backend Installation

1. **Clone the repository and navigate to the root directory:**
   ```bash
   git clone <your-repository-url>
   cd <project-directory>
