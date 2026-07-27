# 🛍️ Fashion E-Commerce Platform — DBMS Lab Project

A full-stack, single-vendor fashion e-commerce application designed for a DBMS Lab project. Built with a modular React.js user interface and a Python API backend backed by a relational database (PostgreSQL / Oracle).

---

## 🏗️ System Architecture


```

[ React.js + Tailwind CSS ]  <--- JSON / REST API --->  [ Python Backend (Django/FastAPI) ]  <--->  [ PostgreSQL / Oracle DB ]

```

- **Front-End:** React.js, Tailwind CSS, HTML5, Context API
- **Back-End:** Python (RESTful API, Business & Cart Logic, Authentication)
- **Database:** PostgreSQL / Oracle DB (Normalized Schema, Relational Constraints)

---

## ✨ Key Features

### 💻 Client / Front-End
- **Storefront & Catalog:** Dynamic product grid, search bar, and fashion categories (Men & Women apparel).
- **Interactive PDP:** Size/color selection, multi-image view, and "Add to Cart" triggers.
- **Cart & Checkout:** Client-side cart drawer, payment method selection (COD, MFS, Bank), and checkout verification.
- **Customer & Admin Dashboards:** User profile management and an admin order management table.

### ⚙️ Back-End & Database (In Progress)
- **API Endpoints:** User authentication (`/api/auth`), product catalog queries (`/api/products`), order placement (`/api/orders`).
- **Database Schema:** Tables for `Users`, `Products`, `Categories`, `Orders`, `OrderItems`, and `Payments`.
- **Relational Integrity:** Foreign key constraints, server-side cart calculations, and unique username verification.

---

## 🚀 Getting Started

### 1. Front-End Setup
```bash
# Clone the repository
git clone [https://github.com/abdullahalmonzil/E-commerce-site-for-dbms-lab.git](https://github.com/abdullahalmonzil/E-commerce-site-for-dbms-lab.git)
cd E-commerce-site-for-dbms-lab

# Install JavaScript dependencies
npm install

# Run Vite development server
npm run dev

```

### 2. Back-End Setup (Python Team)

```bash
# Set up Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run migrations and start server
python manage.py migrate  # (Or equivalent framework command)
python manage.py runserver

```

---

## 👥 Team & Roles

* **Front-End Engineer:** UI/UX, React Components, Tailwind Styling, State Management
* **Back-End & DB Engineers:** Database Modeling (ERD/Schema), Python API Development, SQL Queries

```