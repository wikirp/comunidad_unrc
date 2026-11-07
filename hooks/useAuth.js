"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/configs/firebaseConf";
import { login } from "@/utils/api";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);
  // "idle" | "loading" | "complete" | "incomplete" | "error"
  const [profileStatus, setProfileStatus] = useState("idle");
  const [authError, setAuthError] = useState(null);

  const verifyProfile = useCallback(async (currentUser) => {
    if (!currentUser) return null;

    setLoadingUserData(true);
    setProfileStatus("loading");
    setAuthError(null);

    try {
      const data = await login(currentUser);
      setUserData(data);
      setProfileStatus(data.firstTime ? "incomplete" : "complete");
      return data;
    } catch (error) {
      console.error("Error al verificar perfil del usuario:", error);
      setUserData(null);
      setProfileStatus("error");
      setAuthError(
        error.message || "NO SE PUDO VERIFICAR EL PERFIL CON EL SERVIDOR"
      );
      return null;
    } finally {
      setLoadingUserData(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await verifyProfile(currentUser);
      } else {
        setUser(null);
        setUserData(null);
        setProfileStatus("idle");
        setAuthError(null);
        setLoadingUserData(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [verifyProfile]);

  const refreshUserData = useCallback(async () => {
    if (user) {
      return await verifyProfile(user);
    }
    return null;
  }, [user, verifyProfile]);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
    setProfileStatus("idle");
    setAuthError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userData,
        loadingUserData,
        profileStatus,
        authError,
        refreshUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

