"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import styles from "./panel.module.scss";

export default function RightPanelPage() {
  const { user, userData, logout } = useAuth();
  const profile = userData?.profile || userData || {};

  return (
    <ProtectedRoute>
      <main className={styles.contenedor}>
        <header className={styles.terminalHeader}>
          <span className={styles.terminalDot} />
          <h2>&gt; PANEL PRINCIPAL</h2>
        </header>

        <div className={styles.centralBlock}>
          <div className={styles.dataCard}>
            <div className={styles.dataRow}>
              <span className={styles.label}>USUARIO:</span>
              <span className={styles.value}>
                {profile?.username || profile?.nombre || "SIN ALIAS"}
              </span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>CORREO:</span>
              <span className={styles.value}>{user?.email || "-"}</span>
            </div>
            {profile?.carrera && (
              <div className={styles.dataRow}>
                <span className={styles.label}>CARRERA:</span>
                <span className={styles.value}>{profile.carrera}</span>
              </div>
            )}
            {profile?.semestre && (
              <div className={styles.dataRow}>
                <span className={styles.label}>SEMESTRE:</span>
                <span className={styles.value}>{profile.semestre}</span>
              </div>
            )}
          </div>
        </div>

        <footer className={styles.footerActions}>
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={() => logout()}
          >
            [ CERRAR SESIÓN ]
          </button>
        </footer>
      </main>
    </ProtectedRoute>
  );
}

