// import { createContext, useContext, useEffect, useState } from "react";
// import { auth, googleProvider } from "../firebase.config";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const register = (name, email, password, photoURL) =>
//     createUserWithEmailAndPassword(auth, email, password).then((userCredential) =>
//       updateProfile(userCredential.user, { displayName: name, photoURL })
//     );

//   const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

//   const googleLogin = () => signInWithPopup(auth, googleProvider);

//   const logout = () => signOut(auth);

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


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

  // 🔹 Listen for user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe; // ✅ Cleanup properly
  }, []);

  // 🔹 Register new user + update profile
  const register = async (name, email, password, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL,
      });
    }
    setUser({ ...auth.currentUser }); // ✅ Update state immediately
    return userCredential;
  };

  // 🔹 Email/Password login
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // 🔹 Google login
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    setUser(result.user);
    return result;
  };

  // 🔹 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const value = { user, loading, login, register, googleLogin, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* ✅ Prevent flicker before auth loads */}
    </AuthContext.Provider>
  );
};
