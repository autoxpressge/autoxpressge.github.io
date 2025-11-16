import {
   initializeApp
}
 from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import {
   getAuth,  signInAnonymously,  signInWithCustomToken,  onAuthStateChanged
}
 from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import {
   getFirestore,  setLogLevel
}
 from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";setLogLevel('Debug');const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
};const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;let db,  auth,  userId = null;async function initializeFirebase() {
  try {
    if (Object.keys(firebaseConfig).length === 0) {
      console.error("Firebase configuration is missing.");return;
    }
    const app = initializeApp(firebaseConfig);db = getFirestore(app);auth = getAuth(app);if (initialAuthToken) {
      await signInWithCustomToken(auth,  initialAuthToken);
    }
     else {
      await signInAnonymously(auth);
    }
    onAuthStateChanged(auth,  (user) => {
      if (user) {
        userId = user.uid;console.log("Firebase Auth Ready. User ID:",  userId);document.dispatchEvent(new CustomEvent('firebase-ready'));
      }
       else {
        console.log("No user is signed in.");
      }
    });
  }
   catch (error) {
    console.error("Error initializing Firebase or signing in:",  error);
  }
}
window.db = db;window.auth = auth;window.userId = userId;window.appId = appId;initializeFirebase();
