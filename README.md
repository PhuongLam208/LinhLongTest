## Project Name: Inventory Management System

A simple Inventory Management web application with **role-based access**, built using:

| Layer     | Technology             | Version | Port  |
|-----------|------------------------|---------|-------|
| Frontend  | ReactJS (Vite)         | 19.2.0  | 5173  |
| Backend   | ASP.NET Core Web API   | 9.0.100 | 5133  |
| Database  | SQLite                 | -       | -     |
| ORM       | Entity Framework Core  | -       | -     |

---

## Test Accounts (For Login)

| Username | Password  | Role   | Permission                       |
|---------|------------|--------|----------------------------------|
| staff1  | 123!@#qwe  | Viewer | Can view inventory only          |
| admin   | 123!@#qwe  | Editor | Can create, update, delete items |

---

## Run Project

### Backend (.NET API)

***Install Dependencies***
```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package BCrypt.Net-Next
```
***Database Migration***
```bash
dotnet ef migrations add InitCreate
dotnet ef database update
```
***Run Backend***
```bash
dotnet run
```


### Frontend (ReactJS)
```bash
cd inventory-frontend
npm install
npm install axios
npm run dev
```