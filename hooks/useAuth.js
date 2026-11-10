"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/configs/firebaseConf";
import { login } from "@/utils/api";

const AuthContext = createContext({});

export const PROFILE_DRAFT_STORAGE_KEY = "castemon_completar_perfil_draft";

export const clearProfileDraft = () => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(PROFILE_DRAFT_STORAGE_KEY);
    } catch (e) {
      console.error("Error al limpiar borrador de perfil:", e);
    }
  }
};

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
        clearProfileDraft();
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

  const refreshUserData = useCallback(
    async (newProfileData = null) => {
      if (newProfileData && typeof newProfileData === "object") {
        setUserData((prev) => ({
          ...(prev || {}),
          ...newProfileData,
          profile: {
            ...(prev?.profile || {}),
            ...newProfileData,
          },
          firstTime: false,
          status: 200,
        }));
        setProfileStatus("complete");
      }

      if (user) {
        const refreshed = await verifyProfile(user);
        if (newProfileData && typeof newProfileData === "object" && refreshed) {
          const merged = {
            ...newProfileData,
            ...refreshed,
            grafico_url:
              refreshed.grafico_url ||
              refreshed?.profile?.grafico_url ||
              newProfileData.grafico_url,
            profile: {
              ...newProfileData,
              ...(refreshed.profile || {}),
              grafico_url:
                refreshed?.profile?.grafico_url ||
                refreshed.grafico_url ||
                newProfileData.grafico_url,
            },
          };
          setUserData(merged);
          return merged;
        }
        return refreshed;
      }
      return null;
    },
    [user, verifyProfile]
  );

  const logout = useCallback(async () => {
    clearProfileDraft();
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

