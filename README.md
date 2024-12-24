# Hackathon Organizer Platform 

This is a full-stack application that allows users to create, view, and update challenges. The front-end is built with React, and the back-end is powered by Node.js with an Express server and MySQL database. It supports file uploads and basic validation.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Backend API Endpoints](#backend-api-endpoints)
- [File Upload](#file-upload)
- [Error Handling](#error-handling)
- [Running the Application](#running-the-application)

## Features
- **React Frontend**: Handles routing, forms, and challenge listings.
- **Node.js/Express Backend**: Manages MySQL database interaction, challenge creation, and challenge details update.
- **Image Upload**: Allows users to upload challenge-related images.
- **Validation**: Uses express-validator to ensure that form inputs meet certain requirements.
- **MySQL Database**: Stores challenge data (name, description, start and end dates, etc.).
  
## Technologies Used
- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: MySQL
- **File Upload**: Multer for handling image uploads
- **CORS**: For handling cross-origin requests between the client and server
- **Validation**: Express Validator for input validation
- **Body Parser**: For parsing form data
- **dotenv**: For environment variables

## Project Setup

### 1. Clone the Repository
First, clone the repository:

```bash
git clone https://github.com/Yash43211234/AI-Planet.git
```

### For Frontend
```bash
cd Frontend
```

### For Backend
```bash
cd Backend
```
### Environment Variables

Create a .env file in the backend directory and add the following:

```bash
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASS=your-database-password
DB_NAME=your-database-name
PORT=3002
```
This will allow you to configure the database connection and set the port for the backend server.

#### Backend API Endpoints

- 1. /challenges [GET]
Fetches all challenges.

```bash Backend API Endpoints
1. /challenges [GET]
Fetches all challenges.
```
- 2. /challenge/:id [GET]
Fetches a specific challenge by ID.

```bash
{
  "id": 1,
  "challengeName": "Challenge 1",
  "startDate": "2024-01-01",
  "endDate": "2024-02-01",
  "description": "This is the first challenge",
  "image": "/uploads/filename.jpg",
  "levelType": "Beginner"
}
```

- 3. /submit [POST]

```bash
{
  "challengeName": "New Challenge",
  "startDate": "2024-02-01",
  "endDate": "2024-03-01",
  "description": "Description of the challenge",
  "levelType": "Intermediate"
}
```

### Response:

```bash
{
  "message": "Challenge submitted successfully!"
}

```

### File Upload
- The file upload functionality is handled by Multer. Images uploaded through the form are saved in the uploads folder. Files are validated to ensure that only .jpg and .png files are allowed, and the size limit is set to 5MB.

### File Path
- Uploaded files are saved under the uploads directory, with a unique filename based on the current timestamp.

#### Example Image URL:
```bash 
/uploads/1625621834567.jpg
```

### Error Handling
- Multer Errors: If a file is not valid, a response with a 400 status and the error message will be returned.
- Express Validator Errors: If any form field fails validation, an error response will be sent with a 400 status, along with the validation error messages.

### Running the Application
- 1. Start the Backend Server
In the backend directory, start the server
```bash
npm start

The frontend will run on http://localhost:3000.
```


## Now, you can access the application in your browser and interact with it.
