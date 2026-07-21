"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth"
import { mapAuthError, validateAuthInput } from "@/lib/auth-errors"
import { upsertUserProfile } from "@/lib/users"

export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  isSimulated: boolean
  role: "admin" | "user"
  isAdmin: boolean
}

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  isFirebaseActive: boolean
  loginWithEmail: (email: string, password: string) => Promise<UserProfile>
  registerWithEmail: (
    email: string,
    password: string,
    name: string,
  ) => Promise<UserProfile>
  loginWithGoogle: () => Promise<UserProfile>
  logout: () => Promise<void>
  error: string | null
  setError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_EMAIL = "ajarek2101@gmail.com"

function toProfile(user: User, isSimulated = false): UserProfile {
  const emailLower = user.email?.toLowerCase() || ""
  const isAdmin = emailLower === ADMIN_EMAIL.toLowerCase()
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || user.email?.split("@")[0] || null,
    photoURL: user.photoURL,
    isSimulated,
    role: isAdmin ? "admin" : "user",
    isAdmin,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser(toProfile(firebaseUser, false))
          // Upewnij się, że profil w Firestore istnieje (np. po odświeżeniu)
          upsertUserProfile(firebaseUser).catch((err) => {
            console.warn("[auth] Nie udało się zsynchronizować profilu:", err)
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      })
      return () => unsubscribe()
    }

    // Fallback lokalny — tylko gdy Firebase nie jest skonfigurowany
    const localUser = localStorage.getItem("denihub_user")
    const parsed = localUser ? JSON.parse(localUser) : null
    setTimeout(() => {
      if (parsed) setUser(parsed)
      setLoading(false)
    }, 0)
  }, [])

  const loginWithEmail = async (
    email: string,
    password: string,
  ): Promise<UserProfile> => {
    setError(null)

    const validationError = validateAuthInput({ email, password })
    if (validationError) {
      setError(validationError)
      throw new Error(validationError)
    }

    if (isFirebaseConfigured && auth) {
      try {
        const result = await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        )
        await upsertUserProfile(result.user)
        const loggedUser = toProfile(result.user)
        setUser(loggedUser)
        return loggedUser
      } catch (err: unknown) {
        const code =
          err && typeof err === "object" && "code" in err
            ? String((err as { code: string }).code)
            : ""
        const message = mapAuthError(code)
        setError(message)
        throw new Error(message)
      }
    }

    // --- Tryb lokalny (bez Firebase) ---
    const mockUsers = JSON.parse(
      localStorage.getItem("denihub_mock_users") || "[]",
    )
    const foundUser = mockUsers.find(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password,
    )

    if (foundUser) {
      localStorage.setItem("denihub_user", JSON.stringify(foundUser.profile))
      setUser(foundUser.profile)
      return foundUser.profile
    }

    const errMsg = "Błędne dane logowania lub użytkownik nie istnieje."
    setError(errMsg)
    throw new Error(errMsg)
  }

  const registerWithEmail = async (
    email: string,
    password: string,
    name: string,
  ): Promise<UserProfile> => {
    setError(null)

    const validationError = validateAuthInput({
      email,
      password,
      name,
      isRegister: true,
    })
    if (validationError) {
      setError(validationError)
      throw new Error(validationError)
    }

    if (isFirebaseConfigured && auth) {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        )
        await updateProfile(result.user, { displayName: name.trim() })
        await upsertUserProfile(result.user, { displayName: name.trim() })
        const newUser = toProfile(result.user)
        newUser.displayName = name.trim()
        setUser(newUser)
        return newUser
      } catch (err: unknown) {
        const code =
          err && typeof err === "object" && "code" in err
            ? String((err as { code: string }).code)
            : ""
        const message = mapAuthError(code)
        setError(message)
        throw new Error(message)
      }
    }

    // --- Tryb lokalny ---
    const mockUsers = JSON.parse(
      localStorage.getItem("denihub_mock_users") || "[]",
    )
    if (mockUsers.some((u: { email: string }) => u.email === email)) {
      const msg = "Ten adres e-mail jest już zarejestrowany."
      setError(msg)
      throw new Error(msg)
    }

    const isUserAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
    const newUser: UserProfile = {
      uid: "simulated-" + Math.random().toString(36).slice(2, 11),
      email,
      displayName: name.trim(),
      photoURL: null,
      isSimulated: true,
      role: isUserAdmin ? "admin" : "user",
      isAdmin: isUserAdmin,
    }

    mockUsers.push({ email, password, profile: newUser })
    localStorage.setItem("denihub_mock_users", JSON.stringify(mockUsers))
    localStorage.setItem("denihub_user", JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  const loginWithGoogle = async (): Promise<UserProfile> => {
    setError(null)

    if (isFirebaseConfigured && auth) {
      try {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: "select_account" })
        const result = await signInWithPopup(auth, provider)
        await upsertUserProfile(result.user)
        const loggedUser = toProfile(result.user)
        setUser(loggedUser)
        return loggedUser
      } catch (err: unknown) {
        const code =
          err && typeof err === "object" && "code" in err
            ? String((err as { code: string }).code)
            : ""
        const message = mapAuthError(code)
        setError(message)
        throw new Error(message)
      }
    }

    // --- Tryb lokalny ---
    const mockUser: UserProfile = {
      uid: "simulated-google-user",
      email: "demo@bluejeans.local",
      displayName: "Demo User",
      photoURL: null,
      isSimulated: true,
      role: "user",
      isAdmin: false,
    }
    localStorage.setItem("denihub_user", JSON.stringify(mockUser))
    setUser(mockUser)
    return mockUser
  }

  const logout = async () => {
    setError(null)
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth)
      } catch (err) {
        console.error("Firebase signout error:", err)
      }
    }
    localStorage.removeItem("denihub_user")
    setUser(null)
  }

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
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
