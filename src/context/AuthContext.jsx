

import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe; 
  }, []);

  //Register new user + update profile
  const register = async (name, email, password, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL,
      });
    }
    setUser({ ...auth.currentUser }); 
    return userCredential;
  };

  //  Email/Password login
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Google login
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    setUser(result.user);
    return result;
  };

  //  Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const value = { user, loading, login, register, googleLogin, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};
