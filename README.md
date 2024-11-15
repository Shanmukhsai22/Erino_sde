# Contact Management System 

This is a Contact Management feature for a CRM system that helps users manage customer or client contact details. It includes functionality to add, view, update, and delete contacts. This tool is designed to help businesses track relationships and ensure the contact list remains up-to-date.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Database Setup](#database-setup)
- [Challenges Faced](#challenges-Faced)

## Project Overview

This Contact Management system allows users to:
- Add a new contact with essential details like name, email, phone number, company, and job title.
- View a list of all contacts in a table with pagination and sorting.
- Edit contact details when needed.
- Delete outdated or duplicate contacts.

The project is divided into two parts:
1. **Frontend**: Built with ReactJS using Material UI (MUI) components.
2. **Backend**: Built with NodeJS to handle API requests and interact with the database.

## Features

- **Contact Form**: Allows users to add new contacts with the following fields: First Name, Last Name, Email, Phone Number, Company, Job Title.
- **Contacts Table**: Displays all contacts with pagination, sorting, and action buttons (edit, delete).
- **CRUD Operations**: Perform Create, Read, Update, and Delete actions on contact data.
- **Error Handling**: Includes validation for required fields and appropriate error messages.

## Tech Stack

- **Frontend**: ReactJS, Material UI (MUI), Axios
- **Backend**: NodeJS, Express
- **Database**: MongoDB
- **Version Control**: Git

## Getting Started

To run the project locally, follow these steps:

### Frontend Setup

1. Navigate to the `client/src` directory:
   ```bash
   cd client/src
2. Install dependencies:
   ```bash
   npm install
3. Start the frontend server:
   ```bash
   npm run start

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
2. Install dependencies:
   ```bash
   npm install
3. Start the frontend server:
   ```bash
   npm run server

### Database Setup

Ensure you have MongoDB set up and running.
Add your MongoDB connection settings in the sever.js file.

### Challenges Faced

To handle API's correctly and test them on **POSTMAN**






