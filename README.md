## Project Name: Inventory Management System

A simple Inventory Management web application with **role-based access**, built using:

| Layer     | Technology             | Version | Port  |
|-----------|------------------------|---------|-------|
| Frontend  | ReactJS (Vite)         | 19.2.0  | 5173  |
| Backend   | ASP.NET Core Web API   | 9.0.100 | 5133  |
| Database  | SQLite                 | -       | -     |
| ORM       | Entity Framework Core  | -       | -     |

---

## Features

### 🔐 Authentication
- Login with username and password
- Two user roles:
  - **Viewer** → Only view Inventory
  - **Editor** → Create, Update, Delete Items

---

## Run Project

### Backend (.NET API)
```bash
cd inventoryApi
dotnet build
dotnet run
```

### Frontend (ReactJS)
```bash
cd inventory-frontend
npm install
npm run dev
```