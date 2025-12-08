"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/configs/firebaseConf";
import { useAuth } from "@/hooks/useAuth";

import styles from "./login.module.scss";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const { user, loading: authLoading, userData, loadingUserData } = useAuth();

  const [correo, setCorreo] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!authLoading && user && userData) {
      // Redirigir según el valor de firstTime
      if (userData.firstTime === true) {
        router.push("/completar-perfil");
      } else {
        router.push("/panel");
      }
    }
  }, [user, authLoading, userData, router]);

  if (authLoading || user || loadingUserData) {
    return (
      <div>
        <p>Cargando tu sesión...</p> {/* O un componente <Spinner /> */}
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setloading(true);

    try {
      await setPersistence(auth, inMemoryPersistence);
      await signInWithEmailAndPassword(auth, correo, passwd);
      // La redirección se manejará automáticamente en el useEffect cuando userData esté disponible
    } catch (error) {
      console.error(error);
      // Traducir errores comunes de Firebase
      let errorMessage = "Error al iniciar sesión";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta con este correo electrónico";
          break;
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta";
          break;
        case "auth/invalid-email":
          errorMessage = "El correo electrónico no es válido";
          break;
        case "auth/invalid-credential":
          errorMessage = "Credenciales incorrectas";
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setloading(false);
    }
  };

  return (
    <main className={styles.contenedor}>
      <Link href={"/"} className={styles.titulo}>
        Kalli Colectivo
      </Link>

      <div>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <h2>Inicia sesion</h2>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.field}>
            <label htmlFor="correo">Correo electronico</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              disabled={loading}
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
              disabled={loading}
            ></input>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
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
