# Document Signature App

## Overview

Document Signature App is a full-stack web application that allows users to upload PDF documents, create signature requests, and digitally sign documents through a secure email-based workflow.

## Features

* User Authentication (Register/Login)
* Upload PDF Documents
* View Uploaded Documents
* Create Signature Requests
* Email Notification for Signers
* Public Signing Link
* Download Signed PDF
* Document Status Tracking
* MongoDB Atlas Integration
* Responsive UI using React and Tailwind CSS

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* TypeScript
* JWT Authentication
* Multer

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Railway

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd document-signature-app
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Environment Variables

Frontend (.env)

```env
VITE_API_URL=<backend-url>
```

Backend (.env)

```env
MONGO_URI=<mongodb-uri>
JWT_SECRET=<secret>
EMAIL_USER=<email>
EMAIL_PASS=<password>
```

## Workflow

1. User uploads a PDF.
2. User creates a signature request.
3. Email is sent to the signer.
4. Signer opens the public link.
5. Signer signs the document.
6. Signed PDF is generated.
7. User downloads the signed PDF.

## Author

Aavula Deepthi

## Project Status

Completed Successfully
