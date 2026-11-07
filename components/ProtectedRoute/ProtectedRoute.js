"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const {
    user,
    loading,
    userData,
    loadingUserData,
    profileStatus,
    authError,
    refreshUserData,
    logout,
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (!loading && user && loadingUserData) {
      return;
    }

    if (
      !loading &&
      !loadingUserData &&
      user &&
      (profileStatus === "incomplete" || userData?.firstTime === true)
    ) {
      router.push("/completar-perfil");
    }
  }, [user, loading, userData, loadingUserData, profileStatus, router]);

  if (loading || loadingUserData) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          fontFamily: "monospace",
          color: "#55efc4",
          fontSize: "0.85rem",
          fontWeight: "bold",
        }}
      >
        <span>&gt; VERIFICANDO SESIÓN...</span>
      </div>
    );
  }

  if (!user || profileStatus === "incomplete" || userData?.firstTime === true) {
    return null;
  }

  if (profileStatus === "error") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.75rem",
          height: "100%",
          fontFamily: "monospace",
          color: "#55efc4",
        }}
      >
        <div
          style={{
            border: "1px solid #ff7675",
            color: "#ff7675",
            padding: "6px 8px",
            fontSize: "0.75rem",
          }}
        >
          [!] {authError || "ERROR AL CARGAR PERFIL"}
        </div>
        <button
          type="button"
          onClick={() => refreshUserData()}
          style={{
            backgroundColor: "#55efc4",
            color: "#05130b",
            border: "2px solid #1c1c1c",
            fontFamily: "monospace",
            fontWeight: "bold",
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          [ REINTENTAR ]
        </button>
        <button
          type="button"
          onClick={() => logout()}
          style={{
            backgroundColor: "#0d1e16",
            color: "#55efc4",
            border: "2px solid #2ecc71",
            fontFamily: "monospace",
            fontWeight: "bold",
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          &gt; CERRAR SESIÓN
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

