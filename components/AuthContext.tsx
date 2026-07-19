'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isSimulated: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isFirebaseActive: boolean;
  loginWithEmail: (email: string, password: string) => Promise<UserProfile>;
  registerWithEmail: (email: string, password: string, name: string) => Promise<UserProfile>;
  loginWithGoogle: () => Promise<UserProfile>;
  logout: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync Firebase State if active
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isSimulated: false,
          });
        } else {
          // If no Firebase user, check if we have a simulated user in localStorage
          const localUser = localStorage.getItem('denihub_user');
          if (localUser) {
            setUser(JSON.parse(localUser));
          } else {
            setUser(null);
          }
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local fallback mode
      const localUser = localStorage.getItem('denihub_user');
      const parsed = localUser ? JSON.parse(localUser) : null;
      setTimeout(() => {
        if (parsed) {
          setUser(parsed);
        }
        setLoading(false);
      }, 0);
    }
  }, []);

  // Login Email
  const loginWithEmail = async (email: string, password: string): Promise<UserProfile> => {
    setError(null);
    if (isFirebaseConfigured && auth) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const loggedUser: UserProfile = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName || email.split('@')[0],
          photoURL: result.user.photoURL,
          isSimulated: false,
        };
        setUser(loggedUser);
        return loggedUser;
      } catch (err: any) {
        const message = err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found'
          ? 'Nieprawidłowy e-mail lub hasło.'
          : err.message;
        setError(message);
        throw new Error(message);
      }
    } else {
      // Simulate login
      const mockUsers = JSON.parse(localStorage.getItem('denihub_mock_users') || '[]');
      const foundUser = mockUsers.find((u: any) => u.email === email && u.password === password);
      
      // If we don't find them, but they use the admin/ajarek user, let's auto-register them
      if (!foundUser && email === 'ajarek2101@gmail.com') {
        const newUser: UserProfile = {
          uid: 'simulated-ajarek',
          email: 'ajarek2101@gmail.com',
          displayName: 'Jarek',
          photoURL: 'https://randomuser.me/api/portraits/men/75.jpg',
          isSimulated: true,
        };
        const savedUsers = [...mockUsers, { email, password, profile: newUser }];
        localStorage.setItem('denihub_mock_users', JSON.stringify(savedUsers));
        localStorage.setItem('denihub_user', JSON.stringify(newUser));
        setUser(newUser);
        return newUser;
      }

      if (foundUser) {
        const loggedUser = foundUser.profile;
        localStorage.setItem('denihub_user', JSON.stringify(loggedUser));
        setUser(loggedUser);
        return loggedUser;
      } else {
        const errMsg = 'Błędne dane logowania lub użytkownik nie istnieje.';
        setError(errMsg);
        throw new Error(errMsg);
      }
    }
  };

  // Register Email
  const registerWithEmail = async (email: string, password: string, name: string): Promise<UserProfile> => {
    setError(null);
    if (isFirebaseConfigured && auth) {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        const newUser: UserProfile = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: name,
          photoURL: null,
          isSimulated: false,
        };
        setUser(newUser);
        return newUser;
      } catch (err: any) {
        let message = err.message;
        if (err.code === 'auth/email-already-in-use') {
          message = 'Ten e-mail jest już zajęty.';
        } else if (err.code === 'auth/weak-password') {
          message = 'Hasło musi mieć co najmniej 6 znaków.';
        }
        setError(message);
        throw new Error(message);
      }
    } else {
      // Simulate register
      const mockUsers = JSON.parse(localStorage.getItem('denihub_mock_users') || '[]');
      const emailExists = mockUsers.some((u: any) => u.email === email);
      if (emailExists) {
        const msg = 'Ten adres e-mail jest już zarejestrowany.';
        setError(msg);
        throw new Error(msg);
      }

      const newUser: UserProfile = {
        uid: 'simulated-' + Math.random().toString(36).substr(2, 9),
        email,
        displayName: name,
        photoURL: `https://randomuser.me/api/portraits/men/75.jpg`,
        isSimulated: true,
      };

      mockUsers.push({ email, password, profile: newUser });
      localStorage.setItem('denihub_mock_users', JSON.stringify(mockUsers));
      localStorage.setItem('denihub_user', JSON.stringify(newUser));
      setUser(newUser);
      return newUser;
    }
  };

  // Google Login
  const loginWithGoogle = async (): Promise<UserProfile> => {
    setError(null);
    if (isFirebaseConfigured && auth) {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const loggedUser: UserProfile = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          isSimulated: false,
        };
        setUser(loggedUser);
        return loggedUser;
      } catch (err: any) {
        setError(err.message);
        throw new Error(err.message);
      }
    } else {
      // Simulate Google Login using context email if available
      const email = 'ajarek2101@gmail.com';
      const name = 'Jarek';
      const mockUser: UserProfile = {
        uid: 'simulated-google-jarek',
        email,
        displayName: name,
        photoURL: 'https://randomuser.me/api/portraits/men/75.jpg',
        isSimulated: true,
      };
      localStorage.setItem('denihub_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return mockUser;
    }
  };

  // Logout
  const logout = async () => {
    setError(null);
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (err: any) {
        console.error('Firebase signout error:', err);
      }
    }
    localStorage.removeItem('denihub_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseActive: isFirebaseConfigured,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
