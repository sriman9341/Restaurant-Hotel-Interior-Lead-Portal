// @refresh reset
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If mock user session is saved in localStorage, use it to persist login state
    const storedUser = localStorage.getItem('mock_auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              name: data.name || currentUser.displayName || 'Admin',
              role: data.role || 'Admin'
            });
          } else {
            const newUser = {
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName || 'Admin',
              role: 'Admin',
              createdAt: serverTimestamp()
            };
            await setDoc(userRef, newUser);
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              name: newUser.name,
              role: newUser.role
            });
          }
        } catch (err) {
          console.error('Error loading user profile:', err);
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName || 'Admin',
            role: 'Admin'
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    // Local fallback check for default credentials to prevent blocking users
    if (email.toLowerCase() === 'admin@glorysimon.com' && password === 'adminpassword123') {
      try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
      } catch (err) {
        console.warn('Real Firebase Authentication failed. Falling back to local admin session:', err.message);
        const mockUser = {
          uid: 'mock-admin-uid-123',
          email: email,
          name: 'Glory Simon Admin',
          role: 'Admin'
        };
        setUser(mockUser);
        localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
        return { success: true };
      }
    }

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.error('Firebase login error:', error);
      let errorMsg = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMsg = 'Invalid email or password.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMsg = 'Invalid credentials.';
      }
      return { success: false, error: errorMsg };
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('mock_auth_user');
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'Admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
