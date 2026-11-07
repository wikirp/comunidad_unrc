"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/configs/firebaseConf";
import { useAuth } from "@/hooks/useAuth";
import styles from "./login.module.scss";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const {
    user,
    loading: authLoading,
    userData,
    loadingUserData,
    profileStatus,
    authError,
    refreshUserData,
    logout,
  } = useAuth();

  const [correo, setCorreo] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !loadingUserData && user) {
      if (profileStatus === "incomplete" || userData?.firstTime === true) {
        router.push("/completar-perfil");
      } else if (profileStatus === "complete" || userData?.firstTime === false) {
        router.push("/panel");
      }
    }
  }, [user, authLoading, loadingUserData, profileStatus, userData, router]);

  if (
    authLoading ||
    loadingUserData ||
    (user && profileStatus !== "error")
  ) {
    return (
      <div className={styles.loadingContainer}>
        <span className={styles.blinkingPrompt}>&gt; CARGANDO SESIÓN...</span>
      </div>
    );
  }

  if (user && profileStatus === "error") {
    return (
      <main className={styles.contenedor}>
        <header className={styles.terminalHeader}>
          <span className={styles.terminalDot} />
          <h2>&gt; ERROR DE CONEXIÓN</h2>
        </header>
        <div className={styles.centralBlock}>
          <div className={styles.errorBanner}>
            <span>[!] {authError || "NO SE PUDO VERIFICAR EL PERFIL"}</span>
          </div>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => refreshUserData()}
          >
            [ REINTENTAR VERIFICACIÓN ]
          </button>
          <button
            type="button"
            className={styles.socialBtn}
            onClick={() => logout()}
          >
            &gt; CAMBIAR DE CUENTA
          </button>
        </div>
      </main>
    );
  }

  const handleOAuthLogin = async (provider) => {
    setError("");
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(
        err.code === "auth/popup-closed-by-user"
          ? "VENTANA CANCELADA"
          : "ERROR DE VINCULACIÓN",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, correo, passwd);
    } catch (err) {
      let errorMessage = "ERROR DE ACCESO";
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "ENTRENADOR NO ENCONTRADO";
          break;
        case "auth/wrong-password":
          errorMessage = "CLAVE INCORRECTA";
          break;
        case "auth/invalid-email":
          errorMessage = "CORREO NO VÁLIDO";
          break;
        case "auth/invalid-credential":
          errorMessage = "CREDENCIALES INVÁLIDAS";
          break;
        default:
          errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.contenedor}>
      {/* Cabecera superior fija */}
      <header className={styles.terminalHeader}>
        <span className={styles.terminalDot} />
        <h2>&gt; ACCESO</h2>
      </header>

      {/* Bloque central que se expande para distribuir el espacio */}
      <div className={styles.centralBlock}>
        {error && (
          <div className={styles.errorBanner}>
            <span>[!] {error}</span>
          </div>
        )}

        <form className={styles.formulario} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="correo">CORREO ELECTRÓNICO</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="passwd">CONTRASEÑA</label>
            <input
              id="passwd"
              type="password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "VERIFICANDO..." : "[ ENTRAR ]"}
          </button>
        </form>

        {/* Separador de acceso rápido */}
        <div className={styles.dividerRow}>
          <span>--- O CONECTAR CON ---</span>
        </div>

        {/* Botones de autenticación social */}
        <div className={styles.socialButtons}>
          <button
            type="button"
            className={`${styles.socialBtn} ${styles.btnGoogle}`}
            onClick={() => handleOAuthLogin(new GoogleAuthProvider())}
            disabled={loading}
          >
            [G] GOOGLE
          </button>
        </div>
      </div>

      {/* Pie de pantalla anclado al fondo */}
      <footer className={styles.footerLink}>
        <span>¿NUEVO EN LA UNI?</span>
        <Link href="/signup" className={styles.enlace}>
          &gt; REGISTRATE
        </Link>
      </footer>
    </main>
  );
};

export default LoginPage;
