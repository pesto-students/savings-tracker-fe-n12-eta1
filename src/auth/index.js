import {signOut as firebaseSignOut} from "firebase/auth";
import {auth} from "../firebase";

export const signOut = () => {
    return firebaseSignOut(auth);
};