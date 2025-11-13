import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const DEFAULT_AVATAR = "https://i.ibb.co/4pDNDk1/avatar.png";

  const register = async (name, email, password, photoURL) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: name,
        photoURL: photoURL || DEFAULT_AVATAR,
      });
      setUser({
        ...res.user,
        displayName: name,
        photoURL: photoURL || DEFAULT_AVATAR,
      });
      toast.success("Account created");
      return res.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      toast.success("Logged in");
      return res.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const currentUser = {
        uid: res.user.uid,
        displayName: res.user.displayName || "User",
        email: res.user.email,
        photoURL: res.user.photoURL || DEFAULT_AVATAR,
      };
      setUser(currentUser);
      toast.success("Logged in with Google");
      return currentUser;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          ...currentUser,
          displayName: currentUser.displayName || "User",
          photoURL: currentUser.photoURL || DEFAULT_AVATAR,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = { user, loading, register, login, googleSignIn, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;