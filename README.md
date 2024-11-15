# Car Management System

This is a Car Management application built using React.js, Node.js, Express, and MongoDB. The API allows users to manage cars, including creating, updating, deleting, and retrieving car information. It also includes user authentication with JWT and provides routes for handling car-related operations.

## Deployed Application
You can access the deployed project here:  
[User Interface](https://car-management-system-lyart.vercel.app/)

You can access the Backend API here:  
[Backend API](https://car-management-system-jlz6.onrender.com/)

# Important thing to notice when you are running locally
#### change the prefix of api key from every jsx and js file of frontend , change from `https://car-management-system-jlz6.onrender.com/` to your local host for example this is my localhost `http://localhost:1000/`

## Features

- User authentication using JWT.
- Car management (create, update, delete, retrieve).
- Add and delete images for cars.
- Filter important cars.
- MongoDB as the database.
- Deployed on Vercel for the frontend and Render for the backend.

## API Endpoints

### Auth
- **Sign In**: `POST /api/v1/sign-in`
  - Body: `{ username, email, password }`
- **Log In**: `POST /api/v1/log-in`
  - Body: `{ username, password }`

### Cars
- **Create**: `POST /api/v2/add-car`
  - Headers: `id, authorization`
  - Body: `{ title, desc }`
- **Get All**: `GET /api/v2/get-all-cars`
  - Headers: `id, authorization`
- **Delete**: `DELETE /api/v2/delete-car/:id`
  - Headers: `id, authorization`
- **Update**: `PUT /api/v2/update-car/:id`
  - Headers: `id, authorization`
  - Body: `{ title, desc }`

### Images
- **Create**: `POST /api/v3/add-image`
  - Headers: `id, authorization`
  - Body: `{ title, desc }`
- **Update**: `PUT /api/v3/update-image/:id`
  - Headers: `id, authorization`
  - Body: `{ title, desc }`


## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: react.js 
- **Database**: MongoDB (with Mongoose ORM)
- **Authentication**: JWT (JSON Web Token)

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.16.1 or higher)
- [MongoDB](https://www.mongodb.com/)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-link.git](https://github.com/Ak-vishwakarma-01/Car-Management-System


## How to run the project
  1. Run the command `npm i` inside both folder forntend and backend
  2. then  Use `npm app.js` for backend and `npm run dev` for frontend
