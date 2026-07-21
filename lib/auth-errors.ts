/**
 * Mapowanie kodów błędów Firebase Auth na komunikaty PL.
 * Zgodne z regułami domyślnymi Firebase Authentication.
 */
export function mapAuthError(code: string, fallback?: string): string {
  const messages: Record<string, string> = {
    // Logowanie
    "auth/invalid-email": "Nieprawidłowy format adresu e-mail.",
    "auth/user-disabled": "To konto zostało wyłączone.",
    "auth/user-not-found": "Nieprawidłowy e-mail lub hasło.",
    "auth/wrong-password": "Nieprawidłowy e-mail lub hasło.",
    "auth/invalid-credential": "Nieprawidłowy e-mail lub hasło.",
    "auth/invalid-login-credentials": "Nieprawidłowy e-mail lub hasło.",
    "auth/too-many-requests":
      "Zbyt wiele prób logowania. Spróbuj ponownie za chwilę.",

    // Rejestracja
    "auth/email-already-in-use": "Ten e-mail jest już zarejestrowany.",
    "auth/weak-password": "Hasło musi mieć co najmniej 6 znaków.",
    "auth/operation-not-allowed":
      "Ta metoda logowania nie jest włączona w projekcie Firebase.",
    "auth/missing-password": "Podaj hasło.",
    "auth/missing-email": "Podaj adres e-mail.",

    // Google / popup
    "auth/popup-closed-by-user": "Zamknięto okno logowania Google.",
    "auth/popup-blocked":
      "Przeglądarka zablokowała okno logowania. Zezwól na wyskakujące okna.",
    "auth/cancelled-popup-request": "Anulowano poprzednie logowanie Google.",
    "auth/account-exists-with-different-credential":
      "Konto z tym e-mailem istnieje już z inną metodą logowania.",
    "auth/network-request-failed":
      "Błąd sieci. Sprawdź połączenie internetowe.",
    "auth/internal-error": "Wewnętrzny błąd uwierzytelniania. Spróbuj ponownie.",
  }

  return messages[code] ?? fallback ?? "Wystąpił błąd uwierzytelniania."
}

/** Walidacja po stronie klienta zgodna z regułami Firebase Auth */
export function validateAuthInput(params: {
  email: string
  password: string
  name?: string
  isRegister?: boolean
}): string | null {
  const email = params.email.trim()
  const password = params.password

  if (!email) return "Podaj adres e-mail."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Nieprawidłowy format adresu e-mail."
  }
  if (!password) return "Podaj hasło."
  // Firebase wymaga min. 6 znaków
  if (password.length < 6) {
    return "Hasło musi mieć co najmniej 6 znaków."
  }
  if (params.isRegister) {
    const name = (params.name ?? "").trim()
    if (!name || name.length < 2) {
      return "Podaj imię (min. 2 znaki)."
    }
  }
  return null
}
