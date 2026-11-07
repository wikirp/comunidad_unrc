"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function LeftPanelPage() {
  const { user, userData } = useAuth();
  const profile = userData?.profile || userData || {};

  return (
    <ProtectedRoute>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "0.75rem 0.5rem",
          boxSizing: "border-box",
          fontFamily: "monospace",
          color: "#55efc4",
        }}
      >
        <header
          style={{
            fontSize: "0.7rem",
            letterSpacing: "1.5px",
            borderBottom: "1px dashed rgba(85, 239, 196, 0.35)",
            paddingBottom: "0.4rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>[ FICHA DE ENTRENADOR ]</span>
          <span>ONLINE ●</span>
        </header>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
            margin: "auto 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              border: "2px solid #55efc4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#05130b",
              boxShadow: "0 0 10px rgba(85, 239, 196, 0.3)",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {(profile?.username || profile?.nombre || user?.email || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <div
              style={{
                fontSize: "0.95rem",
                fontWeight: "bold",
                color: "#f1f2f6",
              }}
            >
              {profile?.username || profile?.nombre || "ENTRENADOR UNRC"}
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "rgba(241, 242, 246, 0.75)",
                marginTop: "2px",
              }}
            >
              {user?.email}
            </div>
          </div>

          {profile?.carrera && (
            <div
              style={{
                fontSize: "0.72rem",
                border: "1px solid rgba(85, 239, 196, 0.4)",
                padding: "4px 8px",
                backgroundColor: "rgba(5, 19, 11, 0.6)",
              }}
            >
              {profile.carrera}
              {profile?.semestre ? ` · Semestre ${profile.semestre}` : ""}
            </div>
          )}
        </div>

        <footer
          style={{
            fontSize: "0.65rem",
            textAlign: "center",
            color: "rgba(85, 239, 196, 0.65)",
            borderTop: "1px dashed rgba(85, 239, 196, 0.25)",
            paddingTop: "0.4rem",
          }}
        >
          CASTEMON OS // SINCRONIZADO
        </footer>
      </div>
    </ProtectedRoute>
  );
}

