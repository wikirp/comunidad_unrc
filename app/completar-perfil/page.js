"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/configs/firebaseConf";
import { useAuth } from "@/hooks/useAuth";
import { getUserData, updateUserData } from "@/utils/api";

import styles from "./completar-perfil.module.scss";
import Link from "next/link";

let tipo = 0;

const page = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingFirstTime, setCheckingFirstTime] = useState(true);

  const [tipo, setTipo] = useState(0);

  const [step, setStep] = useState(0);

  useEffect(() => {
    const checkFirstTime = async () => {
      if (!authLoading && user) {
        try {
          const userData = await getUserData(user);
          // Si firstTime es false, redirigir al panel
          if (userData.firstTime === false) {
            router.push("/panel");
          } else {
            setCheckingFirstTime(false);
          }
        } catch (error) {
          console.error("Error al verificar firstTime:", error);
          setError("Error al verificar el estado de tu cuenta");
          setCheckingFirstTime(false);
        }
      } else if (!authLoading && !user) {
        // Si no hay usuario, redirigir al login
        router.push("/login");
      }
    };

    checkFirstTime();
  }, [user, authLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !nombre.trim() ||
      !carrera.trim() ||
      !semestre.trim() ||
      !telefono.trim() ||
      !username.trim()
    ) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    try {
      await updateUserData(user, {
        nombre: nombre.trim(),
        carrera: carrera.trim(),
        semestre: semestre.trim(),
        telefono: telefono.trim(),
        username: username.trim(),
      });

      // Después de actualizar, redirigir a la página de noticias
      router.push("/noticias-de-nosotros-pronto");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setError("Error al guardar los datos. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || checkingFirstTime) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const siguiente = (e, paso) => {
    setStep(paso);
  };

  return (
    <main className={styles.contenedor}>
      <Link href={"/"} className={styles.titulo}>
        Kalli Colectivo
      </Link>

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <h2>Completa tu perfil</h2>
        <p>
          Para que puedas continuar con la asignación de tu personaje, completa
          la siguiente información
        </p>

        {step === 0 ? (
          <Step1 tipo={tipo} setTipo={setTipo} />
        ) : step === 1 ? (
          <Step2 tipo={tipo} />
        ) : step === 1 ? (
          <Step3 tipo={tipo} />
        ) : step === 1 ? (
          <Step4 tipo={tipo} />
        ) : (
          <></>
        )}

        {step === 1 ? (
          <Link href="/noticias-de-nosotros-pronto">
            <button>Siguiente</button>
          </Link>
        ) : (
          <button onClick={() => setStep(step + 1)}>Siguiente</button>
        )}

        {/* <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Completar perfil"}
        </button> */}
      </form>

      <span className={styles.pie}>Un proyecto de estudiantes de la UNRC</span>
    </main>
  );
};

export default page;

const Step1 = () => {
  return (
    <div className={styles.field}>
      <label>Tipo de usuario</label>
      <select
        onChange={(e) => {
          setStep(e.target.value);
        }}
      >
        <option value={0}>Estudiantes</option>
        <option value={1}>Docentes</option>
        <option value={2}>Profesionistas</option>
      </select>
    </div>
  );
};

const Step2 = ({ tipo }) => {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingFirstTime, setCheckingFirstTime] = useState(true);

  return tipo === 0 ? (
    <div>
      <div className={styles.field}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          disabled={loading}
          placeholder="Ingresa tu nombre completo"
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="carrera">Carrera</label>
        <input
          id="carrera"
          type="text"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
          required
          disabled={loading}
          placeholder="Ingresa tu carrera"
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="semestre">Número de semestre</label>
        <input
          id="semestre"
          type="number"
          min="1"
          max="20"
          value={semestre}
          onChange={(e) => setSemestre(e.target.value)}
          required
          disabled={loading}
          placeholder="Ejemplo: 3"
        ></input>
      </div>
    </div>
  ) : tipo === 1 ? (
    <div>
      <div className={styles.field}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          disabled={loading}
          placeholder="Ingresa tu nombre completo"
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="carrera">Carrera</label>
        <input
          id="carrera"
          type="text"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
          required
          disabled={loading}
          placeholder="Ingresa tu carrera"
        ></input>
      </div>
    </div>
  ) : (
    <div>
      <div className={styles.field}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          disabled={loading}
          placeholder="Ingresa tu nombre completo"
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="carrera">Profesión</label>
        <input
          id="carrera"
          type="text"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
          required
          disabled={loading}
          placeholder="Ingresa tu carrera"
        ></input>
      </div>
    </div>
  );
};
const Step3 = () => {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingFirstTime, setCheckingFirstTime] = useState(true);

  return (
    <div>
      <div className={styles.field}>
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          disabled={loading}
          placeholder="Ejemplo: 3512345678"
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="username">Nombre de usuario</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
          placeholder="Cómo quieres que se vea tu nombre en la plataforma"
        ></input>
      </div>
    </div>
  );
};
