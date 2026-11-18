const TOKEN_KEY = 'auth_token';

/**
 * Persists the JWT across page reloads.
 */
export const tokenStorage = {
  get(): string | null {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token && isExpired(token)) {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
      return token;
    } catch {
      return null;
    }
  },

  set(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } 
    catch {

    }
  },

  clear(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      
    }
  },
};

/**
 * Reads the `exp` claim so an obviously expired token is dropped before the
 * app treats the user as logged in. The backend still verifies the signature.
 */
function isExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(payload)) as { exp?: number };
    return typeof exp === 'number' && exp * 1000 <= Date.now();
  } catch {
    return true; // Malformed token: treat as unusable.
  }
}
