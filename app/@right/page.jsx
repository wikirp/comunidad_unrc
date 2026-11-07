"use client";
import Link from "next/link";
import styles from "./welcome.module.scss";

export default function WelcomeRightPage() {
  return (
    <main className={styles.contenedor}>
      {/* Cabecera superior fija */}
      <header className={styles.terminalHeader}>
        <span className={styles.terminalDot} />
        <h2>&gt; BITÁCORA INICIAL</h2>
      </header>

      {/* Bloque narrativo central */}
      <div className={styles.dialogBlock}>
        <p className={styles.narrativeText}>Tu aventura está por comenzar.</p>

        <p className={styles.narrativeText}>
          La universidad es un mundo lleno de retos, descubrimientos y amistades
          por conocer.
        </p>
        <p className={styles.narrativeText}>
          Y en este viaje no estarás solo, tendrás tu propia criatura digital,
          que crecerá contigo, te ayudará a reconocer tus avances y a conectar
          con una comunidad de compañeros (estudiantes ) con quienes podrás
          compartir experiencias e intercambiar conocimientos para superar
          cualquier desafío.
        </p>
        <p className={styles.narrativeText}></p>

        <div className={styles.promptBlink}>
          <span>¡Descubre de lo que eres capaz! ▼</span>
        </div>
      </div>

      {/* Botones de acción directos */}
      <footer className={styles.actionBlock}>
        <Link
          href="/login"
          className={`${styles.actionBtn} ${styles.btnLogin}`}
        >
          [ INICIAR SESIÓN ]
        </Link>
        <Link
          href="/signup"
          className={`${styles.actionBtn} ${styles.btnSignup}`}
        >
          &gt; CREAR TU CUENTA
        </Link>
      </footer>
    </main>
  );
}
