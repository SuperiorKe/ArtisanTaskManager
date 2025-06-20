This project is a web-based task manager that allows users to:  Sign up and log in using email and password authentication. Add, view, complete, and delete personal tasks.
# Artisan Task Manager

Artisan Task Manager is a web-based application that allows users to manage their personal tasks efficiently. It features user authentication, real-time task management, and a modern, responsive interface. The app is built using HTML, CSS, and JavaScript, and leverages Firebase for authentication, data storage, and hosting.

## Features

- **User Authentication:** Sign up, log in, and log out securely using email and password.
- **Personal Task Management:** Add, view, complete, and delete your own tasks.
- **Real-Time Updates:** Tasks are stored in Firebase Firestore and update instantly.
- **Responsive Design:** Works well on both desktop and mobile devices.
- **Secure Data:** Each user's tasks are private and only accessible to them.

## Demo

You can deploy and run this project using Firebase Hosting. See the setup instructions below.

## Getting Started

### Prerequisites

- [Node.js and npm](https://nodejs.org/)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- A [Firebase project](https://console.firebase.google.com/)

### Installation

1. **Clone the repository:**

   ```powershell
   git clone https://github.com/SuperiorKe/ArtisanTaskManager.git
   cd ArtisanTaskManager
   ```

2. **Install Firebase CLI (if not already installed):**

   ```powershell
   npm install -g firebase-tools
   ```

3. **Login to Firebase:**

   ```powershell
   firebase login
   ```

4. **Initialize Firebase in your project directory (if needed):**

   ```powershell
   firebase init
   ```

   > Choose Firestore and Hosting when prompted. You can use the existing configuration files.

5. **Update Firebase Configuration:**

   - Replace the values in `public/config.js` with your own Firebase project credentials if you are using a different Firebase project.

6. **Deploy to Firebase Hosting:**

   ```powershell
   firebase deploy
   ```

   > Your app will be available at the Firebase Hosting URL provided after deployment.

## Project Structure

```
artisan-task-manager/
│
├── public/
│   ├── index.html      # Main HTML file
│   ├── style.css       # App styles
│   ├── app.js          # Main JavaScript logic
│   ├── config.js       # Firebase configuration
│   └── 404.html        # Custom 404 page
│
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json  # Firestore indexes
├── firebase.json           # Firebase project configuration
├── .firebaserc             # Firebase project alias
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Usage

1. **Sign Up:** Create a new account with your email and password.
2. **Log In:** Access your personal dashboard.
3. **Add Tasks:** Enter a task and click "Add Task" or press Enter.
4. **Complete Tasks:** Click "Complete" to mark a task as done, or "Undo" to mark it as incomplete.
5. **Delete Tasks:** Remove tasks you no longer need.

## Security

- Firestore rules are set to allow open access until July 20, 2025. **Update your security rules before this date to protect your data.**
- Each user's tasks are stored with their unique user ID for privacy.

## Customization

- Update styles in `public/style.css` to change the look and feel.
- Modify `public/app.js` to add new features or change task logic.

## License

This project is open source and available under the [MIT License](LICENSE).
