"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  inMemoryPersistence,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/configs/firebaseConf";
import { useAuth } from "@/hooks/useAuth";

import styles from "./login.module.scss";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [correo, setCorreo] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/panel");
    }
  }, [user, authLoading, router]);

  if (authLoading || user) {
    return (
      <div>
        <p>Cargando tu sesión...</p> {/* O un componente <Spinner /> */}
      </div>
    );
  }

  const handleGoogleLogin = async () => {
    setError("");
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        return signInWithPopup(auth, googleProvider);
      })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
        setError(error.code);
      });
  };

  return (
    <main className={styles.contenedor}>
      <Link href={"/"} className={styles.titulo}>
        CASTEMONES
      </Link>

      <div>
        <form className={styles.formulario}>
          <h2>Inicia sesion</h2>
          <div className={styles.field}>
            <label htmlFor="correo">Correo electronico</label>
            <input
              id="correo"
              type="mail"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            ></input>
          </div>
          <div className={styles.field}>
            <label htmlFor="passwd">Contraseña</label>
            <input
              id="passwd"
              type="password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              required
            ></input>
          </div>

          <button type="submit">Iniciar sesión</button>
        </form>

        <div className={styles.crea}>
          <span>¿Aun no tiene cuenta?</span>
          <br></br>
          <Link href={"/singup"} className={styles.enlace}>
            Crear una cuenta
          </Link>
        </div>
      </div>

      <span className={styles.pie}>Un proyecto de estudiantes de la UNRC</span>
    </main>
  );
};

export default page;
