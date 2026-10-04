"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { TOKEN_KEY, api } from "@/lib/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const dashboardPath = (role) => `/dashboard/${role || "student"}`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const busy = useRef(false);

  const clear = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const exchange = useCallback(async (fbUser, profile) => {
    const idToken = await fbUser.getIdToken();
    const data = await api("/auth/session", { method: "POST", body: { idToken, profile }, token: null });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const withSync = useCallback(async (fn) => {
    busy.current = true;
    try {
      return await fn();
    } finally {
      busy.current = false;
    }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (busy.current) return;
      if (!fbUser) {
        clear();
        setLoading(false);
        return;
      }
      try {
        if (localStorage.getItem(TOKEN_KEY)) {
          try {
            const { user: me } = await api("/auth/me");
            setUser(me);
            return;
          } catch {
          }
        }
        await exchange(fbUser);
      } catch (err) {
        console.error(err);
        clear();
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, [clear, exchange]);

  const logout = useCallback(async () => {
    await signOut(auth);
    clear();
  }, [clear]);

  useEffect(() => {
    const onUnauthorized = () => logout();
    window.addEventListener("etb:unauthorized", onUnauthorized);
    return () => window.removeEventListener("etb:unauthorized", onUnauthorized);
  }, [logout]);

  const register = ({ name, email, password, phone, role, photoURL }) =>
    withSync(async () => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await updateProfile(cred.user, { displayName: name, photoURL: photoURL || null });
        return await exchange(cred.user, { name, phone, role, photoURL });
      } catch (err) {
        await cred.user.delete().catch(() => {});
        throw err;
      }
    });

  const login = (email, password) =>
    withSync(async () => {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return exchange(cred.user);
    });

  const googleLogin = () =>
    withSync(async () => {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      return exchange(cred.user, { role: "student" });
    });

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, register, login, googleLogin, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
