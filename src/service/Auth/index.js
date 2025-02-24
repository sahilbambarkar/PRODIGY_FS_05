import {
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";
const firebaseConfig = {
  
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export const signInWithGoogle = async () => {
  var provider = new GoogleAuthProvider();
  try {
    const data = await signInWithPopup(auth, provider);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const signinwithemail = async (email, pass) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, pass);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const signupwithemail = async (email, pass) => {
  try {
    const { error, res } = await createUserWithEmailAndPassword(
      auth,
      email,
      pass,
    );

    if (res) {
      await sendEmailVerification(res.user);
      toast.error("invaild email id");
    }
    return res;
  } catch (err) {
    console.error(err.code);
    if (err.code === "auth/email-already-in-use") {
      toast.error(
        "This email id is already in use , please use different email id",
      );
    } else if (err.code === "auth/invalid-email")
      toast.error("invalid email id or passwaord");
  }
};
export const forget_password = async (email) => {
  try {
    const data = await sendPasswordResetEmail(auth, email);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export { auth, app, firestore, storage };
