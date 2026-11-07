import { useFormContext } from "react-hook-form";

import styles from "./step.module.scss";

const Step1 = ({ onNext, loading, onPrev }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className={styles.field}>
        <label>Tipo de usuario</label>
        <select title="Tipos de usuario" {...register("rol")}>
          <option value={0}>Seleccionar</option>
          <option value={"estudiante"}>Estudiantes</option>
          <option value={"profesor"}>Docentes</option>
          <option value={"profesional"}>Profesionistas</option>
          <option value={"curioso"}>Curioso</option>
        </select>
        {errors.tipo && <p style={{ color: "red" }}>{errors.tipo.message}</p>}
      </div>

      {loading ? (
        <span className={styles.loader}></span>
      ) : (
        <div className={styles.botones}>
          <button onClick={onPrev}>Anterior</button>
          <button onClick={onNext} className={styles.siguiente}>
            Siguente
          </button>
        </div>
      )}
    </div>
  );
};

export default Step1;
