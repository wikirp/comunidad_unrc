import { useFormContext } from "react-hook-form";
import styles from "./step.module.scss";

const Step1 = ({ onNext, loading }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.stepContainer}>
      <div className={styles.fieldsGroup}>
        <div className={styles.field}>
          <label htmlFor="nombre">¿CÓMO TE LLAMAS?</label>
          <input
            {...register("nombre")}
            id="nombre"
            type="text"
            placeholder="Tu nombre completo"
            required
            disabled={loading}
          />
          {errors.nombre && (
            <p className={styles.fieldError}>[!] {errors.nombre.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="edad">¿CUÁNTOS AÑOS TIENES?</label>
          <input
            {...register("edad")}
            id="edad"
            type="number"
            placeholder="Ej. 20"
            required
            disabled={loading}
          />
          {errors.edad && (
            <p className={styles.fieldError}>[!] {errors.edad.message}</p>
          )}
        </div>
      </div>

      <div className={styles.botones}>
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

export default Step1;
