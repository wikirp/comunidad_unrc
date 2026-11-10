"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useAuth,
  PROFILE_DRAFT_STORAGE_KEY,
  clearProfileDraft,
} from "@/hooks/useAuth";
import { updateUserData } from "@/utils/api";

import {
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  Step5Schema,
  Step6Schema,
  Step7Schema,
  Step8Schema,
  Step9Schema,
  Step10Schema,
  CARRERAS_UNRC,
  SEDES_UNRC,
  PERSONALITY_BLOCKS,
} from "@/validations/schema";

import styles from "./completar-perfil.module.scss";

const TOTAL_STEPS = 11;

const STEP_SCHEMAS = {
  2: Step1Schema,
  3: Step2Schema,
  4: Step3Schema,
  5: Step4Schema,
  6: Step5Schema,
  7: Step6Schema,
  8: Step7Schema,
  9: Step8Schema,
  10: Step9Schema,
  11: Step10Schema,
};

const STEP_TITLES = {
  1: "INCUBACIÓN DE CASTEMON",
  2: "BLOQUE: DATOS BÁSICOS",
  3: "BLOQUE: DATOS UNIVERSIDAD",
  4: "BLOQUE 1: INTERACCIÓN SOCIAL",
  5: "BLOQUE 2: REGULACIÓN EMOCIONAL",
  6: "BLOQUE 3: DOMINANCIA Y LIDERAZGO",
  7: "BLOQUE 4: NORMAS Y ESTRUCTURA",
  8: "BLOQUE 5: TOMA DE DECISIONES",
  9: "BLOQUE 6: CONFIANZA Y VIGILANCIA",
  10: "BLOQUE 7: DINÁMICA DE TRABAJO",
  11: "BLOQUE 8: TENSIÓN Y RIESGO",
};

const GENERO_OPTIONS = [
  { value: "A", label: "Femenino" },
  { value: "B", label: "Masculino" },
  { value: "C", label: "No binario" },
  { value: "D", label: "Otro / Prefiero no decir" },
];

const LGBT_OPTIONS = [
  { value: "A", label: "Sí" },
  { value: "B", label: "No" },
];

const CompletarPerfilPage = () => {
  const {
    user,
    loading: authLoading,
    loadingUserData,
    userData,
    profileStatus,
    refreshUserData,
    logout,
  } = useAuth();

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [draftHydrated, setDraftHydrated] = useState(false);
  const scrollRef = useRef(null);

  const router = useRouter();

  const {
    register,
    trigger,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: STEP_SCHEMAS[step] ? zodResolver(STEP_SCHEMAS[step]) : undefined,
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      username: "",
      edad: "",
      genero: "",
      lgbt: "",
      carrera: "",
      sede: "",
      semestre: "",
    },
  });

  const watchedValues = watch();

  // Restaurar borrador guardado al recargar la página (vinculado al uid actual)
  useEffect(() => {
    if (!user || draftHydrated) return;

    try {
      const rawDraft = window.localStorage.getItem(PROFILE_DRAFT_STORAGE_KEY);
      if (rawDraft) {
        const parsed = JSON.parse(rawDraft);
        if (parsed && parsed.uid === user.uid) {
          if (parsed.values && typeof parsed.values === "object") {
            reset(parsed.values);
          }
          if (
            typeof parsed.step === "number" &&
            parsed.step >= 1 &&
            parsed.step <= TOTAL_STEPS
          ) {
            setStep(parsed.step);
          }
        } else {
          clearProfileDraft();
        }
      }
    } catch (e) {
      console.error("Error al restaurar borrador:", e);
    } finally {
      setDraftHydrated(true);
    }
  }, [user, draftHydrated, reset]);

  // Guardar automáticamente cada cambio de respuestas o de paso
  useEffect(() => {
    if (!user || !draftHydrated) return;

    try {
      window.localStorage.setItem(
        PROFILE_DRAFT_STORAGE_KEY,
        JSON.stringify({
          uid: user.uid,
          step,
          values: watchedValues,
        })
      );
    } catch (e) {
      console.error("Error al guardar borrador:", e);
    }
  }, [user, draftHydrated, step, watchedValues]);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [step]);

  if (authLoading || loadingUserData) {
    return (
      <div className={styles.loadingContainer}>
        <span className={styles.blinkingPrompt}>&gt; CARGANDO SESIÓN...</span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const siguiente = async () => {
    setError("");
    if (!STEP_SCHEMAS[step]) {
      setStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
      return;
    }

    const currentFields = Object.keys(STEP_SCHEMAS[step].shape);
    const isValid = await trigger(currentFields);

    if (isValid) {
      setStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
    } else {
      setError("RESPONDE TODAS LAS PREGUNTAS DE ESTE BLOQUE");
    }
  };

  const anterior = () => {
    setError("");
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const currentFields = Object.keys(STEP_SCHEMAS[step].shape);
    const isValid = await trigger(currentFields);
    if (!isValid) {
      setError("RESPONDE TODAS LAS PREGUNTAS DE ESTE BLOQUE");
      return;
    }

    setLoading(true);
    try {
      const allValues = getValues();

      const respuestasPersonalidad = {};
      for (let i = 1; i <= 32; i++) {
        respuestasPersonalidad[`p${i}`] = allValues[`p${i}`];
      }

      const payload = {
        datosBasicos: {
          username: allValues.username?.trim(),
          edad: Number(allValues.edad),
          genero: allValues.genero,
          lgbt: allValues.lgbt,
        },
        datosUniversidad: {
          carrera: allValues.carrera,
          sede: allValues.sede,
          semestre: Number(allValues.semestre),
        },
        cuestionarioPersonalidad: respuestasPersonalidad,
        // Campos planos por compatibilidad con el backend
        username: allValues.username?.trim(),
        edad: Number(allValues.edad),
        genero: allValues.genero,
        lgbt: allValues.lgbt,
        carrera: allValues.carrera,
        sede: allValues.sede,
        semestre: String(allValues.semestre),
        ...respuestasPersonalidad,
      };

      await updateUserData(user, payload);
      clearProfileDraft();
      await refreshUserData();
      router.push("/panel");
    } catch (err) {
      console.error("Error al guardar el perfil:", err);
      setError("ERROR AL GUARDAR DATOS. INTENTA DE NUEVO.");
    } finally {
      setLoading(false);
    }
  };

  const currentPersonalityBlock = PERSONALITY_BLOCKS.find(
    (b) => b.blockNumber === step - 3,
  );

  const renderOptionGroup = (fieldName, number, questionText, options) => {
    const selected = watchedValues[fieldName];
    const fieldErr = errors[fieldName];

    return (
      <div key={fieldName} className={styles.questionBlock}>
        <p className={styles.questionTitle}>
          <span className={styles.questionNumber}>{number}.</span>
          {questionText}
        </p>
        <div className={styles.optionsGrid}>
          {options.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                disabled={loading}
                onClick={() =>
                  setValue(fieldName, opt.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`${styles.optionBtn} ${
                  isSelected ? styles.optionBtnSelected : ""
                }`}
              >
                <span className={styles.optionKey}>{opt.value}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
        {fieldErr && (
          <p className={styles.fieldError}>[!] {fieldErr.message}</p>
        )}
      </div>
    );
  };

  return (
    <main className={styles.contenedor}>
      {/* Cabecera superior con barra de progreso */}
      <header className={styles.terminalHeader}>
        <div className={styles.headerTopRow}>
          <div className={styles.headerTitleGroup}>
            <span className={styles.terminalDot} />
            <h2>&gt; {STEP_TITLES[step]}</h2>
          </div>
          <span className={styles.stepBadge}>
            {String(step).padStart(2, "0")}/{TOTAL_STEPS}
          </span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </header>

      {error && (
        <div className={styles.errorBanner}>
          <span>[!] {error}</span>
        </div>
      )}

      {/* Formulario por bloques */}
      <form className={styles.formulario} onSubmit={handleFinalSubmit}>
        <div className={styles.scrollArea} ref={scrollRef}>
          {/* PASO 1: INTRODUCCIÓN A LA INCUBACIÓN DEL CASTEMON */}
          {step === 1 && (
            <div className={styles.introBlock}>
              <p className={styles.narrativeText}>
                ¡Bienvenido, entrenador! Antes de acceder al panel de la
                comunidad, necesitamos conpletar tu perfil para poder incubar y
                generar a tu <strong>Castemon</strong>.
              </p>

              <p className={styles.narrativeText}>
                A continuación completarás tus datos universitarios y un
                cuestionario de personalidad dividido en bloques. Tus respuestas
                definirán los rasgos de tu compañero digital y te conectarán con
                compañeros afines.
              </p>

              <div className={styles.instructionBox}>
                <strong>TIP:</strong> Elige la opción que mejor describa tu
                forma habitual de actuar o sentir y evita la opción intermedia a
                menos que sea indispensable.
              </div>

              <div className={styles.promptBlink}>
                <span>¿LISTO PARA GENERAR TU CASTEMON? ▼</span>
              </div>
            </div>
          )}

          {/* PASO 2: BLOQUE DATOS BÁSICOS */}
          {step === 2 && (
            <>
              <div className={styles.field}>
                <label htmlFor="username">
                  1. Nombre de usuario:
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Como te gusta que te digan"
                  disabled={loading}
                  {...register("username")}
                />
                {errors.username && (
                  <p className={styles.fieldError}>
                    [!] {errors.username.message}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="edad">2. Edad:</label>
                <input
                  id="edad"
                  type="number"
                  placeholder="Ingresa tu edad"
                  min={15}
                  max={99}
                  disabled={loading}
                  {...register("edad")}
                />
                {errors.edad && (
                  <p className={styles.fieldError}>[!] {errors.edad.message}</p>
                )}
              </div>

              {renderOptionGroup("genero", 3, "Género:", GENERO_OPTIONS)}

              {renderOptionGroup(
                "lgbt",
                3,
                "¿Te identificas como parte de la comunidad LGBT+?",
                LGBT_OPTIONS,
              )}
            </>
          )}

          {/* PASO 3: BLOQUE DATOS UNIVERSIDAD */}
          {step === 3 && (
            <>
              <div className={styles.field}>
                <label htmlFor="carrera">5. Carrera:</label>
                <select
                  id="carrera"
                  disabled={loading}
                  {...register("carrera")}
                >
                  <option value="">Selecciona tu carrera</option>
                  {CARRERAS_UNRC.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {errors.carrera && (
                  <p className={styles.fieldError}>
                    [!] {errors.carrera.message}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="sede">6. Sede:</label>
                <select id="sede" disabled={loading} {...register("sede")}>
                  <option value="">Selecciona tu sede</option>
                  {SEDES_UNRC.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                {errors.sede && (
                  <p className={styles.fieldError}>[!] {errors.sede.message}</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="semestre">7. Semestre actual:</label>
                <select
                  id="semestre"
                  disabled={loading}
                  {...register("semestre")}
                >
                  <option value="">Selecciona tu semestre</option>
                  {Array.from({ length: 10 }, (_, idx) => String(idx + 1)).map(
                    (sem) => (
                      <option key={sem} value={sem}>
                        {sem}° Semestre
                      </option>
                    ),
                  )}
                </select>
                {errors.semestre && (
                  <p className={styles.fieldError}>
                    [!] {errors.semestre.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* PASOS 3 AL 10: BLOQUES 1 AL 8 DEL CUESTIONARIO DE PERSONALIDAD */}
          {currentPersonalityBlock && (
            <>
              {currentPersonalityBlock.showInstructions && (
                <div className={styles.instructionBox}>
                  <strong>INSTRUCCIONES:</strong> Lea atentamente cada
                  afirmación y elija la opción que mejor describa su forma
                  habitual de actuar o sentir. Evite elegir la opción intermedia
                  a menos que le resulte indispensable hacerlo.
                </div>
              )}

              {currentPersonalityBlock.questions.map((q) =>
                renderOptionGroup(q.name, q.number, q.text, q.options),
              )}
            </>
          )}
        </div>

        {/* Botonera inferior fija por paso */}
        <div className={styles.botonesRow}>
          {step > 1 && (
            <button
              type="button"
              onClick={anterior}
              className={styles.secondaryBtn}
              disabled={loading}
            >
              &lt; ATRÁS
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={siguiente}
              className={styles.submitBtn}
              disabled={loading}
            >
              {step === 1 ? "[ COMENZAR CUESTIONARIO > ]" : "[ SIGUIENTE > ]"}
            </button>
          ) : (
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "ENVIANDO PERFIL..." : "[ FINALIZAR REGISTRO ]"}
            </button>
          )}
        </div>
      </form>

      {/* Pie de pantalla anclado al fondo */}
      <footer className={styles.footerLink}>
        <span>SESIÓN: {user.email}</span>
        <button
          type="button"
          className={styles.logoutLink}
          onClick={() => logout()}
        >
          [ SALIR ]
        </button>
      </footer>
    </main>
  );
};

export default CompletarPerfilPage;
