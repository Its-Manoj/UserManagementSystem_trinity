
# ## 🚀 User Management System 🚀

A Full-Stack User Management Application built with Angular (Frontend) and Java Spring Boot (Backend).

The system allows users to register, login, manage user data, and view analytics dashboards through a clean and responsive interface.

📌 Features
=======================
✨ Authentication
Secure Login
New User Registration
Form Validation

👥 User Management
========================
Create Users
Edit Users
Delete Users
View Users List

📊 Analytics Dashboard
========================
Total Users
Active Users
Monthly Growth
Role Distribution

🎨 Modern UI
========================
Angular Material Components
Responsive Layout
Dark Mode / Light Mode
Sidebar Menu Navigation

🏗️ Project Architecture(backend)
======================================

UserManagementProject
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   └── config
│
└── usermanagementfrontend
    ├── components
    │   ├── menu-sidebar
    │   └── theme-toggle
    │
    ├── pages
    │   ├── login
    │   ├── signup
    │   ├── dashboard
    │   └── analytics-dashboard
    │
    └── services
    
🖥️ Technologies Used
=======================
Frontend
==============
Technology	                    Purpose
Angular	                      UIFramework
Angular Material	           UI Components
TypeScript	               Application Logic
HTML	                      Page Structure
CSS	                            Styling

Backend
=========
Technology	                   Purpose
Java	                   Programming Language
Spring Boot	              Backend Framework
Spring Data JPA	        Database Operations
REST API	                  Communication


🖥️ Database
===============
--> MS SQL Server

📂 Frontend Folder Structure
====================================

│-src
├── app
│   ├── pages
│   │   ├── login
│   │   ├── signup
│   │   ├── dashboard
│   │   └── analytics-dashboard
│   │
│   ├── components
│   │   ├── theme-toggle
│   │   ├── menu-sidebar
│   │   ├── edit-user-dialog
│   │   └── delete-confirm-dialog
│   │
│   ├── services
│   │   ├── user.service
│   │   └── navigation-state.service
│   │
│   ├── models
│   │   └── user.model
│   │
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.component.*
│
└── styles.css

🎨 UI Pages
=======================
🔐 Login Page
===================
Username
Password
Login button
Redirect to signup

📝 Signup Page
========================
Name
Mobile Number
Email
Gender
City
Password

📊 Dashboard
=====================
User table
Edit/Delete actions
Sidebar navigation

📈 Analytics Dashboard
==========================
User statistics cards
Charts
User metrics table

🌙 Theme System
=======================
The application supports Dark Mode and Light Mode.

🔮 Future Improvements
============================
🚀 JWT Authentication
🚀 Role Based Authorization
🚀 Real Analytics with Charts
🚀 Search and Pagination
🚀 User Profile Page

Running of Project
===================
🚀 Backend Runs on : http://localhost:8080/
🚀 Frontend Runs on : http://localhost:4200/
