"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebaseConf";
import { getUserData, login } from "@/utils/api";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Cargar datos del usuario desde el API
        setLoadingUserData(true);
        try {
          const data = await login(currentUser);

          console.log(data);
          setUserData(data);
        } catch (error) {
          console.error("Error al cargar datos del usuario:", error);
          setUserData(null);
        } finally {
          setLoadingUserData(false);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Función para refrescar los datos del usuario
  const refreshUserData = async () => {
    if (user) {
      setLoadingUserData(true);
      try {
        const data = await login(user);
        setUserData(data);
        return data;
      } catch (error) {
        console.error("Error al refrescar datos del usuario:", error);
        throw error;
      } finally {
        setLoadingUserData(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userData,
        loadingUserData,
        refreshUserData,
      }}
    >
      {loading ? <div>Cargando ...</div> : children}
    </AuthContext.Provider>
  );
};
