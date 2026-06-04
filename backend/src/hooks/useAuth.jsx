// src/hooks/useAuth.jsx
import { useState, useEffect, createContext, useContext } from "react";
import { subscribeToAuthState } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAuthState((profile) => {
      setUser(profile);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/** Returns true if the user has AT LEAST the required role tier. */
export function hasRole(user, ...roles) {
  return roles.includes(user?.role);
}
