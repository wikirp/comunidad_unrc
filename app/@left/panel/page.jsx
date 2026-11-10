"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function LeftPanelPage() {
  const { user, userData } = useAuth();
  const profile = userData?.profile || userData || {};
  const graficoUrl =
    profile?.grafico_url || userData?.grafico_url || profile?.avatar_url || "";

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
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.65rem",
          margin: "auto 0",
          textAlign: "center",
        }}
      >
        {graficoUrl ? (
          <div
            // style={{
            //   width: "210px",
            //   height: "210px",
            //   border: "2px solid #55efc4",
            //   borderRadius: "8px",
            //   padding: "6px",
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   backgroundColor: "#05130b",
            //   boxShadow: "0 0 14px rgba(85, 239, 196, 0.35)",
            //   overflow: "hidden",
            // }}
          >
            <img
              src={graficoUrl}
              alt={`Castemon de ${profile?.username || "entrenador"}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                imageRendering: "pixelated",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "50%",
              border: "2px solid #55efc4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#05130b",
              boxShadow: "0 0 10px rgba(85, 239, 196, 0.3)",
              fontSize: "1.6rem",
              fontWeight: "bold",
            }}
          >
            {(profile?.username || profile?.nombre || user?.email || "U")
              .charAt(0)
              .toUpperCase()}
          </div>
        )}

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
