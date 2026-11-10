import { useFormContext } from "react-hook-form";
import styles from "./step.module.scss";

const Step2 = ({ onNext, loading, onPrev }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.stepContainer}>
      <div className={styles.fieldsGroup}>
        <div className={styles.field}>
          <label htmlFor="rol">TIPO DE USUARIO</label>
          <select
            id="rol"
            title="Tipos de usuario"
            {...register("rol")}
            disabled={loading}
            defaultValue=""
          >
            <option value="" disabled>
              -- SELECCIONAR --
            </option>
            <option value="estudiante">ESTUDIANTE</option>
            <option value="profesor">DOCENTE</option>
            <option value="profesional">PROFESIONISTA</option>
            <option value="curioso">CURIOSO</option>
          </select>
          {errors.rol && (
            <p className={styles.fieldError}>[!] {errors.rol.message}</p>
          )}
        </div>
      </div>

      <div className={styles.botones}>
        <button
          type="button"
          onClick={onPrev}
          className={styles.anterior}
          disabled={loading}
        >
          &lt; ATRÁS
        </button>
        <button
          type="button"
          onClick={onNext}
          className={styles.siguiente}
          disabled={loading}
        >
          {loading ? "VALIDANDO..." : "[ SIGUIENTE > ]"}
        </button>
      </div>
    </div>
  );
};

export default Step2;
