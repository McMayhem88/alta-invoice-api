# Altametrics Invoice App Project

## Overview
This project is to for a full stack web application designed to manage invoices.

## **Table of Contents**

<!-- TOC -->
* [Altametrics Invoice App Project](#altametrics-invoice-app-project)
  * [Overview](#overview)
  * [**Table of Contents**](#table-of-contents)
  * [**Technologies Used**](#technologies-used)
    * [**Backend**](#backend)
    * [**Frontend**](#frontend)
    * [**DevOps**](#devops)
  * [**Project Structure**](#project-structure)
  * [**Prerequisites**](#prerequisites)
  * [**Getting Started**](#getting-started)
    * [**Step 1: Clone the Repository**](#step-1-clone-the-repository-)
    * [**Step 2: Run Docker Compose**](#step-2-run-docker-compose)
    * [**Step 3: Seed the Database**](#step-3-seed-the-database)
  * [**Usage**](#usage)
  * [**Database Schema**](#database-schema)
  * [**Contact**](#contact)
<!-- TOC -->

---

## **Technologies Used**

### **Backend**
- **Node.js**
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **TypeScript**
- **JSON Web Tokens (JWT)**: For authentication.

### **Frontend**
- **React**
- **Vite**
- **NGINX**: Web server for serving the frontend
- **TypeScript**
- **Redux Toolkit**: State management.
- **React Query**: Data fetching and caching.
- **Zod**: Schema validation.
- **Tailwind CSS**: CSS framework.

### **DevOps**
- **Docker**: 

---

## **Project Structure**
```
alta-invoice-api/
├── backend-project/
│   ├── prisma/
│   ├── src/
│   │   ├── auth/
│   │   ├── invoices/
│   │   ├── prisma/
│   │   ├── users/
│   │   └── utils/
│   ├── test/
│   ├── .env
│   ├── Dockerfile
│   └── entrypoint.sh
├── frontend-project/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── types/
│   │   └── utils/
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```
The project is split up into two standalone child projects:
- **Backend Project** - Handles the database and the backend functionality of the app
  - `prisma/`: Holds the database schema and seed script
  - `src`: Root for all the source code on the backend
    - `auth`: Source code related to authorization
    - `invoices`: Source code for handling invoices
    - `prisma`: Source code for defining a shared service for Prisma ORM
    - `users`: Source code related to user management
    - `utils`: Commonly used utility libraries
  - `test`: Testing framework (I'll be honest, I didn't touch this at all)
  - `Dockerfile`: The Dockerfile to for the backend project
  - `entrypoint.sh`: Bash script to run after the backend container is initialized
- **Frontend Project** - Handles the frontend display and interaction for the users
  - `src`: Root for all the source code for the frontend
    - `api`: Root directory for the frontend API
    - `components`: Root directory for all the React components
    - `constants`: Holds commonly used constants (such as route paths)
    - `hooks`: React hook definitions
    - `pages`: React pages for the frontend (Homepage, Invoice List, Login)
    - `store`: Holds all the Redux state files
    - `types`: Defines commonly used interfaces
    - `utils`: Commonly used utility libraries
  - `Dockerfile`: The Dockerfile to for the frontend project
  - `nginx.conf`: Custom configuration for NGINX to serve React on the frontend
  
---

## **Prerequisites**

Ensure you have the following installed on your machine:

- **Node.js** (latest LTS version recommended)
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **Git**

---

## **Getting Started**

### **Step 1: Clone the Repository** 

```bash
git clone https://github.com/McMayhem88/alta-invoice-api.git
cd alta-invoice-api
```

### **Step 2: Run Docker Compose**

The root Docker Compose file allows for a one-click setup of the whole project on Docker.

Navigate to the root directory of the project 
```
✅ alta-invoice-api/
├── backend-project/
├── frontend-project/
├── docker-compose.yml
└── README.md
```

From the project root directory, execute:

```bash
docker-compose up --build
```

This should handle the entire setup of the backend, frontend and database.

| **Container**      | **Port** | **Description**               |
|:-------------------|:--------:|:------------------------------|
| `alta_postgres_db` |   5432   | Holds the PostgreSQL database |
| `alta_backend`     |   3000   | Serves the backend API        |
| `alta_frontend`    |   5173   | Serves the frontend UI        |


- **Frontend**: Accessible at [`http://localhost:5173`](http://localhost:5173)
- **Backend**: Accessible at [`http://localhost:3000`](http://localhost:3000)
  - Use Postman or curl to access the endpoints on the backend

### **Step 3: Seed the Database**

Once the Docker containers are up and running, open a terminal in the `alta_backend` container and run the seed script.
```bash
npm run seed
```
You should see the following output in your terminal
```bash
/app # npm run seed

> backend-project@1.0.0 seed
> node dist/prisma/seed

Seeded 18 invoices and 1 user with ID: 1
```

With that, your setup should be complete and the application is ready to use. Go to the [Frontend Site](http://localhost:5173/login) to begin by logging in.

## **Usage**

1. **Access the Application:**

    - **Frontend URL:** [`http://localhost:5173`](http://localhost:5173)

2. **Login with Demo Credentials:**

    - **Email:** `test@test.com`
    - **Password:** `test1234`

   *(Ensure that you have run the seed script before logging in.)*

3. **Post-Login:**

   Upon successful login, you will be redirected to the `/invoices` page, where you can view and manage your invoices.

## **Database Schema**
```prisma
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  password String
  name     String
}

model Invoice {
  id          Int      @id @default(autoincrement())
  vendor_name String
  amount      Decimal
  due_date    DateTime
  description String
  user_id     Int
  paid        Boolean  @default(false)
}
```

---

## **Contact**

For any questions or issues regarding this project, please contact:

**Chuck McMackin**  
Full Stack Developer  
Email: [mcmayhem688@gmail.com](mailto:mcmayhem688@gmail.com)  
Portfolio: [chuckmcmackin.com](https://chuckmcmackin.com/)  
LinkedIn: [linkedin.com/in/chuck-mcmackin-46686439](https://www.linkedin.com/in/chuck-mcmackin-46686439/)  
GitHub: [github.com/McMayhem88](https://github.com/McMayhem88)

---