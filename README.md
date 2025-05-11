# Blog App Frontend Documentation

## Overview

The Blog App Frontend is a Next.js-based application designed to provide a platform for users to create, manage, and interact with blog posts. It includes features for user authentication, profile management, post creation, and an admin dashboard for managing users and categories.

## Features

- **Authentication**: Sign-up, sign-in, password reset, and two-factor authentication.
- **User Profiles**: Manage personal information, bio, and professional details.
- **Blog Management**: Create, edit, and delete blog posts with support for categories and subcategories.
- **Admin Dashboard**: Manage users, categories, and view statistics.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure

The project is organized as follows:

```
src/
  app/
    auth/                # Authentication pages (sign-in, sign-up, etc.)
    components/          # Reusable UI components
    context/             # Context providers for authentication and posts
    dashboard/           # Admin dashboard pages
    home_layout/         # Layout for the home page
    hooks/               # Custom React hooks
    users/               # User-related pages (profile, posts, etc.)
    writers/             # Writer-specific pages
  middleware.js          # Middleware for route protection
public/                  # Static assets (images, favicon, etc.)
next.config.mjs          # Next.js configuration
```

## Key Components

### Authentication

- **Sign-In**: Located at `src/app/auth/sign-in/page.jsx`. Includes form validation and error handling.
- **Sign-Up**: Located at `src/app/auth/sign-up/page.jsx`. Supports user roles and avatar upload.
- **Two-Factor Authentication**: Implemented in `src/app/auth/confirm-2fa/page.jsx`.

### User Profiles

- **Profile Page**: Located at `src/app/users/profile/page.jsx`. Allows users to edit their information and manage posts.
- **Professional Section**: Located at `src/app/users/profile/ProfessionalSection.jsx`. Handles roles and occupations.

### Blog Management

- **Write Post**: Located at `src/app/users/post/write-post/page.jsx`. Includes a form for creating new blog posts.
- **Edit Post**: Located at `src/app/users/post/edit-post/[id]/page.jsx`. Allows users to update existing posts.

### Admin Dashboard

- **Dashboard Root**: Located at `src/app/dashboard/DashBoard_layout/DashBoardRoot.jsx`. Provides the main layout for admin pages.
- **User Management**: Located at `src/app/dashboard/all-users/page.jsx`. Allows admins to view and delete users.
- **Category Management**: Located at `src/app/dashboard/categories/page.jsx`. Includes functionality for creating and deleting categories.

## Middleware

The middleware (`src/middleware.js`) handles route protection based on user roles and authentication status.

## Configuration

- **Next.js Config**: Located at `next.config.mjs`. Includes experimental features and image optimization settings.
- **Environment Variables**: Ensure the following variables are set in your `.env` file:
  - `NEXT_PUBLIC_SERVER_URI`: The base URL for the backend server.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-app-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! Please follow the standard Git workflow:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.

**write manually link address for see dashboard**

### Admin Login

email: wasifuleyasin2016@gmail.com
pass : #N|bj1<P_g!1

### Writer Login

email: wasifulkabir2023@gmail.com
pass : 8KHl3R|y-RoQ

