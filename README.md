

# Request Management System

This is a full stack development project for a Request Management System built with Laravel 10+ for the backend and React (using Vite) for the frontend. The project aims to provide a system for managing service requests with various functionalities, including authentication, CRUD operations, and real-time updates.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Testing the API with Postman](#testing-the-api-with-postman)

## Features

- User authentication (signup, login, logout)
- CRUD operations for managing requests
- Real-time updates for request management
- Responsive and user-friendly frontend interface

## Prerequisites

- PHP 8.x
- Composer
- Node.js 14.x or higher
- NPM or Yarn
- MySQL

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/LasithRandima/parallax_laravel_react.git
cd parallax_laravel_react
```

### Step 2: Setup Backend (Laravel)

1. Install Composer dependencies:

    ```bash
    composer install
    ```

2. Copy the `.env.example` file to `.env` and update the environment variables, especially the database configuration:

    ```bash
    cp .env.example .env
    ```

3. Generate an application key:

    ```bash
    php artisan key:generate
    ```

4. Run the database migrations:

    ```bash
    php artisan migrate
    ```

5. Start the Laravel development server:

    ```bash
    php artisan serve
    ```

### Step 3: Setup Frontend (React)

1. Navigate to the React project directory:

    ```bash
    cd react
    ```

2. Install NPM dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm run dev
    ```

## Running the Project

After completing the installation steps, you can access the Laravel backend at `http://localhost:8000` and the React frontend at `http://localhost:3000`.

## API Endpoints

- `POST /api/signup` - Register a new user
- `POST /api/login` - Login a user
- `POST /api/logout` - Logout the current user
- `GET /api/user` - Get the current authenticated user
- `GET /api/patientrequests` - Retrieve a list of requests
- `POST /api/patientrequests` - Add a new request
- `GET /api/patientrequests/{patientrequest}` - Retrieve a specific request
- `PUT|PATCH /api/patientrequests/{patientrequest}` - Update an existing request
- `DELETE /api/patientrequests/{patientrequest}` - Delete a request

## Testing the API with Postman

1. Open Postman and create a new collection for the Request Management System.

2. Add the following requests to the collection:

    ### Signup
    - Method: POST
    - URL: `http://localhost:8000/api/signup`
    - Body: 
      ```json
      {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password",
        "password_confirmation": "password"
      }
      ```

    ### Login
    - Method: POST
    - URL: `http://localhost:8000/api/login`
    - Body: 
      ```json
      {
        "email": "john@example.com",
        "password": "password"
      }
      ```

    ### Logout
    - Method: POST
    - URL: `http://localhost:8000/api/logout`
    - Headers:
      - `Authorization: Bearer {token}`

    ### Get User
    - Method: GET
    - URL: `http://localhost:8000/api/user`
    - Headers:
      - `Authorization: Bearer {token}`

    ### Get Requests
    - Method: GET
    - URL: `http://localhost:8000/api/patientrequests`
    - Headers:
      - `Authorization: Bearer {token}`

    ### Create Request
    - Method: POST
    - URL: `http://localhost:8000/api/patientrequests`
    - Headers:
      - `Authorization: Bearer {token}`
    - Body:
      ```json
      {
        "created_on": "2024-01-31",
        "location": "Floor 1, Room 101, Block A",
        "service": "Cleaning",
        "status": "NEW",
        "priority": "HIGH",
        "department": "Housekeeping",
        "requested_by": "John Doe",
        "assigned_to": "Jane Smith"
      }
      ```

    ### Get Request by ID
    - Method: GET
    - URL: `http://localhost:8000/api/patientrequests/{patientrequest}`
    - Headers:
      - `Authorization: Bearer {token}`

    ### Update Request
    - Method: PUT|PATCH
    - URL: `http://localhost:8000/api/patientrequests/{patientrequest}`
    - Headers:
      - `Authorization: Bearer {token}`
    - Body:
      ```json
      {
        "status": "IN_PROGRESS"
      }
      ```

    ### Delete Request
    - Method: DELETE
    - URL: `http://localhost:8000/api/patientrequests/{patientrequest}`
    - Headers:
      - `Authorization: Bearer {token}`
