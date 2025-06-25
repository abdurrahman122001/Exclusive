// utils/auth.js

/**
 * Read the stored auth payload from localStorage.
 * Returns the parsed object ({ access_token, user, … }) or false.
 */
export default function auth() {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem("auth");
  if (!raw) return false;
  try {
    return JSON.parse(raw);
  } catch {
    return false;
  }
}

/**
 * Save an auth payload (e.g. { access_token, user, token_type, expires_in }) 
 * into localStorage so `auth()` will pick it up.
 */
export function setAuth(payload) {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth", JSON.stringify(payload));
}

/**
 * Clear the stored auth (e.g. on logout).
 */
export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth");
}
