# Patient Registration App

This is a full-stack application built as a solution for a coding challenge. It allows for the registration of new patients, including their personal details and a document photo. The application is fully containerized with Docker for easy and reproducible setup.

## Tech Stack

**Backend:**
- Node.js
- Express.js
- TypeScript
- PostgreSQL (managed via Supabase)
- Prisma ORM
- Zod (for validation)
- Supabase Storage (for file uploads)
- Nodemailer + Mailtrap (for email testing)

**Frontend:**
- React (with Vite)
- TypeScript
- Tailwind CSS
- TanStack Query (React Query)
- React Hook Form + Zod
- React Router
- Axios
- Radix UI (for headless UI primitives)
- Framer Motion (for animations)

**DevOps:**
- Docker & Docker Compose

## Features

- **Patient Registration:** A complete flow to register new patients with validation.
- **File Uploads:** Drag-and-drop support for document photos, stored in Supabase Storage.
- **Database Persistence:** Patient data is securely stored in a PostgreSQL database.
- **Asynchronous Emails:** Confirmation emails are sent upon successful registration without blocking the user response.
- **Dynamic UI:** A responsive interface showing a list of patients with expandable cards to view details.
- **Client & Server Validation:** Robust data validation on both the frontend (React Hook Form/Zod) and backend (Express/Zod).
- **Containerized Environment:** The entire application stack is orchestrated with Docker Compose for a one-command setup.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
- Git

## Getting Started

Follow these steps to get the application running locally.

**1. Clone the repository:**
```bash
git clone git@github.com:estebanperezzz/patient-registration.git
cd patient_registration
```

**2. Backend Configuration:**
- Navigate to the backend directory: `cd backend`
- Create your own environment file by copying the example:
  ```bash
  cp .env.example .env
  ```
- Open the new `.env` file and fill in your own credentials for the database (Supabase), file storage (Supabase), and Mailtrap.

**3. Frontend Configuration:**
- Navigate to the frontend directory: `cd ../frontend`
- Create the environment file:
  ```bash
  cp .env.example .env
  ```
- The default `VITE_API_BASE_URL` should work for local Docker setup, but you can change it if needed.

**4. Run the Application with Docker:**
- Navigate back to the root directory of the project: `cd ..`
- Run the following command to build the images and start the containers:
  ```bash
  docker-compose up --build
  ```
- The first time you run this, it will take a few minutes to download the base images and install all dependencies.

## Accessing the Application

Once the containers are up and running:
- **Frontend:** Open your browser and go to `http://localhost:5173`
- **Backend API:** The API will be accessible at `http://localhost:3001`

To stop the application, go to the terminal where `docker-compose` is running and press `Ctrl+C`.