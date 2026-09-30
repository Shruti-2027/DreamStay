# 🏡 DreamStay

> A full-stack vacation rental platform inspired by real-world property listing and booking applications.

**DreamStay** is a full-stack web application built to simulate the core functionality of a modern vacation-rental marketplace. Users can explore property listings, view detailed information, create and manage listings, leave reviews, and interact with the application through a responsive web interface.

The project was developed as a **solo full-stack application**, covering the complete development flow from frontend rendering and backend APIs to database management, authentication, validation, image uploads, session management, and deployment.

---

## ✨ Features

### 🏠 Property Listings

* Browse available property listings.
* View detailed information about individual properties.
* Create new property listings.
* Edit existing listings.
* Delete listings.
* Display property images and relevant listing information.
* Search listings based on user input.
* Filter listings using predefined categories.
* Responsive listing interface.

### 🔍 Search & Filtering

DreamStay provides users with multiple ways to discover properties:

* Search functionality for finding relevant listings.
* Category-based filtering.
* Interactive filters for different property types.
* Tax toggle to display prices with or without applicable taxes.

### ⭐ Reviews & Ratings

Users can interact with listings through reviews:

* Add reviews to listings.
* Display existing reviews.
* Delete reviews where authorized.
* Associate reviews with the users who created them.

### 🔐 Authentication & Authorization

DreamStay implements user authentication and authorization using **Passport.js**.

Features include:

* User registration.
* User login.
* User logout.
* Persistent sessions.
* Protected routes.
* Authorization checks for listing operations.
* Authorization checks for review operations.

Users can only perform operations that they are authorized to perform.

### ☁️ Image Uploads

Property images are handled using:

* **Multer** for processing file uploads.
* **Cloudinary** for cloud-based image storage and management.

This allows listing images to be uploaded and served without storing image files directly inside the application repository.

### 🛡️ Server-Side Validation

DreamStay uses **Joi** to validate incoming data.

Validation is applied to important application resources such as:

* Listings
* Reviews
* User-submitted form data

This prevents malformed or invalid data from being processed by the application.

### ⚠️ Error Handling

The application contains centralized error-handling mechanisms to make backend failures easier to manage.

The project includes:

* Custom error handling.
* Asynchronous error handling through `wrapAsync`.
* Consistent server-side error responses.
* Flash messages for user-facing feedback.

### 💾 Session Management

User sessions are persisted using:

* `express-session`
* `connect-mongo`

MongoDB is therefore used not only for application data but also for persistent session storage.

### 💰 Tax Display

DreamStay includes a client-side tax toggle that allows users to switch between:

* Base listing prices
* Prices including applicable taxes

This provides a more realistic pricing experience for users browsing properties.

---

# 🛠️ Tech Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* EJS
* EJS-Mate

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* MongoDB Atlas
* Mongoose

## Authentication

* Passport.js
* Passport-Local
* Express Session
* Connect-Mongo

## File & Image Management

* Multer
* Cloudinary

## Validation & Error Handling

* Joi
* Custom Error Classes
* `wrapAsync`
* Flash Messages

## Deployment

* Render

---

# 🏗️ Application Architecture

DreamStay follows a traditional server-rendered **MVC-style architecture**.

```text
                    ┌─────────────────────┐
                    │       Browser       │
                    │  HTML/CSS/JS/EJS    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Express.js     │
                    │       Routes        │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
          ┌────────────┐ ┌────────────┐ ┌────────────┐
          │ Controllers│ │ Middleware │ │ Validation │
          └──────┬─────┘ └────────────┘ └────────────┘
                 │
                 ▼
          ┌─────────────────┐
          │    Mongoose     │
          │      Models     │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │  MongoDB Atlas  │
          └─────────────────┘

                   │
                   │ Image Uploads
                   ▼
          ┌─────────────────┐
          │    Cloudinary   │
          └─────────────────┘
```

The application separates responsibilities between routes, middleware, models, views, and supporting utilities, making the codebase easier to maintain and extend.

---

# 📂 Project Structure

```text
DreamStay/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── init/
│   └── ...
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   └── js/
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
├── middleware.js
├── app.js
├── schema.js
├── package.json
└── README.md
```

> The exact structure may vary slightly depending on the current version of the repository.

---

# 🔄 How DreamStay Works

A typical request flows through the application as follows:

```text
User
  │
  ▼
Browser Request
  │
  ▼
Express Route
  │
  ▼
Authentication / Authorization Middleware
  │
  ▼
Validation
  │
  ▼
Controller Logic
  │
  ▼
Mongoose Model
  │
  ▼
MongoDB
  │
  ▼
Controller
  │
  ▼
EJS View
  │
  ▼
Rendered HTML
  │
  ▼
User
```

For image uploads, the flow additionally involves Cloudinary:

```text
User
  │
  ▼
Image Upload
  │
  ▼
Multer
  │
  ▼
Cloudinary
  │
  ▼
Image URL
  │
  ▼
MongoDB Listing Document
```

---

# 🗄️ Database Design

DreamStay uses MongoDB with Mongoose for database management.

The major entities are:

### User

Stores user authentication and account information.

```text
User
 ├── username
 ├── email
 └── authentication data
```

### Listing

Represents a property available on the platform.

```text
Listing
 ├── title
 ├── description
 ├── image
 ├── price
 ├── location
 ├── country
 ├── owner
 └── reviews
```

### Review

Represents a user's review of a listing.

```text
Review
 ├── comment
 ├── rating
 ├── author
 └── listing
```

Relationships between these models are represented using MongoDB references through Mongoose.

---

# 🔐 Authentication & Authorization Flow

DreamStay uses Passport.js for local authentication.

```text
                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
                    Login / Register
                           │
                           ▼
                    ┌──────────────┐
                    │  Passport.js │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Session    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  MongoDB     │
                    │ Session Store│
                    └──────────────┘
```

Protected routes verify whether a user is authenticated before allowing access.

Authorization middleware additionally verifies ownership where required.

For example:

```text
Authenticated User
        │
        ▼
Is user the owner?
    ┌───┴───┐
   YES      NO
    │        │
    ▼        ▼
Allow     Reject
Action    Request
```

---

# ☁️ Image Management

DreamStay does not rely on storing uploaded images directly inside the application.

Instead:

1. User selects an image.
2. The request reaches the Express server.
3. Multer processes the uploaded file.
4. The image is uploaded to Cloudinary.
5. Cloudinary returns the image information.
6. The corresponding image URL is stored with the listing.
7. The image can later be rendered from Cloudinary.

This approach keeps large media files outside the application repository and makes the deployed application more practical.

---

# 🛡️ Validation & Error Handling

One of the important backend aspects of DreamStay is defensive handling of user input and application errors.

### Joi Validation

Incoming listing and review data is validated before being processed.

```text
Request
   │
   ▼
Joi Validation
   │
 ┌─┴─────────┐
 │           │
Valid      Invalid
 │           │
 ▼           ▼
Continue   Reject
```

### Asynchronous Error Handling

Asynchronous Express operations are wrapped using a reusable `wrapAsync` utility so that rejected promises can be passed to the centralized error handler.

### Custom Errors

The project uses a custom `ExpressError` utility to provide structured application errors.

This keeps error handling centralized instead of duplicating error logic throughout individual routes.

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB / MongoDB Atlas account
* Cloudinary account

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Shruti-2027/DreamStay.git
```

### 2. Navigate to the project

```bash
cd DreamStay
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add the credentials required by the application.

Example:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

> Use the exact variable names expected by the current application configuration.

### 5. Start the application

```bash
npm start
```

The application should then be available on the local server URL shown in the terminal.

---

# 🌐 Deployment

DreamStay is deployed using **Render**.

The deployment process connects the GitHub repository to Render and allows the application to run as a Node.js web service.

A production deployment requires the corresponding environment variables to be configured in the hosting platform rather than committing secrets to the repository.

---

# 🧪 Key Engineering Concepts Demonstrated

DreamStay was built to go beyond basic CRUD functionality and demonstrates several practical full-stack development concepts.

### Backend Development

* RESTful routing
* Express middleware
* MVC-style organization
* CRUD operations
* Authentication
* Authorization
* Session management
* Error handling
* Server-side validation

### Database Development

* MongoDB
* MongoDB Atlas
* Mongoose schemas
* Model relationships
* Referencing documents
* Persistent sessions

### Web Development

* Server-side rendering
* EJS templates
* Reusable layouts
* Bootstrap-based responsive UI
* Client-side JavaScript
* Form handling

### Production Concepts

* Environment variables
* Cloud image storage
* Deployment
* Persistent database
* Secure authentication flow

---

# 🎯 Project Goals

The primary goals of DreamStay were to:

* Build a complete full-stack web application independently.
* Understand how frontend, backend, and database layers interact.
* Implement authentication and authorization from scratch.
* Work with MongoDB and Mongoose in a real application.
* Handle image uploads using cloud storage.
* Implement server-side validation.
* Build reusable middleware and error-handling utilities.
* Deploy a Node.js application to a cloud platform.
* Gain practical experience with production-style application architecture.

---

# 🔮 Future Improvements

Potential improvements for future versions include:

* 🗺️ Interactive maps for listing locations.
* 📍 Location-based search.
* 📅 Availability and booking management.
* 💳 Online payment integration.
* ❤️ Wishlist / favorites.
* 📧 Email notifications.
* 🔔 Booking notifications.
* 👤 User profile management.
* 📊 Host dashboard and analytics.
* 🧾 Booking history.
* 📱 Further mobile UI optimization.

---

# 🧠 What I Learned

Building DreamStay provided hands-on experience with the complete lifecycle of a full-stack web application.

Key takeaways include:

* Designing and structuring an Express.js application.
* Connecting a Node.js backend to MongoDB.
* Working with Mongoose models and document relationships.
* Implementing authentication with Passport.js.
* Understanding authentication vs. authorization.
* Managing sessions using MongoDB.
* Handling multipart form data and image uploads.
* Integrating Cloudinary for external media storage.
* Validating user input using Joi.
* Designing reusable middleware.
* Handling asynchronous errors cleanly.
* Deploying a backend application to a cloud platform.
* Debugging issues across the frontend, backend, and database layers.

---

# 📌 Project Status

**Status: Completed**

DreamStay is a functional full-stack application with the core listing, authentication, review, search, image-upload, validation, and deployment functionality implemented.

The project can be extended further with booking, maps, payments, notifications, and other marketplace features.

---

# 👩‍💻 Author

**Shruti Jha**

GitHub: [Shruti-2027](https://github.com/Shruti-2027)

---

## 📄 License

This project is intended for educational and portfolio purposes.
