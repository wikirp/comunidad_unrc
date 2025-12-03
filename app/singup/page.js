"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  setPersistence,
  createUserWithEmailAndPassword,
  browserLocalPersistence
} from "firebase/auth";
import { auth } from "@/configs/firebaseConf";
import { useAuth } from "@/hooks/useAuth";

import styles from "./singup.module.scss";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const { user, loading: authLoading, userData, loadingUserData } = useAuth();

  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [usrname, setUsrname] = useState("");
  const [semestre, setSemestre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [passwd, setPasswd] = useState("");
  const [confirmPasswd, setConfirmPasswd] = useState("");
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

    // Validar que las contraseñas coincidan
    if (passwd !== confirmPasswd) {
      setError("Las contraseñas no coinciden");
      setloading(false);
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (passwd.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setloading(false);
      return;
    }

    try {
      await setPersistence(auth, browserLocalPersistence)
      await createUserWithEmailAndPassword(auth, correo, passwd);
      // La redirección se manejará automáticamente en el useEffect cuando userData esté disponible
    } catch (error) {
      console.error(error);
      // Traducir errores comunes de Firebase
      let errorMessage = "Error al crear la cuenta";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este correo electrónico ya está en uso";
          break;
        case "auth/invalid-email":
          errorMessage = "El correo electrónico no es válido";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña es muy débil";
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
        CASTEMONES
      </Link>

      <div>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <h2>Crea tu cuenta</h2>
          
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
              minLength={6}
            ></input>
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmPasswd">Repite tu contraseña</label>
            <input
              id="confirmPasswd"
              type="password"
              value={confirmPasswd}
              onChange={(e) => setConfirmPasswd(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            ></input>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <div className={styles.crea}>
          <span>¿Ya tienes cuenta?</span>
          <br></br>
          <Link href={"/login"} className={styles.enlace}>
            Inicia sesión
          </Link>
        </div>
      </div>

      <span className={styles.pie}>Un proyecto de estudiantes de la UNRC</span>
    </main>
  );
};

export default page;
