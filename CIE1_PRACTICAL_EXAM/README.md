# CIE1 Practical Exam — Employee Leave Management System

A full-stack employee leave management application built for ITUE301 Advanced Web Development Frameworks.

## Stack
- React + Vite + React Router
- Express REST API
- MongoDB + Mongoose
- JWT authentication, request logging, auth guard, structured error handling

## Features
- Reusable leave request cards with status badges
- Login, protected employee/HR routes, and controlled leave form
- Dashboard with leave balance, status filtering, and client-side search
- REST API under `/api/v1`
- Employee, LeaveType, and LeaveRequest schemas with validation and populated references
- Balance checks and structured validation errors

## Run locally
Requirements: Node.js 18+ and MongoDB.

1. Copy `server/.env.example` to `server/.env` and set `MONGO_URI` and `JWT_SECRET`.
2. In one terminal:
   ```bash
   cd server
   npm install
   npm run seed
   npm run dev
   ```
3. In another terminal:
   ```bash
   cd client
   npm install
   npm run dev
   ```
4. Open the Vite URL shown in the terminal.

Seed accounts:
- Employee: `aarav@techsolutions.com` / `Password123!`
- HR: `hr@techsolutions.com` / `Password123!`

## API
- `POST /api/v1/auth/login`
- `GET /api/v1/leave-types`
- `GET /api/v1/leaves`
- `POST /api/v1/leaves`
- `PATCH /api/v1/leaves/:id/status`

All protected endpoints require `Authorization: Bearer <token>`.
