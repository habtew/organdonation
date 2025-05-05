// import React, { createContext, useState, useContext, ReactNode } from 'react';
// import { User, UserRole } from '../types';
// import { findUser } from '../utils/mockData';

// interface AuthContextType {
//   currentUser: User | null;
//   login: (email: string, password: string) => boolean;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   const login = (email: string, password: string): boolean => {
//     const user = findUser(email, password);
//     if (user) {
//       setCurrentUser(user);
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setCurrentUser(null);
//   };

//   const value = {
//     currentUser,
//     login,
//     logout,
//     isAuthenticated: !!currentUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { auth, db } from '../../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase Auth state changes for persistent login sessions
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as Omit<User, 'id'>;
          setCurrentUser({
            id: firebaseUser.uid,
            ...userData,
          });
        } else {
          // No user doc found - sign out user for safety
          await signOut(auth);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login - returns true if successful, false if failed
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged listener will update currentUser
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setCurrentUser(null);
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};