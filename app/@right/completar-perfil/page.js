"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "@/configs/firebaseConf";
import { useAuth } from "@/hooks/useAuth";

import { getUserData, updateUserData } from "@/utils/api";

import { Step1Schema } from "@/validations/schema";
import { Step2Schema } from "@/validations/schema";
import { Step3Schema } from "@/validations/schema";

import Step1 from "@/components/PasosComponent/Step1";
import Step2 from "@/components/PasosComponent/Step2";

import styles from "./completar-perfil.module.scss";

let tipo = 0;

const page = () => {
  const {
    user,
    loading: authLoading,
    loadingUserData,
    userData,
    profileStatus,
    refreshUserData,
  } = useAuth();

  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [tipo, setTipo] = useState(0);

  const [step, setStep] = useState(1);

  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (
      !authLoading &&
      !loadingUserData &&
      user &&
      (profileStatus === "complete" || userData?.firstTime === false)
    ) {
      router.push("/panel");
    }
  }, [user, authLoading, loadingUserData, profileStatus, userData, router]);

  const stepSchemas = {
    1: Step1Schema,
    2: Step2Schema,
    3: Step3Schema,
  };

  const methods = useForm({
    resolver: zodResolver(stepSchemas[step]),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

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

      await refreshUserData();
      router.push("/panel");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setError("Error al guardar los datos. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loadingUserData) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const siguiente = async (e) => {
    setLoading(true);

    const isValid = await methods.trigger(Object.keys(stepSchemas[step].shape));

    if (isValid) {
      let nextStep = step + 1;

      setStep(nextStep);
    }

    setLoading(false);
  };

  return (
    <main className={styles.contenedor}>
      <FormProvider {...methods}>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <h2>Completa tu perfil</h2>
          <p>
            Para que puedas continuar con la asignación de tu personaje,
            completa la siguiente información
          </p>

          {step === 1 ? (
            <Step1 onNext={siguiente} loading={loading} />
          ) : step === 2 ? (
            <Step2 tipo={tipo} />
          ) : step === 3 ? (
            <Step3 tipo={tipo} />
          ) : step === 4 ? (
            <Step4 tipo={tipo} />
          ) : (
            <></>
          )}

          {/* <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Completar perfil"}
        </button> */}
        </form>
      </FormProvider>
    </main>
  );
};

export default page;

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
