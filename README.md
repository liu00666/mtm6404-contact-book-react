# Contact Book React App

A React-based contact management application built with Firebase Firestore.

## Features

- Add, view, edit, and delete contacts
- Search contacts by name
- Firebase Firestore integration
- Responsive design

## Setup Instructions

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Firestore Database
4. Go to Project Settings > General
5. Add a web app and copy the configuration
6. Update `src/firebase.js` with your Firebase config

### 2. Firestore Database Setup

1. In Firebase Console, go to Firestore Database
2. Create a new database (start in test mode)
3. Create a collection named `contacts`
4. Each contact document will have these fields:
   - `firstName` (required)
   - `lastName` (required) 
   - `email` (required)
   - `createdAt` (auto-generated)

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 5. Populate Database (Optional)

Click the "Populate DB" button on the main page to add sample contacts to your database.

## Project Structure

- `src/firebase.js` - Firebase configuration and initialization
- `src/db.js` - Database operations (CRUD functions)
- `src/components/` - React components
  - `ContactList.jsx` - Display all contacts
  - `ContactForm.jsx` - Add/edit contact form
  - `ContactDetail.jsx` - View contact details
  - `EditContact.jsx` - Edit existing contact

## Database Functions

- `addContact(contactData)` - Add new contact
- `getContacts()` - Get all contacts
- `updateContact(id, contactData)` - Update existing contact
- `deleteContact(id)` - Delete contact
- `getContact(id)` - Get single contact by ID

## Technologies Used

- React 18
- Firebase Firestore
- Vite
- React Router DOM
