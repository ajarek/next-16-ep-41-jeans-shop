import { doc, getDoc, setDoc } from "firebase/firestore"
import { db, isFirebaseConfigured } from "@/lib/firebase"
import type { User } from "firebase/auth"

/**
 * Tworzy lub aktualizuje dokument profilu użytkownika w Firestore
 * (kolekcja `users/{uid}`) zgodnie z regułami bezpieczeństwa.
 */
export async function upsertUserProfile(
  user: User,
  extra?: { displayName?: string },
): Promise<void> {
  if (!isFirebaseConfigured || !db) return

  const ref = doc(db, "users", user.uid)
  const existing = await getDoc(ref)
  const now = new Date().toISOString()
  const displayName =
    extra?.displayName ||
    user.displayName ||
    user.email?.split("@")[0] ||
    "Użytkownik"

  const role = user.email?.toLowerCase() === "ajarek2101@gmail.com" ? "admin" : "user"

  if (existing.exists()) {
    await setDoc(
      ref,
      {
        displayName,
        photoURL: user.photoURL,
        role,
        updatedAt: now,
      },
      { merge: true },
    )
  } else {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email ?? "",
      displayName,
      photoURL: user.photoURL,
      role,
      createdAt: now,
      updatedAt: now,
    })
  }
}

export async function getUserProfile(uid: string) {
  if (!isFirebaseConfigured || !db) return null
  const snap = await getDoc(doc(db, "users", uid))
  return snap.exists() ? snap.data() : null
}
