// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTRLC-1XM_Hu-e51T6GfpFFu7hxlh3Kwk",
    authDomain: "artisan-task-manager.firebaseapp.com",
    projectId: "artisan-task-manager",
    storageBucket: "artisan-task-manager.firebasestorage.app",
    messagingSenderId: "177778767202",
    appId: "1:177778767202:web:54758807df01b5e111683b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();